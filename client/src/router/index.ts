import GuestPage from "pages/guest/GuestPage";
import HomePage from "pages/home/HomePage";
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
    HOME = '/home',
    LOGIN = '/login',
    SEARCH = '/search',
    FAVS = '/favs',
    CREATE = '/create',
}

export const publicRoutes: IRoute[] = [
    {path: RouteNames.HOME, exact: true, component: HomePage},
    {path: RouteNames.LOGIN, exact: true, component: AuthPage},
    {path: RouteNames.SEARCH, exact: true, component: SearchPage},
    {path: RouteNames.FAVS, exact: true, component: GuestPage},
    {path: RouteNames.CREATE, exact: true, component: GuestPage},
]

export const privateRoutes: IRoute[] = [
    {path: RouteNames.HOME, exact: true, component: HomePage},
    {path: RouteNames.SEARCH, exact: true, component: SearchPage},
    {path: RouteNames.FAVS, exact: true, component: FavoritesPage},
    {path: RouteNames.CREATE, exact: true, component: CreatePage},
]

