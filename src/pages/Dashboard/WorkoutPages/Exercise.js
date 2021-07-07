import React from "react";
import ReactPlayer from "react-player";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Box } from "@material-ui/core";

//Components
import { BubbleArray } from "../../../components/BubbleArray";
import { Difficulty } from "../../../components/Difficulty";
import { Workout } from "../../../components/Workouts/Workout";
import { ProgramCard } from "../../../components/Programs/ProgramCard";
import { Carousel } from "../../../components/Carousel";

//Redux
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    header: {
        backgroundColor: theme.palette.primaryDark.main,
        padding: "30px",
        flexWrap: "wrap",
    },
    body: { padding: "30px" },
    featuredIn: {},
}));

export const Exercise = (props) => {
    const {} = props;
    const classes = useStyles();
    const exerciseId = props.match.params.exerciseId;
    const exercises = useSelector((state) =>
        state.data.exercises.filter((x) => x.id === exerciseId)
    );
    const featuredWorkouts = useSelector((state) =>
        state.data.workouts.filter((workout) =>
            workout.exercises.find((exercise) => exercise.id === exerciseId)
        )
    );

    const featuredPrograms = useSelector((state) =>
        state.data.programs.filter((program) =>
            Object.values(program.workouts).map((week) => {
                week.map((workout) =>
                    workout.exercises.find(
                        (exercise) => exercise.id === exerciseId
                    )
                );
            })
        )
    );

    const exercise = exercises.length > 0 && exercises[0];
    console.log(exercise);
    console.log(featuredWorkouts);
    return (
        <Grid container className={classes.root}>
            <Grid container className={classes.header}>
                <Grid item xs={5}>
                    <Grid
                        item
                        xs={12}
                        style={{ display: "flex", margin: "0 0 2vh 0" }}
                    >
                        <Typography variant="h4">{exercise.title}</Typography>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        style={{ display: "flex", margin: "2vh 0" }}
                    >
                        <ReactPlayer
                            url={exercise.videoURL}
                            width="25vw"
                            height="20vh"
                            loop="true"
                            controls
                        />
                    </Grid>
                </Grid>
                <Grid
                    item
                    xs={4}
                    alignItems="center"
                    justify="center"
                    alignContent="center"
                >
                    <Grid item xs={12}>
                        <Typography variant="h6">Difficulty</Typography>
                        <Difficulty
                            difficulty={exercise && exercises[0].difficulty}
                        />
                        <Typography variant="h6">Muscles targeted</Typography>
                        {exercise.muscles ? (
                            <BubbleArray
                                array={exercise.muscles}
                                itemType={"muscles"}
                            />
                        ) : (
                            <Typography>Loading...</Typography>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">Equipment needed</Typography>
                        {exercise.equipment ? (
                            exercise.equipment.length > 0 ? (
                                <BubbleArray
                                    array={exercise.equipment}
                                    itemType={"equipment"}
                                />
                            ) : (
                                <Typography>No equipment</Typography>
                            )
                        ) : (
                            <Typography>No equipment</Typography>
                        )}
                    </Grid>
                </Grid>
            </Grid>
            <Grid container className={classes.body}>
                <Grid item xs={12} className={classes.featuredIn}>
                    <Typography variant="h5" style={{ marginBottom: "2vh" }}>
                        Featured in:
                    </Typography>
                    <Grid
                        item
                        xs={12}
                        style={{ display: "flex", flexWrap: "nowrap" }}
                    >
                        <Grid item xs={6}>
                            <Carousel
                                size={1}
                                array={featuredPrograms}
                                component={ProgramCard}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            {featuredWorkouts.map((workout) => {
                                return (
                                    <Box style={{ marginBottom: "2vh" }}>
                                        <Workout workout={workout} />
                                    </Box>
                                );
                            })}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};
