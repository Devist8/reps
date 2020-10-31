import {
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_OPEN,
  SET_ADDOPEN,
} from '../types';

const initialState = {
  loading: false,
  errors: null,
  open: false,
  addOpen: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: null,
      };
    case LOADING_UI:
      return {
        ...state,
        loading: true,
      };
    case SET_OPEN:
      return {
        ...state,
        open: !state.open,
      };
    case SET_ADDOPEN:
      return {
        ...state,
        addOpen: !state.addOpen,
      };
    default:
      return state;
  }
}
