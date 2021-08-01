import React from 'react';
import { Switch, Route, } from 'react-router-dom';
import { PrivateRoute } from '../helpers/private-route';
import Login from '../screens/auth/login';
import Home from '../screens/home';

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Login} />
            <PrivateRoute path="/home" component={Home} isPrivate />
            {/* redirect user to SignIn page if route does not exist and user is not authenticated */}
            <Route component={Login} />
        </Switch>
    );
}