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
    UPDATE_STORE_INFO,
    SET_STORE,
    ADD_STORE_ITEM,
    DELETE_STORE_ITEM,
    UPDATE_USER_DATA,
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

        const fileUpload = fileRef.put(file);

        fileUpload.on(
            "state_changed",
            (snapshot) => {
                let progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
            (error) => {
                console.error(error);
            },
            () => {
                fileUpload.snapshot.ref
                    .getDownloadURL()
                    .then((downloadURL) => {});
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

                              dispatch(setUserCollection(data));
                              dispatch({
                                  type: SET_USER,
                                  payload: data.user,
                              });

                              data.user.admin &&
                                  axios.get("/users").then((res) => {
                                      const users = [...res.data.users];

                                      const usersData = {
                                          users: users,
                                      };
                                      dispatch({
                                          type: UPDATE_USER_DATA,
                                          payload: usersData,
                                      });
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
        dispatch({ type: LOADING_USER });
    });
};

export const addToSchedule = (itemToSchedule) => (dispatch) => {
    dispatch({ type: SET_API_CALL });
    const type = itemToSchedule.type;
    const exercises = [];
    if (type === "workout") {
        itemToSchedule.exercises.map((exercise, index) => {
            exercise.date = itemToSchedule.date;
            exercises.push(exercise);
        });
    }
    if (type === "program") {
        let dateIndex = 0;
        itemToSchedule.dateRange = generateDateRange(itemToSchedule);

        Object.values(itemToSchedule.workouts).map((week) => {
            week.sort();
            return week.map((workout) => {
                workout.date = itemToSchedule.dateRange[dateIndex];
                const workouts = scheduleExercises(workout);
                workouts.exercises.forEach((exercise) => {
                    exercises.push(exercise);
                });
            });
        });
    }
    console.log(exercises);
    exercises.forEach((exercise) => {
        axios
            .post("/schedule", exercise)
            .then((res) => {
                dispatch({ type: ADD_TO_SCHEDULE, payload: itemToSchedule });
                dispatch({ type: CLEAR_API_CALL });
            })
            .catch((err) => {
                console.error(err);
            });
    });
};

export const getScheduled = () => (dispatch) => {
    axios.get("/schedule").then((res) => {
        //const thisMorning = dayjs(dayjs(Date.now()).format("L")).valueOf();
    });
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
                axios.get(`/schedule`).then((res) => {
                    dispatch({ type: SET_SCHEDULE, payload: res.data });
                });
            })
            .catch((err) => {
                console.error(err);
            });
        dispatch({ type: CLEAR_API_CALL });
    };

export const markExerciseComplete = (scheduledItem, exercise) => (dispatch) => {
    dispatch({ type: SET_API_CALL });
    if (exercise.week) {
        scheduledItem.workouts[exercise.week][exercise.workoutIndex].exercises[
            exercise.exerciseIndex
        ].status = "complete";
    }
    axios
        .post("/schedule/update", scheduledItem)
        .then((res) => {
            axios.get(`/schedule`).then((res) => {
                dispatch({ type: SET_SCHEDULE, payload: res.data });
            });
        })
        .catch((err) => {
            console.error(err);
        });
    dispatch({ type: CLEAR_API_CALL });
};

//Store Actions
export const createStore = (userId) => (dispatch) => {
    dispatch({ type: SET_API_CALL });
    axios
        .post("/store", userId)
        .then((res) => {
            dispatch({ type: UPDATE_STORE_INFO, payload: res.data() });
        })
        .catch((err) => {
            console.error(err);
        });
    dispatch({ type: CLEAR_API_CALL });
};

export const getStoreData = (storeId) => (dispatch) => {
    dispatch({ type: SET_API_CALL });
    axios
        .post(`/store/${storeId}`)
        .then((res) => {
            dispatch({ type: SET_STORE, payload: res.data() });
        })
        .catch((err) => {
            console.error(err);
        });
    dispatch({ type: CLEAR_API_CALL });
};

export const updateStoreInfo = (storeId, data) => (dispatch) => {
    dispatch({ type: SET_API_CALL });
    axios.post(`/store/${storeId}/update`, data).then(() => {});
};

export const getDemoData = () => (dispatch) => {
    axios
        .get("/demo")
        .then((res) => {
            const data = {
                ...res.data.demoData,
                id: res.data.id,
            };
            console.log(data);
            dispatch({ type: SET_EXERCISES, payload: data.exercises });
            dispatch({ type: SET_WORKOUTS, payload: data.workouts });
            dispatch({ type: SET_PROGRAMS, payload: data.programs });
            dispatch({ type: SET_MEALS, payload: data.meals });
        })
        .catch((err) => console.error(err));
};
