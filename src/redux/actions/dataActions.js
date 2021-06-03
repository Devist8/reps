import {
    SET_EXERCISES,
    SET_WORKOUTS,
    SET_PROGRAMS,
    LOADING_USER,
    SET_USER,
    SET_ERRORS,
    UPDATE_NEW_EXERCISE,
    UPDATE_NEW_WORKOUT,
    UPDATE_NEW_PROGRAM,
    ADD_EXERCISE,
    ADD_PROGRAM,
    ADD_WORKOUT,
    CLEAR_NEW_EXERCISE,
    CLEAR_NEW_WORKOUT,
    CLEAR_NEW_PROGRAM,
    SET_AUTHENTICATED,
    SET_MEALS,
} from "../types";

import { getFBToken } from "./userActions";

import axios from "axios";
import { Redirect } from "react-router-dom";
import firebase from "firebase";

export const setUserCollection = (data) => (dispatch) => {
    dispatch({ type: SET_EXERCISES, payload: data.exercises });
    dispatch({ type: SET_WORKOUTS, payload: data.workouts });
    dispatch({ type: SET_PROGRAMS, payload: data.programs });
    dispatch({ type: SET_MEALS, payload: data.meals });
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

export const uploadToFirebase = (file) => (dispatch) => {
    if (file) {
        console.log(file);
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(file.name);
        fileRef.put(file).then(() => {
            alert("File uploaded.");
        });

        const fileUpload = fileRef.put(file);

        fileUpload.on(
            "state_changed",
            (snapshot) => {
                let progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload is ${progress}% done`);
            },
            (error) => {
                console.log(error);
            },
            () => {
                fileUpload.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    console.log(downloadURL);
                });
            }
        );
    } else {
        alert("Please select a file.");
    }
};

export const getUserData = () => (dispatch) => {
    dispatch({ type: LOADING_USER });
    console.log(firebase.auth().currentUser);
    firebase
        .auth()
        .currentUser.getIdToken()
        .then((idToken) => {
            const FBIdToken = `Bearer ${idToken}`;
            dispatch({ type: SET_AUTHENTICATED });
            axios.defaults.headers.common["Authorization"] = FBIdToken;
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
                .catch((err) => dispatch({ type: SET_ERRORS, payload: err }));
        })
        .catch((err) => {
            dispatch({ type: SET_ERRORS, payload: err });
        });
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
    for (let value of formData.values()) {
        console.log(value);
    }
    console.log(formData.values().name);
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

export const uploadNewProgramImage = (formData) => (dispatch) => {
    axios
        .post("user/image", formData)
        .then((res) => {
            const data = {
                name: "imageURL",
                value: res.data.imageURL,
            };
            dispatch(updateNewProgram(data));
        })
        .catch((err) => console.log(err));
};

export const submitExercise = (exercise) => (dispatch) => {
    axios
        .post("/workouts/exercise", exercise)
        .then((res) => {
            console.log(res.data);
            dispatch({ type: ADD_EXERCISE, payload: exercise });
            dispatch({ type: CLEAR_NEW_EXERCISE });
        })
        .catch((err) => console.log(err));
};

export const submitWorkout = (workout) => (dispatch) => {
    axios
        .post("/workouts/workout", workout)
        .then(() => {
            dispatch({ type: ADD_WORKOUT, payload: workout });
            dispatch({ type: CLEAR_NEW_WORKOUT });
        })
        .catch((err) => console.log(err));
};

export const submitProgram = (program) => (dispatch) => {
    axios
        .post("/workouts/program", program)
        .then(() => {
            dispatch({ type: ADD_PROGRAM, payload: program });
            dispatch({ type: CLEAR_NEW_PROGRAM });
        })
        .catch((err) => console.log(err));
};
