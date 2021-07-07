import {
    SET_USER,
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
    LOADING_USER,
    SET_API_CALL,
    CLEAR_API_CALL,
    UPDATE_USER_DATA,
} from "../types";

const initialState = {
    authenticated: false,
    info: {},
    loading: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true,
            };
        case SET_UNAUTHENTICATED:
            return initialState;
        case SET_USER:
            return {
                ...state,
                authenticated: true,
                info: action.payload,
                loading: false,
            };
        case LOADING_USER:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_USER_DATA:
            return {
                ...state,
                info: {
                    ...state.info,
                    ...action.payload,
                },
            };
        default:
            return state;
    }
}
