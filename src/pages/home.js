import React, { Component } from "react";
import axios from "axios";
import { exercise } from ".././util/TestData";
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
import { EditButton } from "../components/EditButton";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { ProgramModal } from "../components/Programs/ProgramModal";

const useStyles = makeStyles((theme) => ({
    backgroundColor: theme.palette.primary.main,
}));

export const Home = () => {
    const dispatch = useDispatch();
    const info = useSelector((state) => state.user.info);
    const exercises = useSelector((state) => state.data.exercises);
    const workouts = useSelector((state) => state.data.workouts);
    const programs = useSelector((state) => state.data.programs);
    const classes = useStyles();
    return (
        <Grid container style={{ width: "100%", marginLeft: "6rem" }}>
            <Grid container style={{ width: "100%", margin: "auto" }}>
                {exercises.map((exercise, index) => {
                    return (
                        <Grid item xs={5}>
                            <Exercise
                                exercise={exercise}
                                data-testid={`exercise-${index}`}
                                style={{}}
                                small
                            />
                        </Grid>
                    );
                })}
            </Grid>
            <Grid container style={{ width: "100%", margin: "auto" }}>
                {workouts.map((workout) => {
                    return (
                        <Grid item xs={5}>
                            <Workout workout={workout} style={{}} />
                        </Grid>
                    );
                })}
            </Grid>
            <Grid item xs={12}>
                {programs[0] && <ProgramModal program={programs[0]} />}
            </Grid>
        </Grid>
    );
};
