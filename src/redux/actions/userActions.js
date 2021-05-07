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
    axios
        .post("/login", userData)
        .then((res) => {
            console.log(res.data);
            authHeader(res.data.token);
            dispatch({ type: SET_AUTHENTICATED });
            dispatch(getUserData());
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
    axios
        .post("/signup", newUserData)
        .then((res) => {
            authHeader(res.data.token);
            dispatch({ type: SET_AUTHENTICATED });
            dispatch(getUserData());
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

export const getNewToken = (refreshToken, history) => (dispatch) => {
    axios
        .post(
            `https://securetoken.googleapis.com/v1/token?key=AIzaSyBLGnhWNspnEWGMZojO6eTKdUE8FpBtFg0`,
            { grant_type: "refresh_token", refresh_token: refreshToken }
        )
        .then((res) => {
            authHeader(res.data.token);
            firebase
                .auth()
                .currentUser.getIdToken()
                .then((idToken) => {
                    const FBIdToken = `Bearer ${idToken}`;
                    localStorage.setItem("FBIdToken", FBIdToken);
                });
        })
        .catch((err) => {
            dispatch({ type: SET_ERRORS, payload: err });
        });
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

export const setOpen = () => (dispatch) => {
    dispatch({ type: SET_OPEN });
};

export const setAddOpen = () => (dispatch) => {
    dispatch({ type: SET_ADDOPEN });
};

const authHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem("FBIdToken", FBIdToken);
    axios.defaults.headers.common["Authorization"] = FBIdToken;
};
