import {
    SET_PROGRAMS,
    ADD_PROGRAM,
    UPDATE_NEW_PROGRAM,
    CLEAR_NEW_PROGRAM,
    SET_WORKOUTS,
    ADD_WORKOUT,
    DELETE_WORKOUT,
    UPDATE_NEW_WORKOUT,
    CLEAR_NEW_WORKOUT,
    SET_EXERCISES,
    ADD_EXERCISE,
    UPDATE_NEW_EXERCISE,
    CLEAR_NEW_EXERCISE,
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
        case SET_PROGRAMS:
            return {
                ...state,
                programs: action.payload,
            };

        case ADD_PROGRAM:
            return {
                ...state,
                programs: [...state.programs, action.payload],
            };
        case UPDATE_NEW_PROGRAM:
            return {
                ...state,
                newProgram: {
                    ...state.newProgram,
                    [action.payload.name]: action.payload.value,
                },
            };
        case CLEAR_NEW_PROGRAM:
            return {
                ...state,
                newProgram: {
                    title: "",
                    difficulty: 1,
                    workoutCount: 0,
                    type: "program",
                    description: "",
                    workouts: { "Week 1": [] },
                    image: "imageURL",
                    muscles: [],
                    equipment: [],
                    exerciseCount: 0,
                    workoutCount: 0,
                },
            };
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
        case SET_EXERCISES:
            return {
                ...state,
                exercises: action.payload,
            };
        case ADD_EXERCISE:
            return {
                ...state,
                exercises: [...state.exercises, action.payload],
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
        case CLEAR_NEW_EXERCISE:
            return {
                ...state,
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
            };
        default:
            return state;
    }
}
