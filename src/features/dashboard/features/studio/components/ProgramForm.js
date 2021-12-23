import React from "react";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import {
    Grid,
    Typography,
    Button,
    Badge,
    IconButton,
    TextField,
    LinearProgress,
    Modal,
} from "@material-ui/core";

//Components
import { WorkoutList } from "../../../components/WorkoutList";
import { Difficulty } from "../../../components/Difficulty";
import { BubbleArray } from "../../../components/BubbleArray";
import { WorkoutSelectionModal } from "../components/WorkoutSelectionModal";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { updateNewProgram, submitProgram } from "../actions";
import { CLEAR_FILE, SET_FILE } from "../../../reducers/types";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "80%",
        marginTop: "5vh",
        boxShadow: "0px 3px 5px 0px rgba(0,0,0,0.25)",
    },
    boxShadow: {
        width: "100%",
        minHeight: "563px",
        backgroundColor: "#FAFDFF",
    },
    container: {
        position: "absolute",
        left: "25%",
        top: "17%",
    },
    formContainer: {},
    headerContainer: {
        boxShadow:
            "0px 3px 1px -2px rgb(0 0 0 / 14%), 0px 2px 2px 0px rgb(0 0 0 / 12%), 0px 1px 5px 0px rgb(0 0 0 / 10%)",
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "30vh",
    },
    anchor: {
        top: "50%",
        right: "50%",
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

export const ProgramForm = (props) => {
    const {} = props;
    const classes = useStyles();
    const dispatch = useDispatch();
    const file = useSelector((state) => state.studio.programFile);
    const newProgram = useSelector((state) => state.studio.newProgram);
    const progress = useSelector((state) => state.ui.progress);
    const [open, setOpen] = React.useState(false);
    const [preview, setPreview] = React.useState(null);
    const [selectedWeek, setSelectedWeek] = React.useState(null);

    const handleChange = (e) => {
        const data = {
            name: e.target.name,
            value: e.target.value,
        };
        dispatch(updateNewProgram(data));
    };

    const openModal = (week) => {
        setOpen(!open);
        selectedWeek === week ? setSelectedWeek(null) : setSelectedWeek(week);
    };

    const addWorkout = (workout, week) => {
        const updatedWeek = [...newProgram.workouts[week - 1], workout];
        console.log(updatedWeek);
        const updatedWorkouts = [...newProgram.workouts];
        //console.log(updatedWorkouts);
        updatedWorkouts[week - 1] = updatedWeek;
        workout.program = newProgram.title && newProgram.title;
        workout.week = week;
        workout.exercises.map((exercise) => (exercise.week = week));
        const data = {
            name: "workouts",
            value: updatedWorkouts,
        };
        dispatch(updateNewProgram(data));

        data.name = "workoutCount";
        data.value = newProgram.workoutCount + 1;

        dispatch(
            updateNewProgram({
                name: "workoutCount",
                value: data.value,
            })
        );
        data.name = "exerciseCount";
        data.value = newProgram.exerciseCount + workout.exerciseCount;

        dispatch(
            updateNewProgram({
                name: "exerciseCount",
                value: newProgram.exerciseCount + workout.exerciseCount,
            })
        );
        data.name = "program";

        dispatch(updateNewProgram(data));

        const newMuscles = workout.muscles.filter(
            (muscle) => !newProgram.muscles.includes(muscle)
        );
        data.name = "muscles";
        data.value = [...newProgram.muscles, ...newMuscles];
        dispatch(updateNewProgram(data));
        const newEquipment = workout.equipment.filter(
            (item) => !newProgram.equipment.includes(item)
        );
        data.name = "equipment";
        data.value = [...newProgram.equipment, ...newEquipment];
        dispatch(updateNewProgram(data));
    };

    const addWeek = () => {
        const data = {
            name: "workouts",
            value: [...newProgram.workouts, []],
        };
        dispatch(updateNewProgram(data));
    };

    const handleFileChange = (e) => {
        e.persist();
        const reader = new FileReader();
        let file = e.target.files[0];

        if (file) {
            reader.onload = () => {
                if (reader.readyState === 2) {
                    dispatch({
                        type: SET_FILE,
                        payload: { file: file, type: "program" },
                    });
                    setPreview(URL.createObjectURL(file));
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        } else {
            dispatch({ type: CLEAR_FILE, payload: { type: "program" } });
        }
    };

    const handleEditPicture = () => {
        const fileInput = document.getElementById("imageInput");
        fileInput.click();
    };

    const submit = () => {
        dispatch(submitProgram(newProgram, file));
        setPreview(null);
    };

    const removeWorkout = (workoutId, week) => {
        const workout = newProgram.workouts[week].filter(
            (x) => x.id === workoutId
        );

        const newArray = newProgram.workouts[week].filter(
            (x) => x.id !== workoutId
        );
        const newWorkouts = { ...newProgram.workouts, [week]: newArray };
        const data = {
            name: "workouts",
            value: newWorkouts,
        };
        dispatch(updateNewProgram(data));
    };

    return (
        <Grid container className={classes.root}>
            <Grid item xs={12} className={classes.boxShadow}>
                <Grid item xs={12} className={classes.headerContainer}>
                    {newProgram.imageURL || preview ? (
                        <Badge
                            classes={{
                                anchorOriginTopRightRectangle: classes.anchor,
                            }}
                            badgeContent={
                                <IconButton
                                    size="small"
                                    onClick={handleEditPicture}
                                    className={classes.videoIcon}
                                >
                                    <EditIcon style={{ color: "white" }} />
                                    <input
                                        type="file"
                                        id="imageInput"
                                        hidden="hidden"
                                        onChange={handleFileChange}
                                        style={{
                                            height: "30vh",
                                            width: "30vw",
                                        }}
                                    />
                                </IconButton>
                            }
                        >
                            <img
                                src={
                                    newProgram.imageURL
                                        ? newProgram.imageURL
                                        : preview
                                }
                                style={{
                                    objectFit: "fill",
                                    height: "30vh",
                                }}
                            />
                        </Badge>
                    ) : (
                        <div
                            style={{
                                width: "100%",
                                height: "250px",
                                backgroundColor: "white",
                                display: "flex",
                                textAlign: "center",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Button onClick={handleEditPicture}>
                                Start by addding an image
                            </Button>
                            <input
                                type="file"
                                id="imageInput"
                                hidden="hidden"
                                onChange={handleFileChange}
                            />
                        </div>
                    )}
                </Grid>
                <Grid
                    container
                    className={classes.formContainer}
                    style={{ display: "flex", flexDirection: "row" }}
                >
                    <Grid item xl={6} lg={4} style={{ display: "flex" }}>
                        <Grid
                            container
                            spacing={1}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                marginLeft: "1.5rem",
                                flexWrap: "nowrap",
                            }}
                        >
                            <Grid item>
                                <TextField
                                    name="title"
                                    label="Title"
                                    value={newProgram.title}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item>
                                <Difficulty
                                    difficulty={newProgram.difficulty}
                                    edit
                                    editDifficulty={handleChange}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    name="description"
                                    label="Description"
                                    fullWidth
                                    multiline
                                    value={newProgram.description}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid
                                item
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                }}
                            >
                                <Typography>{`Weeks: ${
                                    Object.keys(newProgram.workouts).length
                                }`}</Typography>
                                <IconButton
                                    size="small"
                                    onClick={addWeek}
                                    style={{
                                        marginLeft: "1rem",
                                        backgroundColor: "#7DD9FF",
                                        height: "20px",
                                        width: "20px",
                                        textAlign: "center",
                                    }}
                                >
                                    <AddIcon
                                        style={{
                                            fill: "black",
                                            height: "18px",
                                            width: "18px",
                                            margin: "auto",
                                        }}
                                    />
                                </IconButton>
                                <IconButton
                                    size="small"
                                    style={{
                                        marginLeft: "1rem",
                                        backgroundColor: "#7DD9FF",
                                        height: "20px",
                                        width: "20px",
                                        textAlign: "center",
                                    }}
                                >
                                    <RemoveIcon
                                        style={{
                                            fill: "black",
                                            height: "18px",
                                            width: "18px",
                                        }}
                                    />
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <Typography>{`Workout Count: ${newProgram.workoutCount}`}</Typography>
                            </Grid>
                            <Grid item>
                                <Typography>{`Exercise Count: ${newProgram.exerciseCount}`}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography
                                    variant="h5"
                                    style={{ fontSize: "1.3rem" }}
                                >
                                    Muscles targeted:
                                </Typography>

                                {newProgram.muscles.length > 0 ? (
                                    <BubbleArray
                                        array={newProgram.muscles}
                                        color="secondary"
                                    />
                                ) : (
                                    <Typography>None</Typography>
                                )}
                            </Grid>

                            <Grid item xs={12}>
                                <Typography
                                    variant="h5"
                                    style={{ fontSize: "1.3rem" }}
                                >
                                    Equipment needed:
                                </Typography>

                                {newProgram.equipment.length > 0 ? (
                                    <BubbleArray
                                        array={newProgram.equipment}
                                        color="secondary"
                                    />
                                ) : (
                                    <Typography>None</Typography>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        xl={6}
                        lg={8}
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            width: "35vw",
                        }}
                    >
                        <Grid style={{ width: "95%" }}>
                            <WorkoutList
                                workouts={newProgram.workouts}
                                openModal={openModal}
                                small={true}
                                noButton
                                edit
                                handleDelete={removeWorkout}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid style={{ margin: "auto" }}>
                <Modal
                    open={open}
                    onClose={() => openModal("")}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        alignContent: "center",
                    }}
                >
                    <WorkoutSelectionModal
                        selectedWorkouts={newProgram.workouts[selectedWeek - 1]}
                        selectedWeek={selectedWeek}
                        addWorkout={addWorkout}
                    />
                </Modal>
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
                    color="primary"
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
