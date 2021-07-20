import React from "react";
import dayjs from "dayjs";

//Mui
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
//Components
import { StoreItemDisplay } from "../components/Store/StoreItemDisplay";

//Redux
import { useSelector } from "react-redux";

export const Home = () => {
    const exercises = useSelector((state) => state.data.exercises);
    const workouts = useSelector((state) => state.data.workouts);
    const schedule = useSelector((state) => state.data.schedule);
    const today = dayjs(dayjs(Date.now()).format("L")).valueOf();
    const users = useSelector((state) => state.user.info.users);
    const [scheduledWorkouts, setScheduledWorkouts] = React.useState([]);
    const [completedWorkouts, setCompletedWorkouts] = React.useState([]);

    return (
        <Grid container style={{ display: "flex" }}>
            <Grid item xs={12}>
                {/*workouts.map((workout) => {
                    return (
                        <StoreItemDisplay
                            image={workout.imageURL}
                            title={workout.title}
                        />
                    );
                })*/}
            </Grid>
        </Grid>
    );
};
