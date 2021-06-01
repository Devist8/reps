import React, { Component } from "react";

//MUI
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
    Grid,
    Card,
    CardContent,
    CardActions,
    Typography,
    TextField,
    IconButton,
} from "@material-ui/core";
import ScheduleIcon from "@material-ui/icons/Schedule";

//Components
import { Difficulty } from "../Difficulty";
import { ActionButton } from "../ActionButton";

const useStyles = makeStyles((theme) => ({
    cardRoot: {
        display: "flex",
        maxWidth: "300px",
        maxHeight: "20vh",
    },
    cardContent: {
        paddingBottom: "30px",
        height: "4.6rem",
        display: "flex",
        flexWrap: "wrap",
    },
    title: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "noWrap",
    },
}));

export const Exercise = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const { exercise, small, edit, index, addExercise, noButton, schedule } =
        props;
    return (
        <Card
            className={classes.cardRoot}
            style={
                small && {
                    minWidth: "200px",
                    maxWidth: "15rem",
                    maxHeight: "4.6rem",
                    borderRadius: "18px",
                }
            }
        >
            <Grid container style={{ display: "flex" }}>
                <Grid item xs={9} className={classes.cardContent}>
                    <CardContent
                        style={{
                            paddingTop: "10px",
                            display: "flex",
                            flexWrap: "wrap",
                        }}
                    >
                        <Grid item xs={7}>
                            {!edit ? (
                                <Typography
                                    className={classes.title}
                                    style={{ minWidth: "100px" }}
                                >
                                    {exercise.title}
                                </Typography>
                            ) : (
                                <TextField
                                    aria-label={exercise.title}
                                    aria-required="true"
                                    id="title"
                                    name="title"
                                    value={exercise.title}
                                />
                            )}
                            <Difficulty
                                difficulty={exercise.difficulty}
                                small
                                edit={edit}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            {!edit ? (
                                exercise.reps ? (
                                    <Typography
                                        style={{
                                            marginBottom: "1rem",
                                            marginLeft: "0.5rem",
                                            width: "125px",
                                        }}
                                    >
                                        3 x 5
                                    </Typography>
                                ) : (
                                    <TextField
                                        name="reps"
                                        id={
                                            index &&
                                            `reps: ${exercise.schedule[index].reps}`
                                        }
                                        aria-label={
                                            index &&
                                            exercise.schedule[index].reps
                                        }
                                        value={
                                            index &&
                                            exercise.schedule[index].reps
                                        }
                                        label="Reps"
                                        style={{ marginBottom: "5rem" }}
                                    />
                                )
                            ) : (
                                <TextField
                                    name="reps"
                                    id={
                                        index &&
                                        `reps: ${exercise.schedule[index].reps}`
                                    }
                                    aria-label={
                                        index && exercise.schedule[index].reps
                                    }
                                    value={
                                        index && exercise.schedule[index].reps
                                    }
                                    label="Reps"
                                    style={{ marginBottom: "5rem" }}
                                />
                            )}
                        </Grid>
                    </CardContent>
                </Grid>
                {!noButton && (
                    <Grid
                        item
                        xs={2}
                        style={
                            ({
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            },
                            small
                                ? { marginLeft: "0" }
                                : { marginLeft: "0.9rem" })
                        }
                    >
                        <CardActions>
                            {schedule ? (
                                <IconButton>
                                    <ScheduleIcon />
                                </IconButton>
                            ) : (
                                <ActionButton
                                    edit={edit}
                                    exercise={exercise}
                                    addHandler={addExercise && addExercise}
                                />
                            )}
                        </CardActions>
                    </Grid>
                )}
            </Grid>
        </Card>
    );
};
