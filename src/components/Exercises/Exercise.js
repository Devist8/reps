import React from "react";

//MUI
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
    Grid,
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
} from "@material-ui/core";
import ScheduleIcon from "@material-ui/icons/Schedule";
import AddIcon from "@material-ui/icons/Add";

//Components
import { Difficulty } from "../Difficulty";
import { ActionButton } from "../ActionButton";
import { ExerciseInfo } from "./ExerciseInfo";
import { Scheduler } from "../Scheduler";
//Redux

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
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "noWrap",
        maxWidth: "8vw",
    },
}));

export const Exercise = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const [modalOpen, setModalOpen] = React.useState(false);
    const [popperOpen, setPopperOpen] = React.useState(false);
    const [anchor, setAnchor] = React.useState(null);
    const [errors, setErrors] = React.useState({});
    const { exercise, small, edit, index, addExercise, noButton, schedule } =
        props;

    const closeModal = () => {
        setModalOpen(false);
    };

    const openScheduler = (e) => {
        const scheduleItem = {
            ...exercise,
        };
        if (scheduleItem.reps) {
            setAnchor(e.currentTarget);
            setPopperOpen(!popperOpen);
        } else {
            setErrors({ reps: "Set reps " });
        }
    };

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
                <Grid item xs={8} className={classes.cardContent}>
                    <CardActionArea
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            alignItems: "center",
                            alignContent: "center",
                            height: "8vh",

                            width: "68%",
                        }}
                        onClick={() => setModalOpen(true)}
                    >
                        <Grid item xs={7}>
                            <Grid
                                item
                                xs={12}
                                style={{
                                    display: "flex",
                                    textAlign: "flex-start",
                                }}
                            >
                                <Tooltip title={exercise.title}>
                                    {!edit ? (
                                        <Typography
                                            className={classes.title}
                                            aria-label={exercise.title}
                                            aria-required="true"
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
                                    edit={edit}
                                />
                            </Grid>
                        </Grid>
                    </CardActionArea>
                    <Grid item xs={3}>
                        {!edit ? (
                            exercise.reps ? (
                                <Typography
                                    style={{ width: "5vw", marginTop: "20%" }}
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
                        xs={3}
                        style={
                            ({
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "1vw",
                            },
                            small
                                ? { marginLeft: "0" }
                                : { marginLeft: "0.9rem" })
                        }
                    >
                        <CardActions
                            style={
                                ({
                                    display: "flex",
                                    flexWrap: "wrap",
                                },
                                errors.reps && {
                                    display: "flex",
                                    flexWrap: "wrap",
                                    paddingTop: "0px",
                                })
                            }
                        >
                            {schedule ? (
                                <IconButton
                                    onClick={(e) => {
                                        openScheduler(e);
                                    }}
                                    styles={
                                        errors.rep && {
                                            marginBottom: "5px",
                                        }
                                    }
                                >
                                    <ScheduleIcon />
                                    <Popper
                                        open={popperOpen}
                                        anchorEl={anchor}
                                        style={{ zIndex: "1000" }}
                                    >
                                        <Scheduler
                                            id={exercise.id}
                                            item={exercise}
                                            popperToggle={() =>
                                                setPopperOpen(!popperOpen)
                                            }
                                        />
                                    </Popper>
                                </IconButton>
                            ) : exercise.reps ? (
                                <Button>Start</Button>
                            ) : (
                                <IconButton
                                    onClick={() => {
                                        addExercise({ ...exercise });
                                        exercise.reps = "";
                                    }}
                                >
                                    <AddIcon />
                                </IconButton>
                            )}
                        </CardActions>
                    </Grid>
                )}
            </Grid>
            <Modal
                open={modalOpen}
                onClose={() => closeModal()}
                onBackdropClick={() => closeModal()}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                    margin: "auto",
                    overflowY: "scroll",
                }}
            >
                <ExerciseInfo exercise={exercise} />
            </Modal>
        </Card>
    );
};
