import React from "react";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({}));

export const WorkoutForm = (props) => {
    const {} = props;
    const classes = useStyles();

    return (
        <Grid container>
            <Typography>Workout Form</Typography>
        </Grid>
    );
};
