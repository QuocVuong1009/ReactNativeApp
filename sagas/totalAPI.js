import { takeLatest, put, call } from 'redux-saga/effects';
import { myGetTotal } from '../axios';

export function* fetchAPI({ payload }) {
    try {
        yield put({ type: 'TOTAL_SHOW_LOADING' });

        console.log(`Call API get name: `, payload.name)
        const response = yield call(myGetTotal, payload.name);

        yield put({ 
            type: 'TOTAL_FETCHING', 
            payload: {
                // response : response?.data || {},
                response : response?.data || []
            }
        });
        console.log(`The response gotten in total is: `, response?.data || [])
    } catch (error) {
        console.error('Error fetching API:', error);
    } finally {
        yield put({ type: 'TOTAL_HIDE_LOADING' });
    }
}

export const totalAPI = [takeLatest('TOTAL', fetchAPI)];



