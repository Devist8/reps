import {
    SET_EXERCISES,
    SET_WORKOUTS,
    SET_PROGRAMS,
    LOADING_USER,
    SET_USER,
    SET_ERRORS,
    UPDATE_NEW_EXERCISE,
    UPDATE_NEW_WORKOUT,
    UPDATE_NEW_PROGRAM,
    ADD_EXERCISE,
    ADD_PROGRAM,
    ADD_WORKOUT,
    CLEAR_NEW_EXERCISE,
    CLEAR_NEW_WORKOUT,
    CLEAR_NEW_PROGRAM,
    SET_AUTHENTICATED,
    SET_MEALS,
    SET_PROGRESS,
    CLEAR_PROGRESS,
    ADD_MEAL,
    ADD_NEW_MEAL,
    UPDATE_NEW_MEAL,
    CLEAR_NEW_MEAL,
    SET_SCHEDULE,
} from "../types";

import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

import { getFBToken } from "./userActions";
import {
    generateDateRange,
    getWorkoutCount,
    scheduleExercises,
} from "../../util/functions";

import axios from "axios";
import { Redirect } from "react-router-dom";
import firebase from "firebase";
dayjs.extend(LocalizedFormat);

export const setUserCollection = (data) => (dispatch) => {
    dispatch({ type: SET_EXERCISES, payload: data.exercises });
    dispatch({ type: SET_WORKOUTS, payload: data.workouts });
    dispatch({ type: SET_PROGRAMS, payload: data.programs });
    dispatch({ type: SET_MEALS, payload: data.meals });
    dispatch({ type: SET_SCHEDULE, payload: data.schedule });
};

export const updateNewExercise = (data) => (dispatch) => {
    dispatch({ type: UPDATE_NEW_EXERCISE, payload: data });
};

export const updateNewWorkout = (data) => (dispatch) => {
    dispatch({ type: UPDATE_NEW_WORKOUT, payload: data });
};

export const updateNewProgram = (data) => (dispatch) => {
    dispatch({ type: UPDATE_NEW_PROGRAM, payload: data });
};

export const uploadToFirebase = (file, setImage) => (dispatch) => {
    if (file) {
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(file.name);
        fileRef.put(file).then(() => {
            alert("File uploaded.");
        });

        const fileUpload = fileRef.put(file);

        fileUpload.on(
            "state_changed",
            (snapshot) => {
                let progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload is ${progress}% done`);
            },
            (error) => {
                console.log(error);
            },
            () => {
                fileUpload.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    console.log(downloadURL);
                });
            }
        );
    } else {
        alert("Please select a file.");
    }
};

export const getUserData = () => (dispatch) => {
    dispatch({ type: LOADING_USER });
    console.log(firebase.auth().currentUser);
    firebase.auth().onAuthStateChanged((user) => {
        user
            ? firebase
                  .auth()
                  .currentUser.getIdToken()
                  .then((idToken) => {
                      const FBIdToken = `Bearer ${idToken}`;
                      dispatch({ type: SET_AUTHENTICATED });
                      axios.defaults.headers.common["Authorization"] =
                          FBIdToken;
                      axios
                          .get("/user")
                          .then((res) => {
                              const data = {
                                  ...res.data.userData,
                              };
                              console.log(data);
                              dispatch(setUserCollection(data));
                              dispatch({
                                  type: SET_USER,
                                  payload: data.user,
                              });
                          })
                          .catch((err) =>
                              dispatch({ type: SET_ERRORS, payload: err })
                          );
                  })
                  .catch((err) => {
                      dispatch({ type: SET_ERRORS, payload: err });
                  })
            : console.log("Please log in again.");
    });
};

export const uploadNewWorkoutImage = (formData) => (dispatch) => {
    axios
        .post("/user/image", formData)
        .then((res) => {
            const data = {
                name: "imageURL",
                value: res.data.imageURL,
            };
            dispatch(updateNewWorkout(data));
        })
        .catch((err) => console.log(err));
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
        .catch((err) => console.log(err));
};

export const submitExercise = (exercise, file) => (dispatch) => {
    if (file) {
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(file.name);
        fileRef.put(file).then(() => {
            alert("File uploaded.");
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
                            dispatch({ type: CLEAR_NEW_EXERCISE });
                        })
                        .catch((err) => console.log(err));
                });
            }
        );
    } else {
        alert("Please select a file.");
    }
};

export const submitWorkout = (workout, file) => (dispatch) => {
    if (file) {
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(file.name);
        fileRef.put(file).then(() => {
            alert("File uploaded.");
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
                            dispatch({ type: CLEAR_NEW_WORKOUT });
                        })
                        .catch((err) =>
                            dispatch({ type: SET_ERRORS, payload: err })
                        );
                });
            }
        );
    } else {
        alert("Please select a file.");
    }
};

export const submitProgram = (program, file) => (dispatch) => {
    if (file) {
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(file.name);
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
                            dispatch({ type: CLEAR_NEW_PROGRAM });
                        })
                        .catch((err) => console.log(err));
                });
            }
        );
    } else {
        alert("Please select a file.");
    }
};

export const submitMeal = (meal, file) => (dispatch) => {
    if (file) {
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(file.name);
        fileRef.put(file).then(() => {
            alert("File uploaded.");
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
                    const data = {
                        name: "videoURL",
                        value: downloadURL,
                    };
                    meal.imageURL = downloadURL;
                    dispatch({ type: UPDATE_NEW_MEAL, payload: data });
                    console.log(meal);
                    axios
                        .post("/meals", meal)
                        .then(() => {
                            dispatch({ type: ADD_MEAL, payload: meal });
                            dispatch({ type: CLEAR_NEW_MEAL });
                        })
                        .catch((err) => console.log(err));
                });
            }
        );
    } else {
        alert("Please select a file.");
    }
};

export const addToSchedule = (itemToSchedule) => (dispatch) => {
    const type = itemToSchedule.type;

    if (type === "workout") {
        itemToSchedule.exercises.map((exercise, index) => {
            exercise.date = itemToSchedule.date;
        });
    }
    if (type === "program") {
        let dateIndex = 0;
        itemToSchedule.dateRange = generateDateRange(itemToSchedule);
        console.log(generateDateRange(itemToSchedule));
        Object.values(itemToSchedule.workouts).map((week) => {
            week.sort();
            week.map((workout) => {
                workout.date = itemToSchedule.dateRange[dateIndex];
                scheduleExercises(workout);
                dateIndex = dateIndex + 1;
            });
        });
    }

    axios
        .post("/schedule", itemToSchedule)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.error(err);
        });
};

export const getScheduled = () => (dispatch) => {
    axios.get("/schedule").then((res) => {
        const thisMorning = dayjs(dayjs(Date.now()).format("L")).valueOf();
        console.log(thisMorning);
        console.log(res.data);
    });
};
