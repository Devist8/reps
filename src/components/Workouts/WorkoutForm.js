import React from "react";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, TextField } from "@material-ui/core";

//Components
import { Exercise } from "../Exercises/Exercise";
import { Workout } from "./Workout";
import { BubbleArray } from "../BubbleArray";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { uploadImage, updateNewWorkout } from "../../redux/actions/dataActions";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.primary.main,
        padding: "2.5rem",
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
    },
    displayContainer: {},
}));

export const WorkoutForm = (props) => {
    const {} = props;
    const dispatch = useDispatch();
    const classes = useStyles();
    const exercises = useSelector((state) => state.data.exercises);
    const newWorkout = useSelector((state) => state.data.newWorkout);

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
    };

    const handleImageChange = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append("image", image, image.name);
        dispatch(uploadImage(formData));
    };

    const handleEditPicture = () => {
        const fileInput = document.getElementById("imageInput");
        fileInput.click();
    };

    return (
        <Grid container className={classes.root}>
            <Grid container className={classes.formContainer}>
                <Grid item xs={4}>
                    <Workout
                        workout={newWorkout}
                        edit
                        handleChange={handleChange}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} className={classes.formFields}>
                <Grid item xs={12}>
                    <TextField
                        name="description"
                        value={newWorkout.description}
                        className={classes.formField}
                        fullWidth
                        multiline
                        label="Description"
                        style={{ width: "80%" }}
                        onChange={(e) => handleChange(e)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography
                        variant="h5"
                        style={{ fontSize: "1.3rem" }}
                    >{`Exercise Count: ${newWorkout.exerciseCount}`}</Typography>
                </Grid>
                <Grid item xs={12}>
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
                <Grid item xs={12}>
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
                        width: "30%",
                    }}
                >
                    {exercises.map((exercise) => {
                        return (
                            <Grid item style={{ marginLeft: "25%" }}>
                                <Exercise
                                    exercise={exercise}
                                    addExercise={addExercise}
                                    small
                                />
                            </Grid>
                        );
                    })}
                </Grid>
            </Grid>
        </Grid>
    );
};
