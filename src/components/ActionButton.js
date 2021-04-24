import React from "react";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import { Grid, IconButton, Typography, TextField } from "@material-ui/core";

//MUI Icons
import AddIcon from "@material-ui/icons/Add";

export const ActionButton = (props) => {
    const {
        clickHandler,
        changeHandler,
        edit,
        add,
        duration,
        newExercise,
        editHandler,
    } = props;
    return (
        <Grid container>
            {edit ? (
                <Grid item xs={12} style={{ marginLeft: "0.5rem" }}>
                    <TextField
                        name="duration"
                        value={duration}
                        onChange={(e) => changeHandler(e)}
                    />
                </Grid>
            ) : (
                <Grid item xs={12} style={{ marginLeft: "0.5rem" }}>
                    {duration && <Typography>30min</Typography>}
                </Grid>
            )}

            <Grid item style={!duration && { marginTop: "0.5rem" }}>
                <IconButton
                    onClick={(e) => clickHandler(e)}
                    style={
                        !duration && {
                            marginLeft: "0.5rem",
                            height: "70%",
                            width: "70%",
                        }
                    }
                >
                    <AddIcon
                        style={{
                            color: "black",
                        }}
                    />
                </IconButton>
            </Grid>
        </Grid>
    );
};
