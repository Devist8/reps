import { SET_EXERCISES, SET_WORKOUTS, SET_PROGRAMS } from "../types";

import axios from "axios";
import { Redirect } from "react-router-dom";
import firebase from "firebase";

export const setUserCollection = (data) => (dispatch) => {
    console.log(data.exercises);
    dispatch({ type: SET_EXERCISES, payload: data.exercises });
    dispatch({ type: SET_WORKOUTS, payload: data.workouts });
    dispatch({ type: SET_PROGRAMS, payload: data.programs });
};
