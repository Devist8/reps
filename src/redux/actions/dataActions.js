import {
    SET_EXERCISES,
    SET_WORKOUTS,
    SET_PROGRAMS,
    LOADING_USER,
    SET_USER,
    SET_TEMP_URL,
    CLEAR_TEMP_URL,
    UPDATE_NEW_EXERCISE,
    UPDATE_NEW_WORKOUT,
    UPDATE_NEW_PROGRAM,
} from "../types";

import axios from "axios";
import { Redirect } from "react-router-dom";
import firebase from "firebase";

export const setUserCollection = (data) => (dispatch) => {
    dispatch({ type: SET_EXERCISES, payload: data.exercises });
    dispatch({ type: SET_WORKOUTS, payload: data.workouts });
    dispatch({ type: SET_PROGRAMS, payload: data.programs });
};

export const updateNewExercise = (data) => (dispatch) => {
    dispatch({ type: UPDATE_NEW_EXERCISE, payload: data });
};

export const updateNewWorkout = (data) => (dispatch) => {
    dispatch({ type: UPDATE_NEW_WORKOUT, payload: data });
};

export const updateNewProgram = (data) => (dispatch) => {
    dispatch({ type: UPDATE_NEW_PROGRAM, payload: data });
};

export const getUserData = () => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios
        .get("/user")
        .then((res) => {
            const data = {
                ...res.data.userData,
            };
            dispatch(setUserCollection(data));
            dispatch({
                type: SET_USER,
                payload: data.user,
            });
        })
        .catch((err) => console.log(err));
};

export const uploadImage = (formData) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios
        .post("/user/image", formData)
        .then((res) => {
            return res.imageURL;
        })
        .catch((err) => console.log(err));
};

export const uploadVideo = (formData) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios
        .post("/video", formData)
        .then((res) => {
            const data = {
                name: "videoURL",
                value: res.data.videoURL,
            };
            dispatch(updateNewExercise(data));
        })
        .catch((err) => console.log(err));
};

export const uploadNewWorkoutImage = (formData) => (dispatch) => {
    axios
        .post("/user/image", formData)
        .then((res) => {
            const data = {
                name: "imageURL",
                value: res.data.imageURL,
            };
            dispatch(updateNewWorkout(data));
        })
        .catch((err) => console.log(err));
};
