import {
    SET_ERRORS,
    LOADING_UI,
    CLEAR_ERRORS,
    SET_PROGRESS,
    CLEAR_PROGRESS,
    CLEAR_UI,
    SET_API_CALL,
    CLEAR_API_CALL,
    CLEAR_DATA,
} from "../types";

const initialState = {
    apiCall: false,
    loading: false,
    errors: null,
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
        default:
            return state;
    }
}
