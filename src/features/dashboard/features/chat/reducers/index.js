import { SET_RECENT_MESSAGES, CLEAR_DATA } from "./types";

const initialState = {
    recentMessages: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_RECENT_MESSAGES:
            return {
                ...state,
                recentMessages: action.payload,
            };
        case CLEAR_DATA:
            return initialState;
        default:
            return state;
    }
}
