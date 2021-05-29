import React from "react";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import { Grid, IconButton, Typography, TextField } from "@material-ui/core";

//MUI Icons
import AddIcon from "@material-ui/icons/Add";

export const ActionButton = (props) => {
    const { addHandler, edit, duration, exercise, handleChange } = props;
    return (
        <Grid container>
            {edit ? (
                <Grid item xs={12} style={{ marginLeft: "0.5rem" }}>
                    <TextField
                        name="duration"
                        value={duration}
                        onChange={(e) => handleChange(e)}
                    />
                </Grid>
            ) : (
                <Grid item xs={12} style={{ marginLeft: "0.5rem" }}>
                    {duration && <Typography>30min</Typography>}
                </Grid>
            )}

            <Grid item style={!duration && { marginTop: "2.5vh" }}>
                <IconButton
                    onClick={(e) => {
                        addHandler(exercise);
                    }}
                    style={
                        !duration && {
                            marginLeft: "0.5rem",
                            height: "2vh",
                            width: "2vw",
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
