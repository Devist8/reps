import {
    SET_USER,
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_UNAUTHENTICATED,
    LOADING_USER,
    SET_OPEN,
    SET_ADDOPEN,
    SET_AUTHENTICATED,
} from "../types";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { setUserCollection } from "./dataActions";
import firebase from "firebase";

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    console.log("loggin in");
    axios
        .post("/login", userData)
        .then((res) => {
            console.log(res);
            firebase.auth().currentUser.getIdToken();
        })
        .then((idToken) => {
            console.log(idToken);
            dispatch({ type: SET_AUTHENTICATED });
            dispatch({ type: CLEAR_ERRORS });
            history.push("/");
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response,
            });
        });
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

            history.push("/");
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err,
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
    const refreshToken = localStorage.RefreshToken;
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
