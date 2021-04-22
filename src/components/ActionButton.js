import React from "react";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
//MUI Icons
import AddIcon from "@material-ui/icons/Add";

export const ActionButton = (props) => {
    const { clickHandler, edit, add, duration, editHandler } = props;
    return (
        <Grid container>
            {duration && (
                <Grid item>
                    <Typography>{duration}</Typography>
                </Grid>
            )}
            <Grid item>
                <IconButton onClick={(e) => clickHandler(e)}>
                    <AddIcon style={{ color: "black" }} />
                </IconButton>
            </Grid>
        </Grid>
    );
};
