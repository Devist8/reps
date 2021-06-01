import React from "react";
import firebase from "firebase/app";
import "firebase/storage";
import { v4 as uuid_v4 } from "uuid";

//React Router
import { useLocation } from "react-router-dom";

//MUI
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
    Grid,
    Card,
    CardContent,
    CardActionArea,
    CardActions,
    CardMedia,
    List,
    ListItem,
    GridList,
    GridListTile,
    Typography,
    Slide,
    TextField,
    IconButton,
    Badge,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import ScheduleIcon from "@material-ui/icons/Schedule";

//Components
import { Difficulty } from "../Difficulty";
import { ActionButton } from "../ActionButton";
import { Exercise } from "../Exercises/Exercise";

//Redux

import { useDispatch } from "react-redux";
import { CLEAR_FILE, SET_FILE } from "../../redux/types";
import { uploadToFirebase } from "../../redux/actions/dataActions";

const useStyles = makeStyles((theme) => ({
    cardRoot: {
        backgroundColor: theme.palette.secondary.main,
        overflow: "hidden",
        zIndex: 800,
        height: "85px",
        width: "100%",
    },
    imageContainer: {
        width: "5rem",
        overflow: "visible",
    },

    cardContent: {
        padding: 0,
    },
    video: {},
}));

export const WorkoutHeader = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [preview, setPreview] = React.useState(null);
    const { workout, handleOpen, edit, handleChange, noButton, schedule } =
        props;

    const handleEditPicture = () => {
        const fileInput = document.getElementById("imageInput");
        fileInput.click();
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

    return (
        <Card
            className={classes.cardRoot}
            style={{
                overflow: "visible",
                display: "flex",
                flexWrap: "nowrap",
                maxWidth: "500px",
            }}
        >
            <Grid
                container
                style={{
                    height: "85px",
                    display: "flex",
                    flexWrap: "noWrap",
                    width: "100%",
                    maxWidth: "500px",
                }}
            >
                {workout.imageURL || preview ? (
                    !edit ? (
                        <CardMedia
                            image={workout.imageURL}
                            className={classes.imageContainer}
                            style={{ objectFit: "fill" }}
                        />
                    ) : (
                        <CardMedia
                            image={preview}
                            className={classes.imageContainer}
                            style={{ objectFit: "fill" }}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                textAlign: "center",
                                alignContent: "center",
                                justifyContent: "center",
                                height: "100%",
                            }}
                        >
                            <IconButton
                                size="small"
                                onClick={handleEditPicture}
                                className={classes.videoIcon}
                                style={{
                                    padding: 0,
                                }}
                            >
                                <EditIcon
                                    style={{
                                        color: "white",
                                        overflow: "visible",
                                    }}
                                />
                                <input
                                    type="file"
                                    id="imageInput"
                                    hidden="hidden"
                                    onChange={handleFileChange}
                                />
                            </IconButton>
                        </CardMedia>
                    )
                ) : (
                    edit && (
                        <div
                            style={{
                                height: "100%",
                                width: "5rem",
                                backgroundColor: "white",
                                display: "flex",
                                alignItems: "center",
                                textAlign: "center",
                                alignContent: "center",
                                justifyContent: "center",
                            }}
                        >
                            <IconButton
                                size="small"
                                onClick={handleEditPicture}
                            >
                                <EditIcon style={{ color: "black" }} />
                                <input
                                    type="file"
                                    id="imageInput"
                                    hidden="hidden"
                                    onChange={handleFileChange}
                                />
                            </IconButton>
                        </div>
                    )
                )}

                <Grid item xs={8} className={classes.cardContent}>
                    <CardActionArea
                        onClick={(e) => handleOpen(e)}
                        style={{ height: "85px" }}
                    >
                        <CardContent
                            style={{
                                paddingTop: "10px",
                                height: "100%",
                                margin: "auto",
                            }}
                        >
                            {!edit ? (
                                <Typography style={{ marginBottom: "0.6rem" }}>
                                    {workout.title}
                                </Typography>
                            ) : (
                                <TextField
                                    name="title"
                                    id="title"
                                    aria-label={workout.title}
                                    aria-required="true"
                                    value={workout.title}
                                    onChange={(e) => handleChange(e)}
                                />
                            )}

                            <Difficulty
                                difficulty={workout.difficulty}
                                editDifficulty={handleChange}
                                edit={edit}
                            />
                        </CardContent>
                    </CardActionArea>
                </Grid>
                {!noButton && (
                    <Grid
                        item
                        xs={2}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <CardActions>
                            {schedule ? (
                                <IconButton>
                                    <ScheduleIcon />
                                </IconButton>
                            ) : (
                                <ActionButton
                                    edit={edit}
                                    handleChange={handleChange}
                                />
                            )}
                        </CardActions>
                    </Grid>
                )}
            </Grid>
        </Card>
    );
};

export const ExerciseList = (props) => {
    const classes = useStyles();
    const { workout, open, small, noButton } = props;
    return (
        <Grid
            container
            style={{ display: "flex", flexWrap: "nowrap", maxWidth: "500px" }}
        >
            <GridList
                cols={1}
                style={{
                    padding: 0,
                    margin: "auto",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                {workout.exercises.map((exercise, index) => {
                    return (
                        <Slide
                            key={exercise.id}
                            in={open}
                            mountOnEnter
                            unmountOnExit
                            timeout={{
                                enter:
                                    workout.exercises.length * 350 -
                                    index * 350,
                                exit: 150 + index * 150,
                            }}
                        >
                            <GridListTile
                                cols={1}
                                style={
                                    workout.exercises.length === index + 1
                                        ? {
                                              marginBottom: "0.5rem",
                                              padding: 0,
                                              display: "flex",
                                              justifyContent: "center",
                                              marginTop: "0.5rem",
                                              height: "5rem",

                                              borderRadius: "18px",
                                          }
                                        : {
                                              padding: 0,
                                              display: "flex",
                                              justifyContent: "center",
                                              marginTop: "0.5rem",

                                              height: "5rem",
                                              borderRadius: "18px",
                                          }
                                }
                            >
                                <Exercise
                                    exercise={exercise}
                                    style={{ marginLeft: "1rem" }}
                                    small={small}
                                    noButton={noButton}
                                />
                            </GridListTile>
                        </Slide>
                    );
                })}
            </GridList>
        </Grid>
    );
};

export const Workout = (props) => {
    const theme = useTheme();
    const classes = useStyles();
    const { workout, edit, handleChange, small, noButton, schedule } = props;

    const [open, setOpen] = React.useState(false);
    const handleOpen = (e) => {
        setOpen((prevState) => !prevState);
    };

    return (
        <Grid
            container
            data-testid="workout-test"
            style={{
                overflow: "hidden",
                backgroundColor: theme.palette.secondary.light,
                maxWidth: "500px",
                display: "flex",
                borderRadius: "4px",
            }}
        >
            <WorkoutHeader
                workout={workout}
                handleOpen={handleOpen}
                edit={edit}
                handleChange={handleChange}
                noButton={noButton}
                schedule={schedule}
            />
            {workout.exercises.length > 0 && (
                <ExerciseList
                    workout={workout}
                    open={edit ? true : open}
                    small={small}
                    noButton={noButton}
                />
            )}
        </Grid>
    );
};
