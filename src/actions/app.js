import {ALERT} from './types';

export const showAlert = (args) => {
    return { type: ALERT.SHOW, args }
}

export const clearAlert = (args) => {
    return { type: ALERT.CLEAR, args }
}