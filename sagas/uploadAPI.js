import { takeLatest, put, call } from 'redux-saga/effects';
import { uploadImage } from '../axios';

export function* fetchUploadAPI({ payload }) {
    try {
        yield put({ type: 'SHOW_UPLOAD_LOADING' });

        const { file, keyName } = payload;

        console.log(`The file in call API is: `, file);
        console.log(`The keyName in call API is: `, keyName);

        const response = yield call(uploadImage, file, keyName);

        yield put({
            type: 'UPLOAD_IMAGE_FETCHING',
            payload: {
                // response : response?.data || {}
                response : response?.data || ''

            }
        });
        // console.log(`The result get is: `, response?.data || {})
        console.log(`The result get is: `, response?.data || '')
    } catch (error) {
        console.error('Error uploading image:', error);
    } finally {
        yield put({ type: 'HIDE_UPLOAD_LOADING' });
    }
}

export const uploadAPI = [takeLatest('UPLOAD_FETCHING', fetchUploadAPI)];
