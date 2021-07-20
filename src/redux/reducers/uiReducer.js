import {
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_OPEN,
    SET_ADDOPEN,
    SET_PROGRESS,
    CLEAR_PROGRESS,
    CLEAR_UI,
} from "../types";

const initialState = {
    loading: false,
    errors: null,
    open: false,
    addOpen: false,
    progress: 0,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_ERRORS:
            return {
                ...state,
                loading: false,
                errors: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                errors: null,
            };
        case LOADING_UI:
            return {
                ...state,
                loading: !state.loading,
            };
        case SET_OPEN:
            return {
                ...state,
                open: !state.open,
            };
        case SET_ADDOPEN:
            return {
                ...state,
                addOpen: !state.addOpen,
            };
        case SET_PROGRESS:
            console.log(action.payload);
            return {
                ...state,
                progress: action.payload,
            };
        case CLEAR_PROGRESS:
            return {
                ...state,
                progress: 0,
            };
        case CLEAR_UI:
            return initialState;
        default:
            return state;
    }
}
