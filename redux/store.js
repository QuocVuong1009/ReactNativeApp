import { createStore, combineReducers, applyMiddleware } from 'redux';
import detailReducer from './detailReducer';
import totalReducer from './totalReducer';
import deleteReducer from './deleteReducer';
import updateReducer from './modifyReducer';
import uploadReducer from './uploadReducer';
import saveReducer from './saveReducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    detail: detailReducer,
    total: totalReducer,
    delete: deleteReducer,
    update: updateReducer,
    upload: uploadReducer,
    save: saveReducer
});

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

