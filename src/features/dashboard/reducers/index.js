import { SET_FILE, CEAR_FILE } from "./types";

const initialState = {
    file: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_FILE:
            console.log(action.payload);
            return {
                ...state,
                file: action.payload,
            };
        case CLEAR_FILE:
            return {
                ...state,
                file: null,
            };
        default:
            return state;
    }
}
