import { takeLatest, put, call } from 'redux-saga/effects';
import { myGetDetail } from '../axios';

export function* fetchAPI({ payload }) {
    try {
        yield put({ type: 'SHOW_LOADING' });

        const { name, specific } = payload;
        console.log('OK name: ' + name);
        console.log('OK number: ' + specific);

        const response = yield call(myGetDetail, { name, specific });

        yield put({ 
            type: 'API_FETCHING', 
            payload: {
                name,
                specific,
                response : response?.data?.presData || {},
                image : response?.data?.image || ''
            }
        });
    } catch (error) {
        console.error('Error fetching API:', error);
    } finally {
        yield put({ type: 'HIDE_LOADING' });
    }
}

export const APISaga = [takeLatest('FETCHING', fetchAPI)];



