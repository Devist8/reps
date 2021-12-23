import React from "react";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import {
    Grid,
    Typography,
    TextField,
    Button,
    LinearProgress,
} from "@material-ui/core";

//Components
import { Exercise } from "../../../components/Exercise";
import { Workout } from "../../../components/Workout";
import { BubbleArray } from "../../../components/BubbleArray";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { updateNewWorkout, submitWorkout } from "../actions";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "white",
        padding: "0",
        display: "flex",
        flexDirection: "row",
        width: "80%",
        marginTop: "5vh",
        boxShadow: "0px 3px 5px 0px rgba(0,0,0,0.25)",
    },

    displayContainer: {
        padding: "2.5rem",
    },
    formFields: {
        boxShadow: "-3px 0px 5px 0px rgba(0,0,0,0.14)",
    },
    workoutContainer: {
        backgroundColor: theme.palette.secondary.light,
    },
    submit: {
        display: "flex",
        flexWrap: "wrap",
        textAlign: "center",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
    },
}));

export const WorkoutForm = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [preview, setPreview] = React.useState(null);
    const [errors, setErrors] = React.useState({});
    const progress = useSelector((state) => state.ui.progress);
    const file = useSelector((state) => state.data.file);
    const exercises = useSelector((state) => state.studio.exercises);
    const newWorkout = useSelector((state) => state.studio.newWorkout);
    const handleChange = (e) => {
        const data = {
            name: e.target.name,
            value: e.target.value,
        };
        dispatch(updateNewWorkout(data));
    };

    const addExercise = (exercise) => {
        const data = {
            name: "exercises",
            value: newWorkout.exercises.concat(exercise),
        };
        if (exercise.reps) {
            dispatch(updateNewWorkout(data));
            data.name = "exerciseCount";
            data.value = newWorkout.exerciseCount + 1;
            dispatch(updateNewWorkout(data));
            const newMuscles = exercise.muscles.filter(
                (muscle) => !newWorkout.muscles.includes(muscle)
            );
            data.name = "muscles";
            data.value = [...newWorkout.muscles, ...newMuscles];
            dispatch(updateNewWorkout(data));
            const newEquipment = exercise.equipment.filter(
                (item) => !newWorkout.equipment.includes(item)
            );
            data.name = "equipment";
            data.value = [...newWorkout.equipment, ...newEquipment];
            dispatch(updateNewWorkout(data));
        } else {
            setErrors({ reps: "Please set reps before adding exercise" });
        }
    };

    const submit = () => {
        dispatch(submitWorkout(newWorkout, file));
        setPreview(null);
    };

    return (
        <Grid container className={classes.root}>
            <Grid
                container
                style={{ boxShadow: "0px 3px 5px 0px rgba(0,0,0,0.25)" }}
            >
                <Grid
                    item
                    xs={6}
                    className={classes.workoutContainer}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexWrap: "wrap",
                    }}
                >
                    <Grid
                        item
                        xs={10}
                        style={{
                            boxShadow: "0px 3px 5px 0px rgba(0,0,0,0.25)",
                            maxWidth: "450px",
                        }}
                    >
                        <Workout
                            workout={newWorkout}
                            edit
                            handleChange={handleChange}
                            preview={preview}
                            noButton
                            setPreview={setPreview}
                        />
                    </Grid>
                </Grid>

                <Grid item xs={6} className={classes.formFields}>
                    <Grid item xs={12} style={{ padding: "8px" }}>
                        <TextField
                            name="description"
                            value={newWorkout.description}
                            className={classes.formField}
                            fullWidth
                            multiline
                            label="Description"
                            style={{ width: "80%", padding: "8px" }}
                            onChange={(e) => handleChange(e)}
                        />
                    </Grid>
                    <Grid item xs={12} style={{ padding: "8px" }}>
                        <Typography
                            variant="h5"
                            style={{ fontSize: "1.3rem" }}
                        >{`Exercise Count: ${newWorkout.exerciseCount}`}</Typography>
                    </Grid>
                    <Grid item xs={12} style={{ padding: "8px" }}>
                        <Typography variant="h5" style={{ fontSize: "1.3rem" }}>
                            Muscles targeted:
                        </Typography>

                        {newWorkout.muscles.length > 0 ? (
                            <BubbleArray
                                array={newWorkout.muscles}
                                color="secondary"
                            />
                        ) : (
                            <Typography>None</Typography>
                        )}
                    </Grid>
                    <Grid item xs={12} style={{ padding: "8px" }}>
                        <Typography variant="h5" style={{ fontSize: "1.3rem" }}>
                            Equipment needed:
                        </Typography>

                        {newWorkout.equipment.length > 0 ? (
                            <BubbleArray
                                array={newWorkout.equipment}
                                color="secondary"
                            />
                        ) : (
                            <Typography>None</Typography>
                        )}
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            alignContent: "center",
                            width: "50%",
                            margin: "auto",
                        }}
                    >
                        <Typography
                            variant="h5"
                            style={{ fontSize: "2rem", fontWeight: "700" }}
                        >
                            Add Exercises
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        style={{
                            maxHeight: "300px",
                            overflowY: "scroll",
                            padding: "1rem",
                            textAlign: "center",
                            justifyContent: "flex-start",
                        }}
                    >
                        {errors.reps && (
                            <Typography style={{ color: "red" }}>
                                {errors.reps}
                            </Typography>
                        )}
                        {exercises.map((exercise) => {
                            return (
                                <Grid
                                    item
                                    style={{
                                        marginLeft: "15%",
                                        marginBottom: "1vh",
                                    }}
                                >
                                    <Exercise
                                        exercise={exercise}
                                        addExercise={addExercise}
                                        addToWorkout
                                    />
                                </Grid>
                            );
                        })}
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12} className={classes.submit}>
                <Grid item xs={12}>
                    <LinearProgress
                        style={{
                            backgroundColor: "black",
                        }}
                        variant="determinate"
                        size={40}
                        value={progress}
                        color="secondary"
                    />
                </Grid>
                <Button
                    color="secondary"
                    variant="contained"
                    style={{ margin: "1.5rem 0" }}
                    onClick={submit}
                >
                    Submit
                </Button>
            </Grid>
        </Grid>
    );
};
