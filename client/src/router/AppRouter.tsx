import { IIsAuth } from 'models/IIsAuth';
import React, { FC } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import { publicRoutes, privateRoutes, RouteNames} from "./index";

const AppRouter: FC<IIsAuth> = ({isAuth}) => {
    return (
        <Switch>
            {isAuth ?
                privateRoutes.map(route =>
                    <Route path={route.path}
                        exact={route.exact}
                        component={route.component}
                        key={route.path}
                    />
                )
                :
                publicRoutes.map(route =>
                    <Route path={route.path}
                        exact={route.exact}
                        component={route.component}
                        key={route.path}
                    />
                )
            }
        <Redirect to={RouteNames.SEARCH}/>
        </Switch>
    )
}

export default AppRouter;