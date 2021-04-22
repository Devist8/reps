import React, { Component } from "react";
import axios from "axios";

import met from "../util/met";

//Mui
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

//Components
import { Difficulty } from "../components/Difficulty";
import { Exercise } from "../components/Exercises/Exercise";
import { Workout } from "../components/Workouts/Workout";
import { UserButton } from "../components/Navigation/UserButton";

//Redux
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    backgroundColor: theme.palette.primary.main,
}));

export const Home = () => {
    const dispatch = useDispatch();
    const info = useSelector((state) => state.user.info);
    const exercises = useSelector((state) => state.data.exercises);
    const workouts = useSelector((state) => state.data.workouts);
    const classes = useStyles();
    return (
        <Grid container style={{ marginLeft: "6rem" }}>
            <Grid container style={{ margin: "auto" }}>
                {workouts.map((workout) => {
                    return (
                        <Grid item xs={5}>
                            <Workout workout={workout} style={{}} />
                        </Grid>
                    );
                })}
            </Grid>
        </Grid>
    );
};
