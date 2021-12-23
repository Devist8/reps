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
                ...action.payload,
            };
        case UPDATE_STORE_INFO:
            return {
                ...state,
                info: { ...state.info, ...action.payload },
            };
        case ADD_STORE_ITEM:
            return {
                ...state,
                inventory: [...state.inventory, action.payload],
            };
        case ADD_TO_CART:
            return {
                ...state,
                cart: [...state.cart, action.payload],
            };
        case REMOVE_FROM_CART:
            console.log(state.cart);
            return {
                ...state,

                cart: [
                    ...state.cart.filter((x) => x.itemId !== action.payload),
                ],
            };
        default:
            return state;
    }
}
