import { IUser } from "../models/IUser";

export interface UserState {
    currentUser: IUser | null;
    isAuth: boolean;
}

export enum UserActionTypes {
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGIN_FAIL = 'LOGIN_FAIL',
    LOGOUT = 'LOGOUT',
    REGISTER_SUCCESS = 'REGISTER_SUCCESS',
    REGISTER_FAIL = 'REGISTER_FAIL',
    REFRESH_TOKEN = 'REFRESH_TOKEN'
}

interface LoginSuccessAction {
    type: UserActionTypes.LOGIN_SUCCESS;
    payload: IUser
}

interface LoginFailAction {
    type: UserActionTypes.LOGIN_FAIL;
}

interface LogoutUserAction {
    type: UserActionTypes.LOGOUT;
}

interface RegisterFailAction {
    type: UserActionTypes.REGISTER_FAIL;
}

interface RegisterSuccessAction {
    type: UserActionTypes.REGISTER_SUCCESS;
}

interface RefreshTokenAction {
    type: UserActionTypes.REFRESH_TOKEN;
    payload: string;
}

export type UserAction = LoginSuccessAction | LoginFailAction | LogoutUserAction | RegisterSuccessAction | RegisterFailAction | RefreshTokenAction;