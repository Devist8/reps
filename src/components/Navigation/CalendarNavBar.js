import React from "react";
import Calendar from "react-calendar";
import "./Calendar.css";
import dayjs from "dayjs";
import { Link, useLocation, useRouteMatch } from "react-router-dom";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";

//Components
import { Exercise } from "../Exercises/Exercise";

//Redux
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {},
    calendarContainer: {
        margin: "auto",
        marginTop: "5rem",
        width: "90%",
        justifyContent: "center",
    },
    calendar: { width: "90%", marginLeft: "5%" },
    drawerPaper: {
        width: "300px",
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
        width: "80%",
    },
}));

export const DateHeader = (props) => {
    const { date } = props;
    const dayDate = dayjs(date).format("DD");
    const day = dayjs(date).format("ddd");

    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="h5" style={{ fontWeight: 700 }}>
                    {dayDate}
                </Typography>
                <Typography variant="h5">{day}</Typography>
            </Grid>
        </Grid>
    );
};

export const CalendarNavBar = () => {
    const classes = useStyles();
    const location = useLocation();
    const [selected, setSelected] = React.useState([new Date()]);
    const schedule = useSelector((state) => state.data.schedule);
    const [scheduledExercises, setScheduledExercises] = React.useState([]);

    React.useEffect(() => {
        const exercises = [];
        schedule.map((item) => {
            if (item.type === "program") {
                console.log("got a program");
                Object.values(item.workouts).map((week) => {
                    week.map((workout) => {
                        exercises.push(workout);
                    });
                });
            }

            if (item.type === "workout") {
                item.exercises.map((exercise) => {
                    exercises.push(exercise);
                });
            }

            if (item.type === "exercise") {
                exercises.push(item);
            }

            setScheduledExercises(exercises);
        });
    }, [schedule]);

    const handleDateClick = (value) => {
        let data = [...selected];
        selected.find(
            (x) =>
                dayjs(x).format("DD-MM-YYYY") ===
                dayjs(value).format("DD-MM-YYYY")
        )
            ? (data = selected
                  .slice(0, selected.indexOf(value))
                  .concat(selected.slice(selected.indexOf(value)) + 1))
            : data.push(value);
        setSelected(data);
    };
    return (
        <AppBar style={{ zIndex: "1000", border: "none" }}>
            <Drawer
                variant="permanent"
                anchor="right"
                className={classes.drawer}
                style={{ width: "300px", backgroundColor: "#e3f6ff" }}
                classes={{
                    paper: !location.pathname.includes("meals")
                        ? classes.drawerPaper
                        : classes.mealsDrawerPaper,
                    paperAnchorDockedRight: classes.rightDrawer,
                }}
            >
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
                            onClickDay={(value, event) =>
                                handleDateClick(value)
                            }
                            className={classes.calendar}
                        />
                    </Grid>
                    <Grid item xs={12} className={classes.dateDisplayContainer}>
                        {selected.map((date, index) => {
                            console.log(
                                dayjs(dayjs(date).format("L")).valueOf()
                            );
                            return (
                                <Grid
                                    item
                                    key={Math.round(
                                        index * Math.random() * index
                                    )}
                                    xs={12}
                                    className={classes.dateDisplay}
                                >
                                    <DateHeader date={date} />
                                    {scheduledExercises.map((exercise) => {
                                        if (
                                            dayjs(
                                                dayjs(date).format("L")
                                            ).valueOf() === exercise.date
                                        ) {
                                            return (
                                                <Exercise
                                                    exercise={exercise}
                                                    small
                                                />
                                            );
                                        }
                                    })}
                                </Grid>
                            );
                        })}
                    </Grid>
                </Grid>
            </Drawer>
        </AppBar>
    );
};
