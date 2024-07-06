import { takeLatest, put, call } from 'redux-saga/effects';
import { myUpdate } from '../axios';

export function* fetchAPI({ payload }) {
    try {
        yield put({ type: 'SHOW_UPDATE_LOADING' });

        const { keyName, specific, editableData, specificN } = payload;
        
        console.log(`The keyname in call API is: `, keyName)
        console.log(`The specific in call API is: `, specific)
        console.log(`The data in call API is: `, editableData)
        console.log(`The specific New in call API is: `, specific)

        // yield call(myUpdate, {keyName, specific, editableData});
        yield call(myUpdate, {keyName, specific, editableData, specificN});


        yield put({
            type: 'UPDATE_API_FETCHING',
            payload: {
                keyName,
                specific,
                editableData,
                specificN
            }
        });
    } catch (error) {
        console.error('Error updating API:', error);
    } finally {
        yield put({ type: 'HIDE_UPDATE_LOADING' });
    }
}

export const updateAPI = [takeLatest('UPDATE_FETCHING', fetchAPI)];