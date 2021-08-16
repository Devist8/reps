import {
    SET_MEALS,
    UPPDATE_NEW_MEAL,
    CLEAR_NEW_MEAL,
    ADD_NEW_MEAL,
    ADD_MEAL,
} from "./types";

const initialState = {
    meals: [],
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
        case SET_MEALS:
            return {
                ...state,
                meals: action.payload,
            };
        case UPDATE_NEW_MEAL:
            return {
                ...state,
                newMeal: {
                    ...state.newMeal,
                    [action.payload.name]: action.payload.value,
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
        default:
            return state;
    }
}
