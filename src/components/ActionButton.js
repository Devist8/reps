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
                <Grid item xs={12}>
                    <Typography>30min</Typography>
                </Grid>
            )}
            <Grid item xs={12} style={{ marginLeft: "0.5rem" }}>
                <Typography>30min</Typography>
            </Grid>
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
