import {
    SET_WORKOUTS,
    ADD_WORKOUT,
    DELETE_WORKOUT,
    UPDATE_NEW_WORKOUT,
    CLEAR_NEW_WORKOUT,
} from "./types";

const initialState = {
    workouts: [],
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
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_WORKOUTS:
            return {
                ...state,
                workouts: action.payload,
            };
        case ADD_WORKOUT:
            return {
                ...state,
                workouts: [...state.workouts, action.payload],
            };
        case DELETE_WORKOUT:
            return {
                ...state,
                programs: state.programs.filter((x) => x.id !== action.payload),
                workouts: state.workouts.filter((x) => x.id !== action.payload),
                exercises: state.exercises.filter(
                    (x) => x.id !== action.payload
                ),
            };
        case UPDATE_NEW_WORKOUT:
            return {
                ...state,
                newWorkout: {
                    ...state.newWorkout,
                    [action.payload.name]: action.payload.value,
                },
            };
        case CLEAR_NEW_WORKOUT:
            return {
                ...state,
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
            };
        default:
            return state;
    }
}
