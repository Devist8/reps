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
} from "@material-ui/core";

//Components
import { Difficulty } from "../Difficulty";
import { ActionButton } from "../ActionButton";

const useStyles = makeStyles((theme) => ({
    cardRoot: {
        width: "23rem",
        height: "5rem",
    },
    cardContent: {
        paddingBottom: "30px",
        height: "4.6rem",
    },
    title: {
        maxWidth: "80%",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "noWrap",
    },
}));

export const Exercise = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const { exercise, small, edit, index, addExercise } = props;
    return (
        <div data-testid="exercise-test">
            <Card
                className={classes.cardRoot}
                style={
                    small && {
                        width: "15rem",
                        height: "4.6rem",
                        borderRadius: "18px",
                        backgroundColor: theme.palette.secondary.light,
                    }
                }
            >
                <Grid container>
                    <Grid item xs={9} className={classes.cardContent}>
                        <CardContent
                            style={
                                small
                                    ? { paddingTop: "10px" }
                                    : { paddingTop: "10px", display: "flex" }
                            }
                        >
                            <Grid item xs={7}>
                                {!edit ? (
                                    <Typography className={classes.title}>
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

                            {!small && (
                                <Grid
                                    item
                                    xs={4}
                                    style={{
                                        marginTop: "1rem",
                                        marginLeft: "1rem",
                                    }}
                                >
                                    {edit ? (
                                        <Typography>
                                            {exercise.schedule[index].reps}
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
                                        />
                                    )}
                                </Grid>
                            )}
                        </CardContent>
                    </Grid>
                    <Grid
                        item
                        xs={2}
                        style={
                            small
                                ? { marginLeft: "0" }
                                : { marginLeft: "0.9rem" }
                        }
                    >
                        <CardActions>
                            <ActionButton
                                edit={edit}
                                exercise={exercise}
                                addHandler={addExercise && addExercise}
                            />
                        </CardActions>
                    </Grid>
                </Grid>
            </Card>
        </div>
    );
};
