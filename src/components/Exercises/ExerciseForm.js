import React from "react";
import ReactPlayer from "react-player";
import met from "../../util/met";
import firebase from "firebase/app";
import "firebase/storage";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import {
    Grid,
    Typography,
    TextField,
    Select,
    MenuItem,
    Divider,
    InputLabel,
    FormControl,
    IconButton,
    Badge,
    Button,
} from "@material-ui/core";

//Components
import { Difficulty } from "../Difficulty";
import { BubbleArray } from "../BubbleArray";

//Redux
import { useDispatch, useSelector } from "react-redux";
import {
    uploadVideo,
    updateNewExercise,
    submitExercise,
    uploadToFirebase,
} from "../../redux/actions/dataActions";
import { CLEAR_FILE, SET_FILE } from "../../redux/types";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.secondary.light,
    },
    video: {},
    videoIcon: {
        backgroundColor: "white",
    },
    formContainer: {
        textAlign: "center",
        boxShadow: "-3px 0px 5px 0px rgba(0,0,0,0.14)",
    },
    form: {
        boxShadow: "0px 3px 5px 0px rgba(0,0,0,0.25)",
    },
    fieldContainer: {
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
    },
    select: {
        width: "50%",
    },
    formField: {
        width: "50%",
    },
    submit: {
        display: "flex",
        textAlign: "center",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
    },
}));

const muscles = [
    "abs",
    "chest",
    "biceps",
    "triceps",
    "calfs",
    "glutes",
    "back",
    "shoulders",
    "legs",
    "delts",
];
const equipment = [
    "dumbbells",
    "kettlebells",
    "resistance bands",
    "exercise ball",
    "jump rope",
    "stairs",
];

export const ExerciseForm = (props) => {
    const {} = props;
    const dispatch = useDispatch();

    const file = useSelector((state) => state.data.file);
    const classes = useStyles();
    const newExercise = useSelector((state) => state.data.newExercise);
    const [preview, setPreview] = React.useState(null);

    const handleChange = (e) => {
        const data = {
            name: e.target.name,
            value: e.target.value,
        };
        dispatch(updateNewExercise(data));
    };

    const handleFileChange = (e) => {
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

    const updateArray = (e) => {
        const data = {
            name: e.target.name,
            value: [...newExercise[e.target.name], e.target.value],
        };
        console.log(data);
        dispatch(updateNewExercise(data));
    };

    const uploadFile = () => {
        if (file) {
            dispatch(uploadToFirebase(file));
        }
    };

    const submit = () => {
        dispatch(submitExercise(newExercise));
    };

    return (
        <Grid container className={classes.root}>
            <Grid container className={classes.form}>
                <Grid
                    item
                    xs={5}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexWrap: "wrap",
                    }}
                >
                    <Badge
                        className={classes.video}
                        badgeContent={
                            <IconButton
                                size="small"
                                onClick={handleEditPicture}
                                className={classes.videoIcon}
                            >
                                <EditIcon style={{ color: "black" }} />
                                <input
                                    type="file"
                                    id="imageInput"
                                    hidden="hidden"
                                    onChange={handleFileChange}
                                />
                            </IconButton>
                        }
                    >
                        {newExercise.videoURL || preview ? (
                            <ReactPlayer
                                url={
                                    newExercise.videoURL
                                        ? newExercise.videoURL
                                        : preview
                                }
                                width="320px"
                                height="180px"
                                controls
                            />
                        ) : (
                            <div
                                style={{
                                    width: "320px",
                                    height: "180px",
                                    backgroundColor: "white",
                                    display: "flex",
                                    textAlign: "center",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Typography>
                                    Click edit icon to add video
                                </Typography>
                            </div>
                        )}
                    </Badge>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={uploadFile}
                    >
                        Upload to Firebase
                    </Button>
                </Grid>

                <Grid item xs={6} className={classes.formContainer}>
                    <FormControl
                        style={{
                            width: "50%",
                            margin: "auto",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <TextField
                            name="title"
                            value={newExercise.title}
                            className={classes.formField}
                            fullWidth
                            label="Title"
                            style={{ width: "100%" }}
                            onChange={(e) => handleChange(e)}
                        />
                    </FormControl>
                    <Grid
                        item
                        style={{
                            width: "50%",
                            margin: "1rem auto",
                        }}
                    >
                        <Difficulty
                            difficulty={newExercise.difficulty}
                            edit
                            editDifficulty={handleChange}
                        />
                    </Grid>
                    <FormControl
                        style={{
                            width: "50%",
                            margin: "auto",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Typography
                            variant="overline"
                            style={{ alignSelf: "start" }}
                        >
                            Activity
                        </Typography>
                        <Select
                            className={classes.select}
                            autoWidth
                            name="activity"
                            label="activity"
                            labelId="acitivity-label"
                            style={{ width: "100%" }}
                            onChange={(e) => handleChange(e)}
                            value={newExercise.activity}
                        >
                            {Object.keys(met).map((activity) => {
                                return (
                                    <MenuItem value={activity}>
                                        {activity}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                    <br />
                    <FormControl
                        style={{
                            width: "50%",
                            marginTop: "1rem",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Typography
                            style={{ alignSelf: "start" }}
                            variant="overline"
                        >
                            Motion
                        </Typography>
                        <Select
                            className={classes.select}
                            style={{ width: "100%" }}
                            name="motion"
                            value={newExercise.motion}
                            disabled={!newExercise.activity}
                            onChange={(e) => handleChange(e)}
                        >
                            {newExercise.activity &&
                                met[newExercise.activity].map((motion) => {
                                    return (
                                        <MenuItem value={motion.motion}>
                                            {motion.motion}
                                        </MenuItem>
                                    );
                                })}
                        </Select>
                    </FormControl>
                    <Grid
                        item
                        xs={8}
                        style={{ margin: "auto", marginTop: "1rem" }}
                    >
                        <Typography
                            style={{ textAlign: "left" }}
                            variant="overline"
                        >
                            Select muscles:
                        </Typography>
                        <Grid item xs={10} style={{ margin: "auto" }}>
                            <BubbleArray
                                array={muscles}
                                addHandler={updateArray}
                                itemType={"muscles"}
                                selectedArray={newExercise.muscles}
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        xs={8}
                        style={{ margin: "auto", marginBottom: "1.5rem" }}
                    >
                        <Typography
                            style={{ textAlign: "left" }}
                            variant="overline"
                        >
                            Select equipment:
                        </Typography>
                        <Grid item xs={10} style={{ margin: "auto" }}>
                            <BubbleArray
                                array={equipment}
                                addHandler={updateArray}
                                itemType={"equipment"}
                                selectedArray={newExercise.equipment}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Divider variant="fullWidth" />
            <Grid container className={classes.submit}>
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
