import React from "react";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({}));

export const ProgramForm = (props) => {
    const {} = props;
    const classes = useStyles();

    return (
        <Grid container>
            <Typography>Program Form</Typography>
        </Grid>
    );
};
