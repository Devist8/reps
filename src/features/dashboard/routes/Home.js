import React from "react";
import dayjs from "dayjs";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box, Typography, Button } from "@material-ui/core";

//Components
import { UserHeader } from "../../components/Dashboard/UserHeader";
import { Workout } from "../../components/Workouts/Workout";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { getDemoData } from "../../redux/actions/dataActions";

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
    const dispatch = useDispatch();
    const workouts = useSelector((state) => state.data.workouts);
    const schedule = useSelector((state) => state.data.schedule);
    const today = dayjs(dayjs(Date.now()).format("L")).valueOf();
    const [demoLoaded, setDemoLoaded] = React.useState(false);
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

            <Grid
                item
                xs={12}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                    marginTop: "5vh",
                }}
            >
                {workouts.length < 5 ? (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            dispatch(getDemoData());
                            setDemoLoaded(true);
                        }}
                    >
                        Get Demo Data
                    </Button>
                ) : (
                    <Typography>
                        Demo data has been loaded. Please vist the workout
                        studio indicated by the dumbbell in the navbar on the
                        left.
                    </Typography>
                )}
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
