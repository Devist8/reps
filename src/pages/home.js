import React from "react";
import dayjs from "dayjs";

//Mui
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

//Components
import { Scheduler } from "../components/Scheduler";
import { Timer } from "../components/Timer";
import { UserHeader } from "../components/Dashboard/UserHeader";
import { ExtraDetailsForm } from "../components/Navigation/ExtraDetailsForm";

//Redux
import { useSelector } from "react-redux";

export const Home = () => {
    const exercises = useSelector((state) => state.data.exercises);
    const schedule = useSelector((state) => state.data.schedule);
    const today = dayjs(dayjs(Date.now()).format("L")).valueOf();
    const [scheduledWorkouts, setScheduledWorkouts] = React.useState([]);
    const [completedWorkouts, setCompletedWorkouts] = React.useState([]);

    return (
        <Grid container style={{ display: "flex" }}>
            <Grid item xs={12}>
                <Timer exercise={exercises && exercises[0]} />
            </Grid>
            <Grid item xs={8}>
                <UserHeader />
            </Grid>
            <Grid container>
                <ExtraDetailsForm />
            </Grid>
        </Grid>
    );
};
