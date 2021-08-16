import axios from "axios";

import { generateDateRange, scheduleExercises } from "../../../util/functions";

import {
    SET_API_CALL,
    CLEAR_API_CALL,
    SET_SCHEDULE,
    ADD_TO_SCHEDULE,
} from "../reducers/types";

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

export const addToSchedule = (itemToSchedule) => (dispatch) => {
    const type = itemToSchedule.type;

    if (type === "workout") {
        itemToSchedule.exercises.map((exercise, index) => {
            return (exercise.date = itemToSchedule.date);
        });
    }
    if (type === "program") {
        let dateIndex = 0;
        itemToSchedule.dateRange = generateDateRange(itemToSchedule);

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
            dispatch({ type: ADD_TO_SCHEDULE, payload: itemToSchedule });
        })
        .catch((err) => {
            console.error(err);
        });
};
