import { takeLatest, put, call } from 'redux-saga/effects';
import { mySave } from '../axios';

export function* fetchSaveAPI({ payload }) {
    try {
        yield put({ type: 'SAVE_SHOW_LOADING' });

        const { file, ad_name, result_js, specific } = payload;

        console.log(`The file in save API is: `, file);
        console.log(`The name in save API is: `, ad_name);
        console.log(`The result in save API is: `, result_js);
        console.log(`The specific in save API is: `, specific);

        const response = yield call(mySave, file, ad_name, result_js, specific);

        yield put({
            type: 'SAVE_FETCHING',
            payload: {
                response : response?.data || {}
            }
        });
        console.log(`The result get is: `, response?.data || {})
    } catch (error) {
        console.error('Error uploading image:', error);
    } finally {
        yield put({ type: 'SAVE_HIDE_LOADING' });
    }
}

export const saveAPI = [takeLatest('SAVE', fetchSaveAPI)];
