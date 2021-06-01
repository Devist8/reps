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
    Select,
    Input,
    Modal,
} from "@material-ui/core";

//Components
import { WorkoutList } from "../Programs/ProgramModal";
import { Difficulty } from "../Difficulty";
import { BubbleArray } from "../BubbleArray";
import { WorkoutSelectionModal } from "./WorkoutSelectionModal";
import { Workout } from "../Workouts/Workout";

//Redux
import { useSelector, useDispatch } from "react-redux";
import {
    updateNewProgram,
    uploadNewProgramImage,
    uploadToFirebase,
} from "../../redux/actions/dataActions";
import { CLEAR_FILE, SET_FILE } from "../../redux/types";

const useStyles = makeStyles((theme) => ({
    boxShadow: {
        width: "1200px",
        minHeight: "563px",
        backgroundColor: "#FAFDFF",
    },
    container: {
        position: "absolute",
        left: "25%",
        top: "17%",
    },
    formContainer: {
        boxShadow: "0px 3px 0px 0px rgba(0,0,0,0.5)",
    },
    headerContainer: {
        boxShadow:
            "0px 3px 1px -2px rgb(0 0 0 / 14%), 0px 2px 2px 0px rgb(0 0 0 / 12%), 0px 1px 5px 0px rgb(0 0 0 / 10%)",
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "30vh",
    },
    submit: {
        display: "flex",
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
    const newProgram = useSelector((state) => state.data.newProgram);
    const [open, setOpen] = React.useState(false);
    const [preview, setPreview] = React.useState(null);
    const [selectedWeek, setSelectedWeek] = React.useState("");

    const handleChange = (e) => {
        const data = {
            name: e.target.name,
            value: e.target.value,
        };
        dispatch(updateNewProgram(data));
    };

    const openModal = (week) => {
        setOpen(!open);
        selectedWeek === week ? setSelectedWeek("") : setSelectedWeek(week);
    };

    const addWorkout = (workout, week) => {
        const updatedWeek = {
            ...newProgram.workouts,
            [week]: [...newProgram.workouts[week], workout],
        };

        const data = {
            name: "workouts",
            value: updatedWeek,
        };
        newProgram.workouts[week].concat(workout);
        dispatch(updateNewProgram(data));
        data.name = "workoutCount";
        data.value = newProgram.workoutCount + 1;
        dispatch(updateNewProgram(data));
        data.name = "exerciseCount";
        data.value = newProgram.exerciseCount + workout.exerciseCount;
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
        const lastWeek = Object.keys(newProgram.workouts)[
            Object.keys(newProgram.workouts).length - 1
        ];
        const prefix = lastWeek.split(" ")[0];
        const number = parseInt(lastWeek.split(" ")[1]);

        const newWeek = `${prefix} ${number + 1}`;
        const data = {
            name: "workouts",
            value: { ...newProgram.workouts, [newWeek]: [] },
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
                    console.log(file);
                    dispatch({ type: SET_FILE, payload: file });
                    setPreview(URL.createObjectURL(file));
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        } else {
            dispatch({ type: CLEAR_FILE, payload: file });
        }
    };

    const handleEditPicture = () => {
        const fileInput = document.getElementById("imageInput");
        fileInput.click();
    };

    return (
        <Grid container className={classes.root}>
            <Grid item xs={12} className={classes.boxShadow}>
                <Grid item xs={12} className={classes.headerContainer}>
                    {newProgram.imageURL || preview ? (
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
                        selectedWorkouts={newProgram.workouts[selectedWeek]}
                        selectedWeek={selectedWeek}
                        addWorkout={addWorkout}
                    />
                </Modal>
            </Grid>
            <Grid item xs={12} className={classes.submit}>
                <Button
                    color="primary"
                    variant="contained"
                    style={{ margin: "1.5rem 0" }}
                >
                    Submit
                </Button>
            </Grid>
        </Grid>
    );
};
