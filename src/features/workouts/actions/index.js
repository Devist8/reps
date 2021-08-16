import {
    SET_WORKOUTS,
    ADD_WORKOUT,
    DELETE_WORKOUT,
    UPDATE_NEW_WORKOUT,
    CLEAR_NEW_WORKOUT,
} from "./types";

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
