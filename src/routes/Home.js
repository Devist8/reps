import React from "react";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import dayjs from "dayjs";

//Mui
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Modal from "@material-ui/core/Modal";

//Components
import { Timer } from "../features/dashboard/components/Timer";
import { Countdown } from "../features/dashboard/components/Countdown";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { getDemoData } from "../redux/actions/dataActions";

export const Home = () => {
    const dispatch = useDispatch();
    const exercises = useSelector((state) => state.studio.exercises);
    const workouts = useSelector((state) => state.studio.workouts);
    const schedule = useSelector((state) => state.studio.schedule);
    const today = dayjs(dayjs(Date.now()).format("L")).valueOf();
    const user = useSelector((state) => state.user.authenticated);
    const [demoLoaded, setDemoLoaded] = React.useState(false);
    const [scheduledWorkouts, setScheduledWorkouts] = React.useState([]);
    const [completedWorkouts, setCompletedWorkouts] = React.useState([]);
    const [modalOpen, setModalOpen] = React.useState(true);

    const toggleOpen = () => {
        setModalOpen(!modalOpen);
    };
    return (
        <Grid container style={{ display: "flex" }}>
            <Button component={Link} to="/checkout">
                Checkout
            </Button>
        </Grid>
    );
};

/*<Modal
open={modalOpen}
style={{ backgroundColor: "rgba(0, 0, 0, 1)" }}
children={
    <Grid
        item
        xs={12}
        style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            height: "100%",
        }}
    >
        <Button component={Link} to="/checkout">
            Checkout
        </Button>
        <Countdown
            time={30}
            workout={exercises}
            open={modalOpen}
            setOpen={setModalOpen}
        />
    </Grid>
}
/>*/
