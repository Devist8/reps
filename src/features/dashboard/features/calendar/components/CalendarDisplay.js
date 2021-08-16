import React from "react";
import Calendar from "react-calendar";
import "./Calendar.css";
import dayjs from "dayjs";
import { useLocation } from "react-router-dom";

//MUI
import { Grid, Box } from "@material-ui/core";

//Components
import { Exercise } from "../Exercises/Exercise";

//Redux
import { useSelector } from "react-redux";

export const CalendarDisplay = (props) => {
    const classes = useStyles();
    const location = useLocation();
    const [selected, setSelected] = React.useState([
        dayjs(new Date()).format("l"),
    ]);
    const schedule = useSelector((state) => state.data.schedule);
    const [scheduledExercises, setScheduledExercises] = React.useState([]);

    React.useEffect(() => {
        const exercises = [];
        schedule.map((item) => {
            if (item.type === "program") {
                Object.values(item.workouts).map((week) => {
                    return week.map((workout) => {
                        return workout.exercises.map((exercise) => {
                            exercise.status !== "canceled" &&
                                exercises.push(exercise);
                        });
                    });
                });
            }

            if (item.type === "workout") {
                item.exercises.map((exercise) => {
                    return exercises.push(exercise);
                });
            }

            if (item.type === "exercise") {
                exercises.push(item);
            }

            return setScheduledExercises(exercises);
        });
    }, [schedule]);

    const handleDateClick = (value) => {
        let data = [...selected];
        const formattedValue = dayjs(value).format("l");

        const index = selected.indexOf(value);

        data.includes(formattedValue)
            ? (data = data.filter((x) => x !== formattedValue))
            : data.push(dayjs(value).format("l"));
        const dataSet = [
            ...new Set(
                data.sort((a, b) => {
                    if (dayjs(a).valueOf() < dayjs(b).valueOf()) {
                        return -1;
                    }

                    if (dayjs(a).valueOf() > dayjs(b).valueOf()) {
                        return 1;
                    }
                    return 0;
                })
            ),
        ];

        setSelected(dataSet);
    };
    return (
        <Grid item xs={12} className={classes.calendarContainer}>
            <Grid item xs={12} className={classes.calendar}>
                <Calendar
                    tileClassName={({ date, view }) => {
                        if (
                            selected.find(
                                (x) =>
                                    dayjs(x).format("DD-MM-YYYY") ===
                                    dayjs(date).format("DD-MM-YYYY")
                            )
                        ) {
                            return !location.pathname.includes("meals")
                                ? classes.selectedTile
                                : classes.mealsSelectedTile;
                        } else {
                            return classes.tile;
                        }
                    }}
                    formatShortWeekday={(locale, date) =>
                        dayjs(date).format("dd")
                    }
                    prev2Label={null}
                    next2Label={null}
                    onClickDay={(value, event) => handleDateClick(value)}
                    className={classes.calendar}
                />
            </Grid>
            <Grid item xs={12} className={classes.dateDisplayContainer}>
                {selected.map((date, index) => {
                    return (
                        <Grid
                            item
                            key={date}
                            xs={12}
                            className={classes.dateDisplay}
                        >
                            <DateHeader date={date} />
                            {scheduledExercises.map((exercise) => {
                                if (
                                    dayjs(dayjs(date).format("L")).valueOf() ===
                                    exercise.date
                                ) {
                                    console.log(exercise);
                                    return (
                                        <Box
                                            key={exercise.id}
                                            style={{ margin: "1vh 0" }}
                                        >
                                            <Exercise
                                                exercise={exercise}
                                                small
                                                key={exercise.id}
                                            />
                                        </Box>
                                    );
                                }
                            })}
                        </Grid>
                    );
                })}
            </Grid>
        </Grid>
    );
};
