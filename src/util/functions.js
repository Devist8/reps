import { useSelector, useDispatch } from "react-redux";
import firebase from "firebase/app";
import "firebase/storage";
import { SET_AUTHENTICATED } from "../redux/types";
import axios from "axios";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

export const getWorkoutCount = (program) => {
    let count = 0;
    Object.values(program.workouts).forEach((week) => {
        count += week.length;
    });
    return count;
};

export const generateDateRange = (itemToSchedule) => {
    const prefferedDays = ["0", "1", "3", "5"];
    const newDateRange = [];
    let dateRange = [...itemToSchedule.dateRange];
    let workoutCount = itemToSchedule.workoutCount
        ? itemToSchedule.workoutCount
        : getWorkoutCount(itemToSchedule);
    let currentDate = dateRange[0];

    while (workoutCount > 0) {
        if (prefferedDays.includes(dayjs(currentDate).format("d"))) {
            newDateRange.push(currentDate);
            workoutCount = workoutCount - 1;
            currentDate = currentDate + 86400000;
        } else {
            currentDate = currentDate + 86400000;
            console.log(currentDate);
        }
    }
    return newDateRange;
};

export const scheduleExercises = (workout) => {
    workout.exercises.map((exercise, index) => {
        exercise.date = workout.date;
    });
    console.log(workout);
    return workout;
};
