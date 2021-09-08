import React from "react";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import {
    Grid,
    Typography,
    Avatar,
    TextField,
    Button,
    ButtonGroup,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({}));

export const Account = (props) => {
    const {} = props;
    const classes = useStyles();

    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="h1">Subscription Info</Typography>
            </Grid>
        </Grid>
    );
};
