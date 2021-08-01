import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { PrivateRoute } from '../helpers/private-route';
import Login from '../containers/login';
import Home from '../containers/home';
import User from '../containers/user'
import Transaction from '../containers/transaction';
import Report from '../containers/report'

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Login} />
            <PrivateRoute path="/home" component={Home} isPrivate />
            <PrivateRoute path="/user" component={User} isPrivate />
            <PrivateRoute path="/transaction" component={Transaction} isPrivate />
            <PrivateRoute path="/report" component={Report} isPrivate />
        </Switch>
    );
}