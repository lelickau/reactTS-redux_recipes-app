import { GlobalAction, GlobalActionTypes, GlobalState } from "../../types/global";

const globalState: GlobalState = {
    error: null,
    loading: false,
    isHidden: true,
}

export default function globalReducer(state = globalState, action: GlobalAction): GlobalState {
    switch (action.type) {
        case GlobalActionTypes.IS_ERROR:
            return {...state, error: action.payload}

        case GlobalActionTypes.SET_ERROR:
            return {...state, error: action.payload}

        case GlobalActionTypes.IS_HIDDEN:
            return {...state, isHidden: action.payload}

        case GlobalActionTypes.IS_LOADING:
            return {...state, loading: action.payload}

        default:
            return state;
    }
}