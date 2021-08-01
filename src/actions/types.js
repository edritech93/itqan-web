import { defineAction } from 'redux-define';
import {
    REQUEST,
    SUCCESS,
    FAILURE,
    USER,
    TOKEN,
    SHOW,
    CLEAR
} from '../constants/state';
const appNamespace = defineAction('ITQAN-WEB');

export const ALERT = defineAction('ALERT', [SHOW, CLEAR], appNamespace);
export const STORAGE = defineAction('STORAGE', [TOKEN, USER], appNamespace);
