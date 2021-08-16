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
    dispatch({ type: LOADING_UI });
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
    dispatch({ type: LOADING_UI });
};

export const logoutUser = () => (dispatch) => {
    dispatch({ type: LOADING_UI });
    localStorage.removeItem("FBIdToken");
    firebase.auth().signOut();
    delete axios.defaults.headers.common["Authorization"];
    dispatch({ type: CLEAR_USER });
    dispatch({ type: CLEAR_DATA });
    dispatch({ type: LOADING_UI });
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

export const getNewToken = () => (dispatch) => {
    let newToken;
    firebase
        .auth()
        .currentUser.getIdToken()
        .then((idToken) => {
            newToken = idToken;
            authHeader(newToken);
        });
};

const authHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem("FBIdToken", FBIdToken);
    axios.defaults.headers.common["Authorization"] = FBIdToken;
};
