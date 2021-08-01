import { fork } from 'redux-saga/effects';

import {
    alertWatcher,
    removeAlertWatcher,
} from './app';

export default function* rootSaga() {
    yield [
        yield fork(alertWatcher),
        yield fork(removeAlertWatcher),
    ]
}