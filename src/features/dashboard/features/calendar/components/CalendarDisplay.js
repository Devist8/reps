import React from "react";
import Calendar from "react-calendar";
import "./Calendar.css";
import dayjs from "dayjs";
import { useLocation } from "react-router-dom";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box, Typography } from "@material-ui/core";

//Components
import { Exercise } from "../../../components/Exercise";
import { Workout } from "../../../components/Workout";
import { DateHeader } from "./DateHeader";

//Redux
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {},
    calendarContainer: {
        margin: "auto",
        marginTop: "10vh",
        width: "90%",
        justifyContent: "center",
    },
    chatContainer: {
        marginTop: "10vh",
    },
    calendar: { width: "90%", marginLeft: "5%" },
    drawerPaper: {
        width: "300px",
        backgroundColor: "#e3f6ff",
    },
    bottomNavigation: {
        backgroundColor: "#e3f6ff",
    },
    mealsDrawerPaper: {
        width: "300px",
        backgroundColor: "#e6ffe9",
    },
    selectedTile: {
        backgroundColor: theme.palette.primary.main,
        borderRadius: "30px",
        padding: 0,
    },
    workoutTitle: {
        color: theme.palette.primary.main,
    },
    mealsSelectedTile: {
        backgroundColor: theme.palette.meals.dark,
        borderRadius: "30px",
        padding: 0,
    },
    tile: {
        padding: 0,
    },
    rightDrawer: {
        borderLeft: "none",
    },
    dateDisplayContainer: {
        marginTop: "1rem",
        marginLeft: "0.8vw",
        width: "100%",
    },
    buttons: {
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
    },
}));

export const CalendarDisplay = (props) => {
    const classes = useStyles();
    const location = useLocation();
    const [selected, setSelected] = React.useState([
        dayjs(new Date()).format("l"),
    ]);
    const schedule = useSelector((state) => state.data.schedule);
    const workouts = useSelector((state) => state.studio.workouts);
    const [scheduledExercises, setScheduledExercises] = React.useState([]);
    const [scheduledWorkouts, setScheduledWorkouts] = React.useState([]);

    React.useEffect(() => {
        const exercises = [];
        schedule.map((item) => {
            if (item.type === "program") {
                Object.values(item.workouts).map((week) => {
                    return week.map((workout) => {
                        return workout.exercises.map((exercise) => {
                            exercise.workout = workout.title;
                            exercise.status !== "canceled" &&
                                exercises.push(exercise);
                        });
                    });
                });
            }

            if (item.type === "workout") {
                item.exercises.map((exercise) => {
                    exercise.workout = item.title;
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
                                    return (
                                        <Box
                                            key={exercise.id}
                                            style={{ margin: "1vh 0" }}
                                        >
                                            {exercise.program ? (
                                                <Typography
                                                    variant="overline"
                                                    className={
                                                        classes.workoutTitle
                                                    }
                                                >
                                                    {`Program: ${exercise.program}`}
                                                </Typography>
                                            ) : (
                                                exercise.workout && (
                                                    <Typography
                                                        variant="overline"
                                                        className={
                                                            classes.workoutTitle
                                                        }
                                                    >
                                                        {`Workout: ${exercise.workout}`}
                                                    </Typography>
                                                )
                                            )}
                                            {}
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
