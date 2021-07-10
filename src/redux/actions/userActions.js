import {
    SET_USER,
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_UNAUTHENTICATED,
    LOADING_USER,
    SET_API_CALL,
    CLEAR_API_CALL,
    SET_AUTHENTICATED,
    UPDATE_USER_DATA,
    SET_PROGRESS,
} from "../types";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { setUserCollection } from "./dataActions";
import firebase from "firebase";

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    console.log("loggin in");

    firebase
        .auth()
        .signInWithEmailAndPassword(userData.email, userData.password)
        .then((data) => {
            return data.user.getIdToken();
        })
        .then((token) => {
            const FBIdToken = `Bearer ${token}`;
            localStorage.setItem("FBIdToken", FBIdToken);
            axios.defaults.headers.common["Authorization"] = FBIdToken;
            dispatch({ type: SET_AUTHENTICATED });
            dispatch({ type: CLEAR_ERRORS });
            history.push("/");
        })
        .catch((err) => {
            console.error(err);
        });
};

export const oAuthSignUp = (newUserData, userId) => (dispatch) => {
    dispatch({ type: SET_API_CALL });
    console.log(userId);
    axios
        .post(`/user/${userId}`, newUserData)
        .then((res) => {
            dispatch({ type: SET_AUTHENTICATED });

            dispatch({ type: CLEAR_ERRORS });
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err,
            });
        });

    dispatch({ type: CLEAR_API_CALL });
};

export const signupUser = (newUserData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    console.log(newUserData);
    axios
        .post("/signup", newUserData)
        .then((res) => {
            authHeader(res.data.token);
            dispatch({ type: SET_AUTHENTICATED });

            dispatch({ type: CLEAR_ERRORS });
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data,
            });
        });
};

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem("FBIdToken");
    firebase.auth().signOut();
    delete axios.defaults.headers.common["Authorization"];
    dispatch({ type: SET_UNAUTHENTICATED });
};

export const getFBToken = async () => (dispatch) => {
    console.log("start");
    try {
        firebase.auth().onAuthStateChanged((user) => {
            console.log(user);
            firebase
                .auth()
                .currentUser.getIdToken()
                .then((idToken) => {
                    console.log(idToken);
                    const FBIdToken = `Bearer ${idToken}`;
                    dispatch({ type: SET_AUTHENTICATED });
                    axios.defaults.headers.common["Authorization"] = FBIdToken;
                })
                .catch((err) => {
                    console.log(err.error);
                });
        });
    } catch (err) {
        console.log(err);
    }
};

export const getUserData = () => (dispatch) => {
    dispatch({ type: LOADING_USER });
    dispatch(getFBToken());
    axios
        .get("/user")
        .then((res) => {
            const data = {
                ...res.data.userData,
            };
            dispatch({
                type: SET_USER,
                payload: data.user,
            });
            dispatch(setUserCollection(data));
        })
        .catch((err) => console.log(err));
};

export const getNewToken = () => (dispatch) => {
    console.log("get new token");
    let refreshToken = localStorage.RefreshToken;
    const getRefreshToken = firebase.auth().onAuthStateChanged((user) => {
        console.log(firebase.auth().currentUser.refreshToken);
        refreshToken = firebase.auth().currentUser.refreshToken;
    });
    getRefreshToken();
    console.log(refreshToken);
    axios
        .post(
            `https://securetoken.googleapis.com/v1/token?key=AIzaSyBLGnhWNspnEWGMZojO6eTKdUE8FpBtFg0`,
            { grant_type: "refresh_token", refresh_token: refreshToken }
        )
        .then((res) => {
            console.log(res.data);
            authHeader(res.data.id_token);

            const FBIdToken = `Bearer ${res.data.id_token}`;
            localStorage.setItem("FBIdToken", FBIdToken);
            localStorage.setItem(
                "RefreshToken",
                firebase.auth().currentUser.refreshToken
            );
            axios.defaults.headers.common["Authorization"] = FBIdToken;
            dispatch({ type: SET_AUTHENTICATED });
            dispatch(getUserData());
        })
        .catch((err) => {
            dispatch({ type: SET_ERRORS, payload: err });
        });
};

const authHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem("FBIdToken", FBIdToken);
    axios.defaults.headers.common["Authorization"] = FBIdToken;
};

export const updateUserData = (data, file) => (dispatch) => {
    dispatch({ type: SET_API_CALL });

    if (file) {
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child("profileImages");
        fileRef.put(file).then(() => {
            console.log("file uploaded");
        });

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
                console.log(error);
            },
            () => {
                fileUpload.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    console.log(downloadURL);
                    data.imageURL = downloadURL;

                    axios
                        .post("/user", data)
                        .then(() => {
                            dispatch({ type: UPDATE_USER_DATA, payload: data });
                            dispatch({ type: "CLEAR_PROGRESS" });
                        })
                        .catch((err) => {
                            console.error(err);
                        });
                    dispatch({ type: CLEAR_API_CALL });
                });
            }
        );
    } else {
        axios
            .post("/user", data)
            .then(() => {
                dispatch({ type: UPDATE_USER_DATA, payload: data });
                dispatch({ type: "CLEAR_PROGRESS" });
            })
            .catch((err) => {
                console.error(err);
            });
        dispatch({ type: CLEAR_API_CALL });
    }
};
