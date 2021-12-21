import { IUser } from "../../models/IUser";
import { UserActionTypes } from "../../types/user";

export const registerUserAC = () => ({type: UserActionTypes.REGISTER_SUCCESS});


export const loginUserAC = (user: IUser) => ({type: UserActionTypes.REGISTER_SUCCESS, payload: user});
export const logoutAC = () => ({type: UserActionTypes.LOGOUT});