import {
    ALERT
} from './types';

export const showAlert = (args) => {
    alert(args.message)
    return { type: ALERT.SHOW, args }
}