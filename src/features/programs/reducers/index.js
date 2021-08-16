import {
    SET_PROGRAMS,
    ADD_PROGRAM,
    UPDATE_NEW_PROGRAM,
    CLEAR_NEW_PROGRAM,
} from "./types";

const initialState = {
    programs: [],
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
        default:
            return state;
    }
}
