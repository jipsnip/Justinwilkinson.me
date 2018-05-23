import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import myRoutes from './routes';

export default class RouteProvider extends Component{
    render() {
        return (
            <Switch>
                {myRoutes.map((v, i) =><Route key={i} exact path={v.path} component={v.component}/>)}
            </Switch>
        )
    }
}