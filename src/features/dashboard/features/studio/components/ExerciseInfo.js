import React from "react";
import ReactPlayer from "react-player";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

//Components
import { BubbleArray } from "../BubbleArray";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "30vw",
        backgroundColor: theme.palette.secondary.light,
        borderRadius: "8px",
        padding: "15px",
    },
}));

export const ExerciseInfo = (props) => {
    const { exercise } = props;
    const classes = useStyles();

    return (
        <Grid container className={classes.root}>
            <Grid
                item
                xs={12}
                style={{
                    display: "flex",
                    textAlign: "center",
                    justifyContent: "center",
                }}
            >
                <Typography variant="h4">{exercise.title}</Typography>
            </Grid>
            <Grid
                item
                xs={12}
                style={{
                    display: "flex",
                    textAlign: "center",
                    justifyContent: "center",
                }}
            >
                <ReactPlayer
                    url={exercise.videoURL}
                    width="320px"
                    height="180px"
                    loop="true"
                    controls
                />
            </Grid>
            <Grid
                item
                xs={12}
                style={{
                    display: "flex",
                    textAlign: "center",
                    flexWrap: "wrap",
                    justifyContent: "center",
                }}
            >
                <Typography style={{ marginLeft: "1vw" }}>Equipment</Typography>
                <BubbleArray
                    array={
                        exercise.equipment.length > 0
                            ? exercise.equipment
                            : ["No equipment"]
                    }
                    itemType={"equipment"}
                />
            </Grid>
            <Grid
                item
                xs={12}
                style={{
                    display: "flex",
                    textAlign: "center",
                    flexWrap: "wrap",
                    justifyContent: "center",
                }}
            >
                <Typography style={{ marginLeft: "1vw" }}>Muscles</Typography>
                <BubbleArray array={exercise.muscles} itemType={"muscles"} />
            </Grid>
        </Grid>
    );
};
