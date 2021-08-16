import React from "react";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import dayjs from "dayjs";

//Mui
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
//Components
import { StoreItemDisplay } from "../components/Store/StoreItemDisplay";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { getDemoData } from "../redux/actions/dataActions";

export const Home = () => {
    const dispatch = useDispatch();
    const exercises = useSelector((state) => state.data.exercises);
    const workouts = useSelector((state) => state.data.workouts);
    const schedule = useSelector((state) => state.data.schedule);
    const today = dayjs(dayjs(Date.now()).format("L")).valueOf();
    const user = useSelector((state) => state.user.authenticated);
    const [demoLoaded, setDemoLoaded] = React.useState(false);
    const [scheduledWorkouts, setScheduledWorkouts] = React.useState([]);
    const [completedWorkouts, setCompletedWorkouts] = React.useState([]);

    return (
        <Grid container style={{ display: "flex" }}>
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
                {user ? (
                    !demoLoaded ? (
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
                            studio indicated by the dumbbell in the navbar on
                            the left.
                        </Typography>
                    )
                ) : (
                    <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to="/signup"
                    >
                        Sign Up
                    </Button>
                )}
            </Grid>
        </Grid>
    );
};
