import { UserAction, UserActionTypes, UserState } from "../../types/user";

//const user = JSON.parse(localStorage.getItem("user") || '');

const userState: UserState =
    { currentUser: {}, isAuth: true }
    //: { currentUser: null, isAuth: false }

export default function userReducer(state = userState, action: UserAction): UserState {
    switch (action.type) {
        case UserActionTypes.REGISTER_SUCCESS:
            return {
                ...state,
                isAuth: false,
            }
        case UserActionTypes.REGISTER_FAIL:
            return {
                ...state,
                isAuth: false,
            }
        case UserActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                isAuth: true,
            }
        case UserActionTypes.LOGIN_FAIL:
            return {
                ...state,
                currentUser: null,
                isAuth: false,
            }
        case UserActionTypes.LOGOUT:
            return {
                ...state,
                currentUser: null,
                isAuth: false,
            }
        case UserActionTypes.REFRESH_TOKEN:
            return {
                ...state,
                currentUser: {...state.currentUser, accessToken: action.payload },
            }

        default:
            return state;
    }
}