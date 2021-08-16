import React from "react";
import { Link } from "react-router-dom";

//MUI
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
    Grid,
    Box,
    Card,
    CardActions,
    CardActionArea,
    Typography,
    TextField,
    Tooltip,
    IconButton,
    Modal,
    Button,
    Popper,
    Menu,
    MenuItem,
} from "@material-ui/core";
import ScheduleIcon from "@material-ui/icons/Schedule";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import MoreVertIcon from "@material-ui/icons/MoreVert";

//Components
import { Difficulty } from "../Difficulty";
import { ActionButton } from "../ActionButton";
import { ExerciseInfo } from "./ExerciseInfo";
import { Scheduler } from "../Scheduler";
import { Timer } from "../Timer";

//Redux
import { useSelector, useDispatch } from "react-redux";
import {
    deleteWorkout,
    deleteUserWorkout,
    updateScheduledExerciseStatus,
} from "../features/studio/actions";

const useStyles = makeStyles(() => ({
    cardRoot: {
        display: "flex",
        maxWidth: "300px",
        maxHeight: "8vh",
        minWidth: "20vw",
    },
    cardContent: {
        paddingBottom: "30px",

        display: "flex",
        flexWrap: "wrap",
    },
    title: {
        maxWidth: "10vw",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "noWrap",
        fontSize: "0.8879rem",
    },
    actionRoot: {
        padding: 0,
        paddingTop: "3px",
    },
    tooltip: {},
}));

export const Exercise = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.user.info);

    const scheduleData = useSelector((state) => state.data.schedule);
    const [scheduleItem, setScheduleItem] = React.useState();
    const [modalOpen, setModalOpen] = React.useState(false);
    const [timerModal, setTimerModal] = React.useState(false);
    const [popperOpen, setPopperOpen] = React.useState(false);
    const [anchor, setAnchor] = React.useState(null);
    const [menuAnchor, setMenuAnchor] = React.useState(null);
    const [errors, setErrors] = React.useState({});
    const {
        exercise,
        small,
        edit,
        index,
        addExercise,
        addToWorkout,
        noButton,
        schedule,
        handleDelete,
    } = props;

    const closeModal = () => {
        setModalOpen(false);
    };

    const closeTimerModal = () => {
        setTimerModal(false);
    };

    const cancelExercise = () => {
        dispatch(
            updateScheduledExerciseStatus(scheduleItem, exercise, "canceled")
        );
    };

    const closePopper = () => {
        setPopperOpen(false);
        setAnchor(null);
        exercise.reps = "";
    };
    const openScheduler = (e) => {
        const scheduleItem = {
            ...exercise,
        };
        if (scheduleItem.reps) {
            setAnchor(e.currentTarget);
            setPopperOpen(true);
        } else {
            setErrors({ reps: "Set reps " });
        }
    };
    const openMenu = (e) => {
        setMenuAnchor(e.currentTarget);
    };

    React.useEffect(() => {
        setScheduleItem(
            scheduleData.filter((x) =>
                exercise.week
                    ? x.id === exercise.programId
                    : exercise.workoutId
                    ? x.id === exercise.workoutId
                    : x.id === exercise.id
            )[0]
        );
    }, []);
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
                <Grid item xs={small ? 8 : 9} className={classes.cardContent}>
                    <CardActionArea
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            alignItems: "center",
                            alignContent: "center",
                            height: "8vh",
                            marginLeft: "0.3vw",
                            width: "68%",
                        }}
                        component={Link}
                        to={`/exercise/${exercise.id}`}
                        //onClick={() => setModalOpen(true)}
                    >
                        <Grid item xs={12}>
                            <Grid
                                item
                                xs={12}
                                style={{
                                    display: "flex",
                                    textAlign: "flex-start",
                                }}
                            >
                                <Tooltip
                                    title={`${
                                        exercise.title
                                    } • muscles:${exercise.muscles.map(
                                        (muscle) => muscle
                                    )} • equipment: ${
                                        exercise.equipment.length > 0
                                            ? exercise.equipment.map(
                                                  (item) => item
                                              )
                                            : "no equipment"
                                    }`}
                                    classes={{ tooltip: classes.tooltip }}
                                >
                                    {!edit ? (
                                        <Typography
                                            className={classes.title}
                                            aria-label={exercise.title}
                                            aria-required="true"
                                            variant="body2"
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
                                </Tooltip>
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                style={{
                                    display: "flex",
                                    textAlign: "flex-start",
                                }}
                            >
                                <Difficulty
                                    difficulty={exercise.difficulty}
                                    small
                                    editDifficulty={edit}
                                    id={exercise.id}
                                />
                            </Grid>
                        </Grid>
                    </CardActionArea>
                    <Grid item xs={3}>
                        {!edit ? (
                            exercise.reps ? (
                                <Typography
                                    style={{ width: "5vw", marginTop: "2.5vh" }}
                                >
                                    {exercise.reps}
                                </Typography>
                            ) : (
                                <TextField
                                    name="reps"
                                    error={errors.reps}
                                    helperText={errors.reps && "Set reps"}
                                    onChange={(e) =>
                                        (exercise.reps = e.target.value)
                                    }
                                    id={index && `reps: ${exercise.reps}`}
                                    aria-label={index && exercise.reps}
                                    value={index && exercise.reps}
                                    label="Reps"
                                />
                            )
                        ) : (
                            <TextField
                                name="reps"
                                onChange={(e) =>
                                    (exercise.reps = e.target.value)
                                }
                                id={index && `reps: ${exercise.reps}`}
                                aria-label={index && exercise.reps}
                                value={index && exercise.reps}
                                label="Reps"
                                style={{}}
                            />
                        )}
                    </Grid>
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
                                width: "1vw",
                                marginLeft: "0",
                            },
                            small
                                ? { marginRight: "0.3vw" }
                                : { marginLeft: "0" })
                        }
                    >
                        <CardActions
                            style={
                                ({
                                    display: "flex",
                                    flexWrap: "wrap",
                                    padding: 0,
                                },
                                errors.reps && {
                                    display: "flex",
                                    flexWrap: "wrap",
                                    paddingTop: "0px",
                                })
                            }
                            classes={
                                exercise.date && { root: classes.actionRoot }
                            }
                        >
                            {exercise.date ? (
                                <Box style={{ marginBottom: "1vh" }}>
                                    <Button
                                        className={classes.scheduledButton}
                                        size={small && "small"}
                                        onClick={() => setTimerModal(true)}
                                    >
                                        Start
                                    </Button>
                                    <Button
                                        style={{ marginBottom: "2.5vh" }}
                                        className={classes.scheduledButton}
                                        onClick={cancelExercise}
                                    >
                                        Cancel
                                    </Button>
                                </Box>
                            ) : addToWorkout ? (
                                <IconButton>
                                    <AddIcon
                                        onClick={() => {
                                            addExercise({ ...exercise });
                                            exercise.reps = "";
                                        }}
                                    />
                                </IconButton>
                            ) : (
                                <IconButton
                                    onClick={(e) => {
                                        openMenu(e);
                                    }}
                                >
                                    <MoreVertIcon />
                                </IconButton>
                            )}

                            <Popper
                                open={popperOpen}
                                anchorEl={anchor}
                                style={{ zIndex: "1000" }}
                            >
                                <Scheduler
                                    id={exercise.id}
                                    item={exercise}
                                    popperToggle={closePopper}
                                />
                            </Popper>
                        </CardActions>
                    </Grid>
                )}
            </Grid>
            <Menu
                open={Boolean(menuAnchor)}
                anchorEl={menuAnchor}
                onClose={() => setMenuAnchor(null)}
            >
                <MenuItem
                    onClick={() => {
                        addExercise({ ...exercise });
                        exercise.reps = "";
                    }}
                >
                    Send to user
                </MenuItem>
                <MenuItem onClick={openScheduler}>Schedule</MenuItem>
                <MenuItem>Delete</MenuItem>
            </Menu>

            <Modal
                open={timerModal}
                onClose={closeTimerModal}
                onBackdropClick={closeTimerModal}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                    margin: "auto",
                    overflowY: "scroll",
                }}
            >
                <Timer exercise={exercise} />
            </Modal>
        </Card>
    );
};
