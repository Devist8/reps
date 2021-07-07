import React from "react";
import dayjs from "dayjs";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box, Typography } from "@material-ui/core";

//Components
import { UserHeader } from "../../components/Dashboard/UserHeader";
import { Workout } from "../../components/Workouts/Workout";

//Redux
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    headerContainer: {
        marginTop: "2vh",
        marginLeft: "4vw",
    },
    todayWorkouts: {
        marginTop: "3vh",
        marginLeft: "2vw",
    },
}));

export const Home = (props) => {
    const {} = props;
    const classes = useStyles();
    const schedule = useSelector((state) => state.data.schedule);
    const today = dayjs(dayjs(Date.now()).format("L")).valueOf();
    const [scheduledWorkouts, setScheduledWorkouts] = React.useState([]);
    const [completedWorkouts, setCompletedWorkouts] = React.useState([]);

    React.useEffect(() => {
        const workouts = [];
        const complete = [];

        schedule.map((item) => {
            if (item.type === "program") {
                Object.values(item.workouts).map((week) => {
                    return week.map((workout) => {
                        today === workout.date && workouts.push(workout);
                        (today === workout.date) &
                            (workout.status === "complete") &&
                            complete.push(workout);
                    });
                });
            }

            if (item.type === "workouts") {
                workouts.push(item);
                item.status === "complete" && complete.push(item);
            }
            setScheduledWorkouts(workouts);
            setCompletedWorkouts(complete);
        });
    }, [schedule]);

    return (
        <Grid container>
            <Grid item xs={8} className={classes.headerContainer}>
                <UserHeader />
            </Grid>
            <Grid container className={classes.todayWorkouts}>
                <Grid item xs={12} style={{ marginBottom: "1vh" }}>
                    <Typography variant="h4">Todays Workouts</Typography>
                </Grid>
                <Grid item xs={12}>
                    {scheduledWorkouts.map((workout) => {
                        return (
                            <Box>
                                <Workout workout={workout} />
                            </Box>
                        );
                    })}
                </Grid>
            </Grid>
        </Grid>
    );
};
