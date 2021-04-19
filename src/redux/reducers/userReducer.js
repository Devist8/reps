import {
    SET_USER,
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
    LOADING_USER,
    ADD_TASK,
    UPDATE_TASKS,
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
        case ADD_TASK:
            return {
                ...state,
                tasks: state.tasks.concat(action.payload),
            };
        case UPDATE_TASKS:
            return {
                ...state,
                tasks: action.payload,
            };
        case SET_USER:
            return {
                authenticated: true,
                ...action.payload,
                loading: false,
            };
        case LOADING_USER:
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
}
