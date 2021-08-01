import {
    AUTH_LOGIN,
    AUTH_RESET,
    AUTH_REGISTER,
    AUTH_LOGOUT,
    AUTH_LOGIN_FORCE,
} from './types';

export const loginRequest = (args) => {
    return { type: AUTH_LOGIN.REQUEST, args }
}

export const resetRequest = (args) => {
    return { type: AUTH_RESET.REQUEST, args }
}

export const registerRequest = (args) => {
    return { type: AUTH_REGISTER.REQUEST, args }
}

export const logoutRequest = (args) => {
    return { type: AUTH_LOGOUT.REQUEST, args }
}

export const loginForceChange = (args) => {
    return { type: AUTH_LOGIN_FORCE.CHANGE, args }
}