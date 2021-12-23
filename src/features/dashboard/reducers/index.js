import { SET_SCHEDULE, ADD_TO_SCHEDULE } from "./types";

const initialState = {
    file: null,
    schedule: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_SCHEDULE:
            return {
                ...state,
                schedule: action.payload,
            };
        case ADD_TO_SCHEDULE:
            return {
                ...state,
                schedule: [...state.schedule, action.payload],
            };
        default:
            return state;
    }
}
