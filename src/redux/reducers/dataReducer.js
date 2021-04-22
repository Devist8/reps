import { PlayArrow } from "@material-ui/icons";
import { SET_VALUE, SET_EXERCISES, SET_PROGRAMS, SET_WORKOUTS } from "../types";

const initialState = {
    exercises: [],
    workouts: [],
    programs: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_EXERCISES:
            return {
                ...state,
                exercises: action.payload,
            };
        case SET_WORKOUTS:
            return {
                ...state,
                workouts: action.payload,
            };
        case SET_PROGRAMS:
            return {
                ...state,
                programs: action.payload,
            };
        default:
            return state;
    }
}
