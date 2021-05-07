import { PlayArrow } from "@material-ui/icons";
import {
    SET_VALUE,
    SET_EXERCISES,
    SET_PROGRAMS,
    SET_WORKOUTS,
    SET_TEMP_URL,
    CLEAR_TEMP_URL,
    UPDATE_NEW_EXERCISE,
    UPDATE_NEW_WORKOUT,
    UPDATE_NEW_PROGRAM,
} from "../types";

const initialState = {
    exercises: [],
    workouts: [],
    programs: [],
    newExercise: {
        title: "",
        difficulty: 1,
        activity: "",
        motion: "",
        muscles: [],
        equipment: [],
        videoURL: "",
        type: "exercise",
    },
    newWorkout: {
        title: "",
        difficulty: 1,
        exercises: [],
        imageURL: "",
        description: [],
        equipment: [],
        muscles: [],
        exerciseCount: 0,
        type: "workout",
    },
    newProgram: {},
    tempURL: "",
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
        case UPDATE_NEW_EXERCISE:
            console.log(action.payload);
            return {
                ...state,
                newExercise: {
                    ...state.newExercise,
                    [action.payload.name]: action.payload.value,
                },
            };
        case UPDATE_NEW_WORKOUT:
            return {
                ...state,
                newWorkout: {
                    ...state.newWorkout,
                    [action.payload.name]: action.payload.value,
                },
            };
        case UPDATE_NEW_PROGRAM:
            return {
                ...state,
                newProgram: {
                    ...state.newProgram,
                    [action.payload.name]: action.payload.value,
                },
            };
        case SET_TEMP_URL:
            return {
                ...state,
                tempURL: action.payload,
            };
        case CLEAR_TEMP_URL:
            return {
                ...state,
                tempURL: "",
            };
        default:
            return state;
    }
}
