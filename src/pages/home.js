import React, { Component } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import met from "../util/met";
import defaultExercises from "../util/DefaultTasks";
import { Difficulty } from "../components/Difficulty";
//Mui
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

//Redux
import { useDispatch, useSelector } from "react-redux";

export const Home = () => {
    const dispatch = useDispatch();

    return (
        <Grid container>
            <Grid item xs={2}>
                <Difficulty difficulty={4.5} small edit />
            </Grid>
        </Grid>
    );
};
