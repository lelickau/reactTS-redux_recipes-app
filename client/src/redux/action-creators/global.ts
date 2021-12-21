import { GlobalActionTypes } from "../../types/global";

export const errorAC = (val: boolean) => ({type: GlobalActionTypes.IS_ERROR, payload: val});
export const setErrorAC = (val: string) => ({type: GlobalActionTypes.SET_ERROR, payload: val});
export const changeHiddenAC = (val: boolean) => ({type: GlobalActionTypes.IS_HIDDEN, payload: val});
export const changeLoadingAC = (val: boolean) => ({type: GlobalActionTypes.IS_LOADING, payload: val});