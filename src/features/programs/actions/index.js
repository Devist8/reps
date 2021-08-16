import {
    SET_PROGRAMS,
    ADD_PROGRAM,
    UPDATE_NEW_PROGRAM,
    CLEAR_NEW_PROGRAM,
} from "./types";

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
