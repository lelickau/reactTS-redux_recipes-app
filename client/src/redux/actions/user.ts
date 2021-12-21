
import {Dispatch} from 'redux';
import AuthService from '../../services/AuthService';
import { GlobalAction } from '../../types/global';
import { UserAction, UserActionTypes } from '../../types/user';
import { changeLoadingAC } from '../action-creators/global';
import { registerUserAC } from '../action-creators/user';

export const register = ({username, email, password}:{username: string, email: string, password: string}) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            const correctEmail = email.toLowerCase();
            const response = await AuthService.register(username, correctEmail, password);

            dispatch({
                type: UserActionTypes.REGISTER_SUCCESS,
            });

            console.log(response)


        } catch (e) {
            dispatch({
                type: UserActionTypes.REGISTER_FAIL
            });
            console.log(e);
        }
    }
}

export const login = ({username, email, password}:{username: string, email: string, password: string}) => {
    return async (dispatch: Dispatch<UserAction>) => {

        try {
            const response = await AuthService.login(username, password);

            dispatch({
                type: UserActionTypes.LOGIN_SUCCESS,
                payload: response.data.user,
            });
            console.log(response.data.user)

        } catch (e) {
            dispatch({
                type: UserActionTypes.LOGIN_FAIL
            });
            console.log(e)
        }
    }
}

export const logout = () => {
    return async (dispatch: Dispatch<UserAction>) => {

        AuthService.logout();
        dispatch({
            type: UserActionTypes.LOGOUT
        });
    }
}

export const refreshToken = (accessToken: string) => {
    return async (dispatch: Dispatch<UserAction>) => {

        dispatch({
            type: UserActionTypes.REFRESH_TOKEN,
            payload: accessToken
        })
    }
}



