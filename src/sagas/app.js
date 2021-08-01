import { put, takeEvery, } from 'redux-saga/effects';
import {
    ALERT,
} from '../actions/types';

/**
 *  SET ALERT
 */

export function* showAlert(action) {
    const alert = action.alert;
    yield put({ type: ALERT.SET, alert });
}

export function* alertWatcher() {
    yield takeEvery(ALERT.SHOW, showAlert);
}

/**
 *  CLEAR ALERT
 */
export function* removeAlert(action) {
    yield put({ type: ALERT.SET, alert: null });
}

export function* removeAlertWatcher() {
    yield takeEvery(ALERT.CLEAR, removeAlert);
}