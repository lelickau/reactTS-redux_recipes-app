export interface GlobalState {
    error: boolean | string | null;
    loading: boolean;
    isHidden: boolean;
}

export enum GlobalActionTypes {
    IS_ERROR = 'IS_ERROR',
    SET_ERROR = 'SET__ERROR',
    IS_LOADING = 'IS_LOADING',
    IS_HIDDEN = 'IS_HIDDEN'
}

interface IsErrorAction {
    type: GlobalActionTypes.IS_ERROR;
    payload: boolean;
}

interface SetErrorAction {
    type: GlobalActionTypes.SET_ERROR;
    payload: string;
}

interface ChangeHiddenAction {
    type: GlobalActionTypes.IS_HIDDEN;
    payload: boolean;
}

interface ChangeLoadingAction {
    type: GlobalActionTypes.IS_LOADING;
    payload: boolean;
}

export type GlobalAction = IsErrorAction | SetErrorAction | ChangeHiddenAction | ChangeLoadingAction;