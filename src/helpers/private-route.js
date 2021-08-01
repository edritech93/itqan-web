import React from "react";
import { Redirect, Route, } from 'react-router-dom';
import { STORAGE } from '../actions/types';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            localStorage.getItem(STORAGE.TOKEN) ? (
                <Component {...props} />
            ) : (
                    <Redirect
                        to={{
                            pathname: '',
                            state: { from: props.location }
                        }}
                    />
                )
        }
    />
);