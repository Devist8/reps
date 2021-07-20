import { PlayArrow } from "@material-ui/icons";
import {
    SET_VALUE,
    SET_EXERCISES,
    SET_PROGRAMS,
    SET_WORKOUTS,
    SET_RECENT_MESSAGES,
    CLEAR_RECENT_MESSAGES,
    UPDATE_NEW_EXERCISE,
    UPDATE_NEW_WORKOUT,
    UPDATE_NEW_PROGRAM,
    UPDATE_NEW_MEAL,
    ADD_EXERCISE,
    ADD_WORKOUT,
    ADD_PROGRAM,
    ADD_TO_SCHEDULE,
    UPDATE_SCHEDULE,
    DELETE_WORKOUT,
    CLEAR_NEW_EXERCISE,
    CLEAR_NEW_WORKOUT,
    CLEAR_NEW_PROGRAM,
    SET_FILE,
    CLEAR_FILE,
    SET_MEALS,
    CLEAR_NEW_MEAL,
    SET_SCHEDULE,
    SET_API_CALL,
    CLEAR_API_CALL,
    SET_STORE,
    UPDATE_STORE_INFO,
    ADD_STORE_ITEM,
    DELETE_STORE_ITEM,
    CLEAR_DATA,
} from "../types";

const initialState = {
    apiCall: false,
    exercises: [],
    workouts: [],
    programs: [],
    recentMessages: [],
    meals: [],
    schedule: [],
    file: null,
    store: {},
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
    newProgram: {
        title: "",
        difficulty: 1,
        workoutCount: 0,
        type: "program",
        description: "",
        workouts: { "Week 1": [] },
        imageURL: "",
        muscles: [],
        equipment: [],
        exerciseCount: 0,
    },
    newMeal: {
        title: "",
        imageURL: "",
        rating: "",
        labels: [],
        ingredients: [],
        directions: [],
        nutrition: [],
        type: "",
    },
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
        case SET_API_CALL:
            return {
                ...state,
                apiCall: true,
            };
        case CLEAR_API_CALL:
            return {
                ...state,
                apiCall: false,
            };
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
        case SET_MEALS:
            return {
                ...state,
                meals: action.payload,
            };
        case SET_SCHEDULE:
            return {
                ...state,
                schedule: action.payload,
            };
        case ADD_EXERCISE:
            return {
                ...state,
                exercises: [...state.exercises, action.payload],
            };
        case ADD_WORKOUT:
            return {
                ...state,
                workouts: [...state.workouts, action.payload],
            };
        case ADD_PROGRAM:
            return {
                ...state,
                programs: [...state.programs, action.payload],
            };
        case ADD_TO_SCHEDULE:
            return {
                ...state,
                schedule: [...state.schedule, action.payload],
            };
        case UPDATE_SCHEDULE:
            const newSchedule = state.schedule.filter(
                (x) => x.id === action.payload.id
            );
            newSchedule.concat(action.payload);
            return {
                ...state,
                schedule: newSchedule,
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
        case UPDATE_NEW_MEAL:
            return {
                ...state,
                newMeal: {
                    ...state.newMeal,
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
        case CLEAR_NEW_MEAL:
            return {
                ...state,
                newMeal: {
                    title: "",
                    imageURL: "",
                    rating: "",
                    labels: [],
                    ingredients: [],
                    directions: [],
                    nutrition: [],
                    type: "",
                },
            };
        case SET_STORE:
            return {
                ...state,
                store: action.payload,
            };
        case UPDATE_STORE_INFO:
            return {
                ...state,
                store: {
                    ...state.store,
                    info: { ...state.store.info, ...action.payload },
                },
            };
        case ADD_STORE_ITEM:
            return {
                ...state,
                store: {
                    ...state.store,
                    collection: [...state.store.collection, action.payload],
                },
            };
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
