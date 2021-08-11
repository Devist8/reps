import firebase from "firebase";
import axios from "axios";
import { auth } from "../util/config";
import { takeEvery } from "redux-saga/effects";

const getToken = () => {
    firebase.auth().onAuthStateChanged((user) => {
        user &&
            firebase
                .auth()
                .currentUser.getIdToken()
                .then((idToken) => {
                    const FBIdToken = `Bearer ${idToken}`;

                    return (axios.defaults.headers.common["Authorization"] =
                        FBIdToken);
                })
                .catch((err) => {
                    return console.error(err);
                });
    });
};

export function* authTokenMiddleWare() {
    yield takeEvery("SET_API_CALL", getToken);
}
