import React, { Component } from "react";
import axios from "axios";
import { exercise } from ".././util/TestData";
import met from "../util/met";

//Mui
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList";

//Components
import { ProgramCarousel } from "../components/Programs/ProgramCarousel";
import { MealCardList } from "../components/Meals/MealCardList";
import { MealForm } from "../components/Meals/MealForm";
import { Scheduler } from "../components/Scheduler";

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
    const meals = useSelector((state) => state.data.meals);
    const classes = useStyles();

    return (
        <Grid container style={{ display: "flex" }}>
            <Grid item xs={12}>
                <Scheduler />
            </Grid>
        </Grid>
    );
};
