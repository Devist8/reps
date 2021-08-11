import React from "react";
import "firebase/storage";

//MUI
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
    Box,
    Grid,
    Card,
    CardContent,
    CardActionArea,
    CardActions,
    CardMedia,
    GridList,
    GridListTile,
    Typography,
    Slide,
    Popper,
    TextField,
    IconButton,
    Menu,
    Button,
    MenuItem,
    Modal,
    Tooltip,
    ClickAwayListener,
} from "@material-ui/core";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@material-ui/lab";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import ScheduleIcon from "@material-ui/icons/Schedule";
import CloseIcon from "@material-ui/icons/Close";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";

//Components
import { Difficulty } from "../Difficulty";
import { ActionButton } from "../ActionButton";
import { Exercise } from "../Exercises/Exercise";
import { Scheduler } from "../Scheduler";

import { AddToStoreModal } from "../Store/AddToStoreModal";

//Redux

import { useDispatch, useSelector } from "react-redux";
import {
    deleteWorkout,
    deleteUserWorkout,
} from "../../redux/actions/dataActions";
import { addToStore } from "../../redux/actions/storeActions";
import { ADD_WORKOUT, CLEAR_FILE, SET_FILE } from "../../redux/types";

///////////////////////////////////
///////////////////////////////////
///////////////STYLES//////////////
///////////////////////////////////
///////////////////////////////////

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
    title: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "noWrap",
    },
    video: {},
    speedDialBtn: {
        height: "2.5vw",
        width: "2.5vw",
    },
}));

export const WorkoutHeader = (props) => {
    ///////////////////////////////////
    ///////////////////////////////////
    /////////////VARIABLES/////////////
    ///////////////////////////////////
    ///////////////////////////////////

    const classes = useStyles();
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.user.info);
    const card = React.useRef();
    const [anchor, setAnchor] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [modal, setModal] = React.useState(false);
    const [menuAnchor, setMenuAnchor] = React.useState(null);
    const [speedDial, setSpeedDial] = React.useState(false);
    const [storeItemInfo, setStoreItemInfo] = React.useState({
        sections: [],
        categories: [],
    });
    const {
        workout,
        handleOpen,
        edit,
        handleChange,
        noButton,
        schedule,
        preview,
        setPreview,
        handleDelete,
        addWorkout,
    } = props;

    ///////////////////////////////////
    ///////////////////////////////////
    /////////////FUNCTIONS/////////////
    ////////////////METHODS////////////
    ///////////////////////////////////
    ///////////////////////////////////

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
                    console.log(preview);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        } else {
            dispatch({ type: CLEAR_FILE, payload: file });
        }
    };

    const openMenu = (e) => {
        console.log(e.currentTarget);
        setMenuAnchor(e.currentTarget);
    };

    ///////////////////////////////////
    //////////RENDER///////////////////
    ////////////METHOD/////////////////
    //////////////////////////JSX//////
    ///////////////////////////////////
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

                <Grid item xs={7} className={classes.cardContent}>
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
                            <Tooltip title={workout.title}>
                                {!edit ? (
                                    <Typography
                                        className={classes.title}
                                        style={{
                                            marginBottom: "0.6rem",
                                            overflow: "ellipsis",
                                        }}
                                    >
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
                            </Tooltip>
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
                        xs={3}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <CardActions ref={card}>
                            {handleDelete ? (
                                <IconButton
                                    onClick={() =>
                                        handleDelete(workout.id, workout.week)
                                    }
                                >
                                    <CloseIcon />
                                </IconButton>
                            ) : (
                                <IconButton
                                    onClick={(e) => {
                                        console.log(e.currentTarget);
                                        openMenu(e);
                                    }}
                                >
                                    <MoreVertIcon />
                                </IconButton>
                            )}
                            <ClickAwayListener
                                onClickAway={() => setOpen(false)}
                            >
                                <Box>
                                    <Menu
                                        open={Boolean(menuAnchor)}
                                        anchorEl={menuAnchor}
                                        onClose={() => setMenuAnchor(null)}
                                    >
                                        <MenuItem
                                            onClick={() => {
                                                setModal(true);
                                                setMenuAnchor(null);
                                            }}
                                        >
                                            Add to store
                                        </MenuItem>
                                        <MenuItem
                                            onClick={(e) => {
                                                setAnchor(e.currentTarget);
                                                setOpen(true);
                                                setMenuAnchor(null);
                                            }}
                                        >
                                            Schedule
                                        </MenuItem>
                                        <MenuItem>Share</MenuItem>
                                    </Menu>

                                    <Popper
                                        open={open}
                                        anchorEl={anchor}
                                        style={{ zIndex: "1000" }}
                                    >
                                        <Scheduler
                                            id={workout.id}
                                            item={workout}
                                            popperToggle={() => setOpen(false)}
                                        />
                                    </Popper>
                                </Box>
                            </ClickAwayListener>
                        </CardActions>
                    </Grid>
                )}
            </Grid>
            <Modal
                open={modal}
                onClose={() => setModal(false)}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                }}
            >
                <AddToStoreModal item={workout} />
            </Modal>
        </Card>
    );
};

export const ExerciseList = (props) => {
    const { workout, open, small, noButton } = props;
    ///////////////////////////////////
    //////////RENDER///////////////////
    ////////////METHOD/////////////////
    //////////////////////////JSX//////
    ///////////////////////////////////
    return (
        <Grid
            container
            style={{ display: "flex", flexWrap: "nowrap", width: "100%" }}
        >
            <GridList
                cols={1}
                style={{
                    padding: 0,
                    margin: "auto",
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                }}
            >
                {workout.exercises.map((exercise, index) => {
                    return (
                        <Slide
                            key={exercise.docId}
                            in={open}
                            mountOnEnter
                            unmountOnExit
                            style={{ width: "50vw" }}
                            timeout={{
                                enter:
                                    workout.exercises.length * 350 -
                                    index * 350,
                                exit: 150 + index * 150,
                            }}
                        >
                            <GridListTile
                                key={exercise.id}
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
                                              width: "100%",
                                              borderRadius: "18px",
                                          }
                                        : {
                                              padding: 0,
                                              display: "flex",
                                              justifyContent: "center",
                                              marginTop: "0.5rem",
                                              width: "100%",
                                              height: "5rem",
                                              borderRadius: "18px",
                                          }
                                }
                            >
                                <Exercise
                                    exercise={exercise}
                                    style={{ marginLeft: "1rem" }}
                                    small={small}
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

    const {
        workout,
        edit,
        handleChange,
        small,
        noButton,
        schedule,
        preview,
        setPreview,
        handleDelete,
    } = props;

    const [open, setOpen] = React.useState(false);
    const handleOpen = (e) => {
        setOpen((prevState) => !prevState);
    };

    ///////////////////////////////////
    //////////RENDER///////////////////
    ////////////METHOD/////////////////
    //////////////////////////JSX//////
    ///////////////////////////////////

    return (
        <Grid
            container
            data-testid="workout-test"
            style={{
                overflow: "hidden",
                backgroundColor: theme.palette.secondary.light,
                maxWidth: "450px",
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
                preview={preview}
                setPreview={setPreview}
                handleDelete={handleDelete}
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
