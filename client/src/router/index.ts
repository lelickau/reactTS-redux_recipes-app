import React from "react";
import AuthPage from "../pages/auth/AuthPage";
import CreatePage from "../pages/create/CreatePage";
import FavoritesPage from "../pages/favs/FavoritesPage";
import SearchPage from "../pages/search/SearchPage";

export interface IRoute {
    path: string;
    component: React.ComponentType;
    exact?: boolean;
}

export enum RouteNames {
    LOGIN = '/login',
    SEARCH = '/search',
    FAVS = '/favs',
    CREATE = '/create',
}

export const publicRoutes: IRoute[] = [
    {path: RouteNames.LOGIN, exact: true, component: AuthPage},
    {path: RouteNames.SEARCH, exact: true, component: SearchPage},
    {path: RouteNames.FAVS, exact: true, component: FavoritesPage},
    {path: RouteNames.CREATE, exact: true, component: CreatePage},
]

