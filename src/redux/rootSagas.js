import { all } from 'redux-saga/effects';
import stocksSaga from './stocks/stocksSaga';

export default function* rootSaga(getState) {
  yield all([stocksSaga()]);
}
