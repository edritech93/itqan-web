import React from "react";
import { Redirect, Route } from 'react-router-dom';
import { STORAGE } from '../actions/types';
import { DrawerView } from '../components'

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            localStorage.getItem(STORAGE.TOKEN) ? (
                <DrawerView {...props}>
                    <Component {...props} />
                </DrawerView>
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