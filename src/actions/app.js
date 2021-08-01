import {
    ALERT
} from './types';

export const showAlert = (args) => {
    return { type: ALERT.SHOW, args }
}