import axios from "axios";

import { generateDateRange, scheduleExercises } from "../../../util/functions";

import { SET_SCHEDULE, ADD_TO_SCHEDULE } from "../reducers/types";

export const updateScheduledExerciseStatus =
    (scheduledItem, exercise, status) => (dispatch) => {
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
    };

export const addToSchedule = (itemToSchedule) => (dispatch) => {
    const type = itemToSchedule.type;
    const exercises = [];
    if (type === "workout") {
        itemToSchedule.exercises.map((exercise, index) => {
            exercise.date = itemToSchedule.date;
            exercise.workout = itemToSchedule.title;
            exercises.push(exercise);
        });
    }
    if (type === "program") {
        let dateIndex = 0;
        itemToSchedule.dateRange = generateDateRange(itemToSchedule);

        Object.values(itemToSchedule.workouts).map((week) => {
            week.sort();
            return week.map((workout, i) => {
                workout.date = itemToSchedule.dateRange[i];
                console.log(workout);
                const workouts = scheduleExercises(workout);
                workouts.exercises.forEach((exercise) => {
                    exercise.workout = workout.title;
                    exercise.program = itemToSchedule.title;
                    exercises.push(exercise);
                });
            });
        });
    }
    exercises.forEach((exercise) => {
        axios
            .post("/schedule", exercise)
            .then((res) => {
                dispatch({ type: ADD_TO_SCHEDULE, payload: itemToSchedule });
            })
            .catch((err) => {
                console.error(err);
            });
    });
};
