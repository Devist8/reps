import {
    SET_STORE,
    UPDATE_STORE_INFO,
    ADD_STORE_ITEM,
    DELETE_STORE_ITEM,
    ADD_TO_CART,
    REMOVE_FROM_CART,
} from "./types";

const initialState = {
    info: {},
    inventory: [],
    cart: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_STORE:
            return {
                ...state,
                store: { ...action.payload },
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
                    inventory: [...state.store.inventory, action.payload],
                },
            };
        case ADD_TO_CART:
            return {
                ...state,
                store: {
                    ...state.store,
                    cart: [...state.store.cart, action.payload],
                },
            };
        case REMOVE_FROM_CART:
            return {
                ...state,
                store: {
                    ...state.store,
                    cart: [
                        ...state.store.cart.filter(
                            (x) => x.id !== action.payload.id
                        ),
                    ],
                },
            };
        default:
            return state;
    }
}
