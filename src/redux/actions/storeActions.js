import {
    ADD_STORE_ITEM,
    SET_STORE,
    UPDATE_STORE_INFO,
    SET_API_CALL,
    CLEAR_API_CALL,
    SET_PROGRESS,
    UPDATE_NEW_PROGRAM,
} from "../types";

import axios from "axios";
import firebase from "firebase";

export const getStore = (id) => (dispatch) => {
    dispatch({ type: SET_API_CALL });
    axios
        .get(`/store/${id}`)
        .then((res) => {
            dispatch({ type: SET_STORE, payload: res.data });
            console.log(res.data);
        })
        .catch((err) => console.error(err));
    dispatch({ type: CLEAR_API_CALL });
};

export const addToStore = (storeId, item) => (dispatch) => {
    dispatch({ type: SET_API_CALL });
    axios
        .post(`/store/${storeId}`, item)
        .then((res) => {
            console.log("Added to store");
        })
        .catch((err) => console.error(err));
};

export const updateStoreSections = (newSection, file) => (dispatch) => {
    dispatch({ type: SET_API_CALL });
    const storeId = newSection.store;
    console.log(newSection);
    delete newSection.preview;
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
                    newSection.imageURL = downloadURL;
                    dispatch({
                        type: UPDATE_NEW_PROGRAM,
                        payload: data,
                    });
                    axios
                        .post(`/store/${storeId}/sections`, newSection)
                        .then((res) => {
                            console.log("Section successfully added");
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

export const deleteStore = (storeId) => (dispatch) => {
    axios
        .delete(`/stores/1EyMzvu0JeDcHuSa10JZ`)
        .then((res) => {
            console.log("store deleted");
        })
        .catch((err) => console.error(err));
};
