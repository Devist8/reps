import axios from "axios";
import firebase from "firebase";

import {
    SET_MEALS,
    UPDATE_NEW_MEAL,
    CLEAR_NEW_MEAL,
    ADD_NEW_MEAL,
    ADD_MEAL,
} from "../reducers/types";

import {
    SET_PROGRESS,
    SET_API_CALL,
    CLEAR_API_CALL,
} from "../../../../../redux/types";

export const submitMeal = (meal, file) => (dispatch) => {
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
                    meal.imageURL = downloadURL;
                    dispatch({ type: UPDATE_NEW_MEAL, payload: data });

                    axios
                        .post("/meals", meal)
                        .then(() => {
                            dispatch({ type: ADD_MEAL, payload: meal });
                            dispatch({ type: CLEAR_API_CALL });
                            dispatch({ type: CLEAR_NEW_MEAL });
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
