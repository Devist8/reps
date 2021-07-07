import {
    SET_EXERCISES,
    SET_WORKOUTS,
    SET_PROGRAMS,
    LOADING_USER,
    SET_USER,
    SET_ERRORS,
    ADD_EXERCISE,
    ADD_PROGRAM,
    ADD_WORKOUT,
    ADD_TO_SCHEDULE,
    DELETE_WORKOUT,
    UPDATE_NEW_EXERCISE,
    UPDATE_NEW_WORKOUT,
    UPDATE_NEW_PROGRAM,
    CLEAR_NEW_EXERCISE,
    CLEAR_NEW_WORKOUT,
    CLEAR_NEW_PROGRAM,
    SET_AUTHENTICATED,
    SET_MEALS,
    SET_PROGRESS,
    ADD_MEAL,
    UPDATE_NEW_MEAL,
    CLEAR_NEW_MEAL,
    SET_API_CALL,
    CLEAR_API_CALL,
    SET_SCHEDULE,
    CLEAR_PROGRESS,
} from "../types";

import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

import { generateDateRange, scheduleExercises } from "../../util/functions";

import axios from "axios";
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
                                  id: res.data.id,
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
    dispatch({ type: SET_API_CALL });
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

    dispatch({ type: CLEAR_API_CALL });
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
    dispatch({ type: SET_API_CALL });
    if (file) {
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(file.name);
        fileRef.put(file).then(() => {
            console.log("File uploaded");
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
                            dispatch({ type: CLEAR_PROGRESS });
                            dispatch({ type: CLEAR_NEW_EXERCISE });
                        })
                        .catch((err) => console.log(err));
                });
            }
        );
    } else {
        alert("Please select a file.");
    }
    dispatch({ type: CLEAR_API_CALL });
};

export const submitWorkout = (workout, file) => (dispatch) => {
    dispatch({ type: SET_API_CALL });
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

export const submitProgram = (program, file) => (dispatch) => {
    dispatch({ type: "SET_API_CALL" });
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
                            dispatch({ type: CLEAR_API_CALL });
                            dispatch({ type: CLEAR_NEW_PROGRAM });
                        })
                        .catch((err) => {
                            console.log(err);
                            dispatch({ type: CLEAR_API_CALL });
                        });
                });
            }
        );
    } else {
        alert("Please select a file.");
    }
};

export const submitMeal = (meal, file) => (dispatch) => {
    dispatch({ type: SET_API_CALL });
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
                            dispatch({ type: CLEAR_API_CALL });
                            dispatch({ type: CLEAR_NEW_MEAL });
                        })
                        .catch((err) => {
                            console.log(err);
                            dispatch({ type: CLEAR_API_CALL });
                        });
                });
            }
        );
    } else {
        alert("Please select a file.");
    }
};

export const addToCollection = (docId, userId) => (dispatch) => {
    dispatch({ type: SET_API_CALL });
    axios
        .post(`/user/${userId}/workouts/${docId}`)
        .then(() => {
            console.log(firebase.auth().currentUser);
        })
        .catch((err) => {
            console.error(err);
        });
    dispatch({ type: CLEAR_API_CALL });
};

export const addToSchedule = (itemToSchedule) => (dispatch) => {
    dispatch({ type: SET_API_CALL });
    const type = itemToSchedule.type;

    if (type === "workout") {
        itemToSchedule.exercises.map((exercise, index) => {
            return (exercise.date = itemToSchedule.date);
        });
    }
    if (type === "program") {
        let dateIndex = 0;
        itemToSchedule.dateRange = generateDateRange(itemToSchedule);
        console.log(generateDateRange(itemToSchedule));
        Object.values(itemToSchedule.workouts).map((week) => {
            week.sort();
            return week.map((workout) => {
                workout.date = itemToSchedule.dateRange[dateIndex];
                scheduleExercises(workout);
                return (dateIndex = dateIndex + 1);
            });
        });
    }

    axios
        .post("/schedule", itemToSchedule)
        .then((res) => {
            console.log(res);
            dispatch({ type: ADD_TO_SCHEDULE, payload: itemToSchedule });
            dispatch({ type: CLEAR_API_CALL });
        })
        .catch((err) => {
            console.error(err);
        });
};

export const getScheduled = () => (dispatch) => {
    axios.get("/schedule").then((res) => {
        //const thisMorning = dayjs(dayjs(Date.now()).format("L")).valueOf();
    });
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

export const updateScheduledExerciseStatus =
    (scheduledItem, exercise, status) => (dispatch) => {
        dispatch({ type: SET_API_CALL });
        if (exercise.week) {
            scheduledItem.workouts[exercise.week][
                exercise.workoutIndex
            ].exercises[exercise.exerciseIndex].status = status;
        }
        axios
            .post("/schedule/update", scheduledItem)
            .then((res) => {
                console.log("schedule updated");
                axios.get(`/schedule`).then((res) => {
                    console.log(res.data);
                    dispatch({ type: SET_SCHEDULE, payload: res.data });
                });
            })
            .catch((err) => {
                console.error(err);
            });
        dispatch({ type: CLEAR_API_CALL });
    };
