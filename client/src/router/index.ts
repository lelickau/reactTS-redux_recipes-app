import SearchDish from "components/dish/SearchDish"
import FavDish from "components/dish/FavDish"
import GuestPage from "pages/guest/GuestPage"
import HomePage from "pages/home/HomePage"
import React from "react"
import AuthPage from "../pages/auth/AuthPage"
import CreatePage from "../pages/create/CreatePage"
import FavoritesPage from "../pages/favs/FavoritesPage"
import SearchPage from "../pages/search/SearchPage"
import MyDish from "components/myDish/MyDish"
import EditMyRecipe from "components/editMyRecipe/EditMyRecipe"

export interface IRoute {
    path: string;
    component: React.ComponentType;
    exact?: boolean;
    id?: string;
}

export enum RouteNames {
    HOME = '/home',
    LOGIN = '/login',
    SEARCH = '/search',
    FAVS = '/favs',
    CREATE = '/create',
    RECIPE = '/search/:id',
    FAVITEM = '/favs/:id',
    MYRECIPE = '/mygusto/:id',
    EDITMYRECIPE = '/edit/:id',
}

export const publicRoutes: IRoute[] = [
    {path: RouteNames.HOME, exact: true, component: GuestPage},
    {path: RouteNames.LOGIN, exact: true, component: AuthPage},
    {path: RouteNames.SEARCH, exact: true, component: SearchPage},
    {path: RouteNames.FAVS, exact: true, component: GuestPage},
    {path: RouteNames.CREATE, exact: true, component: GuestPage},
    {path: RouteNames.RECIPE, exact: true, component: SearchDish},
]

export const privateRoutes: IRoute[] = [
    {path: RouteNames.HOME, exact: true, component: HomePage},
    {path: RouteNames.SEARCH, exact: true, component: SearchPage},
    {path: RouteNames.FAVS, exact: true, component: FavoritesPage},
    {path: RouteNames.FAVITEM, exact: true, component: FavDish},
    {path: RouteNames.CREATE, exact: true, component: CreatePage},
    {path: RouteNames.RECIPE, exact: true, component: SearchDish},
    {path: RouteNames.MYRECIPE, exact: true, component: MyDish},
    {path: RouteNames.EDITMYRECIPE, exact: true, component: EditMyRecipe},
]

