import { takeLatest, put, call } from 'redux-saga/effects';
import { myDelete } from '../axios';

export function* fetchAPI({ payload }) {
    try {
        yield put({ type: 'DELETE_SHOW_LOADING' });

        const { name, specific } = payload;
        console.log('OK name: ' + name);
        console.log('OK number: ' + specific);

        const response = yield call(myDelete, { name, specific });

        yield put({ 
            type: 'DELETE_FETCHING', 
            payload: {
                name,
                specific,
                response : response?.data || []
            }
        });
        console.log(`The result when delete is: `, response?.data || [])
    } catch (error) {
        console.error('Error fetching API:', error);
    } finally {
        yield put({ type: 'DELETE_HIDE_LOADING' });
    }
}

export const deleteAPI = [takeLatest('DELETE', fetchAPI)];



