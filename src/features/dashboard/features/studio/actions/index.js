import axios from "axios";
import firebase from "firebase";

import {
    SET_API_CALL,
    SET_PROGRESS,
    CLEAR_API_CALL,
    CLEAR_PROGRESS,
    SET_ERRORS,
} from "../../../reducers/types";

import {
    ADD_PROGRAM,
    UPDATE_NEW_PROGRAM,
    CLEAR_NEW_PROGRAM,
    ADD_WORKOUT,
    DELETE_WORKOUT,
    UPDATE_NEW_WORKOUT,
    CLEAR_NEW_WORKOUT,
    UPDATE_NEW_EXERCISE,
    ADD_EXERCISE,
    CLEAR_NEW_EXERCISE,
} from "../reducers/types";

export const updateNewProgram = (data) => (dispatch) => {
    dispatch({ type: UPDATE_NEW_PROGRAM, payload: data });
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
        .catch((err) => console.error(err));
};

export const submitProgram = (program, file) => (dispatch) => {
    dispatch({ type: "SET_API_CALL" });
    if (file) {
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(file.name);

        const fileUpload = fileRef.put(file);

        fileUpload.on(
            "state_changed",
            (snapshot) => {
                dispatch({
                    type: SET_PROGRESS,
                    payload:
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
                });
            },
            (error) => {
                console.error(error);
            },
            () => {
                fileUpload.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    const data = {
                        name: "videoURL",
                        value: downloadURL,
                    };
                    program.imageURL = downloadURL;
                    dispatch({ type: UPDATE_NEW_PROGRAM, payload: data });
                    axios
                        .post("/workouts/program", program)
                        .then(() => {
                            dispatch({ type: ADD_PROGRAM, payload: program });
                            dispatch({ type: CLEAR_API_CALL });
                            dispatch({ type: CLEAR_NEW_PROGRAM });
                        })
                        .catch((err) => {
                            console.error(err);
                            dispatch({ type: CLEAR_API_CALL });
                        });
                });
            }
        );
    } else {
        alert("Please select a file.");
    }
};

export const updateNewWorkout = (data) => (dispatch) => {
    dispatch({ type: UPDATE_NEW_WORKOUT, payload: data });
};

export const submitWorkout = (workout, file) => (dispatch) => {
    dispatch({ type: SET_API_CALL });
    if (file) {
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(file.name);

        const fileUpload = fileRef.put(file);

        fileUpload.on(
            "state_changed",
            (snapshot) => {
                dispatch({
                    type: SET_PROGRESS,
                    payload:
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
                });
            },
            (error) => {
                console.error(error);
            },
            () => {
                fileUpload.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    const data = {
                        name: "videoURL",
                        value: downloadURL,
                    };
                    workout.imageURL = downloadURL;
                    dispatch({ type: UPDATE_NEW_WORKOUT, payload: data });

                    axios
                        .post("/workouts/workout", workout)
                        .then(() => {
                            dispatch({ type: ADD_WORKOUT, payload: workout });
                            dispatch({ type: CLEAR_API_CALL });
                            dispatch({ type: CLEAR_NEW_WORKOUT });
                            dispatch({ type: CLEAR_PROGRESS });
                        })
                        .catch((err) => {
                            dispatch({ type: SET_ERRORS, payload: err });
                            dispatch({ type: CLEAR_API_CALL });
                        });
                });
            }
        );
    } else {
        dispatch({ type: CLEAR_API_CALL });
        alert("Please select a file.");
    }
};

export const deleteWorkout = (docId) => (dispatch) => {
    dispatch({ type: SET_API_CALL });
    axios
        .delete(`/workouts/${docId}`)
        .then((res) => {
            dispatch({ type: DELETE_WORKOUT, payload: docId });
        })
        .catch((err) => {
            console.error(err);
        });
    dispatch({ type: CLEAR_API_CALL });
};

export const updateNewExercise = (data) => (dispatch) => {
    dispatch({ type: UPDATE_NEW_EXERCISE, payload: data });
};

export const submitExercise = (exercise, file) => (dispatch) => {
    dispatch({ type: SET_API_CALL });
    if (file) {
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(file.name);

        const fileUpload = fileRef.put(file);

        fileUpload.on(
            "state_changed",
            (snapshot) => {
                dispatch({
                    type: SET_PROGRESS,
                    payload:
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
                });
            },
            (error) => {
                console.error(error);
            },
            () => {
                fileUpload.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    const data = {
                        name: "videoURL",
                        value: downloadURL,
                    };
                    exercise.videoURL = downloadURL;
                    dispatch({ type: UPDATE_NEW_EXERCISE, payload: data });
                    axios
                        .post("/workouts/exercise", exercise)
                        .then((res) => {
                            dispatch({ type: ADD_EXERCISE, payload: exercise });
                            dispatch({ type: CLEAR_PROGRESS });
                            dispatch({ type: CLEAR_NEW_EXERCISE });
                        })
                        .catch((err) => console.error(err));
                });
            }
        );
    } else {
        alert("Please select a file.");
    }
    dispatch({ type: CLEAR_API_CALL });
};

export const addToCollection = (docId, userId) => (dispatch) => {
    dispatch({ type: SET_API_CALL });
    axios
        .post(`/user/${userId}/workouts/${docId}`)
        .then(() => {})
        .catch((err) => {
            console.error(err);
        });
    dispatch({ type: CLEAR_API_CALL });
};
