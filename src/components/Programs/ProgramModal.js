import React from "react";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import {
    Card,
    CardMedia,
    CardContent,
    IconButton,
    CardActionArea,
    Grid,
    Typography,
    TextField,
    Button,
    Slide,
} from "@material-ui/core";

//Components
import { Difficulty } from "../Difficulty";
import { Workout } from "../Workouts/Workout";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    content: {
        backgroundColor: theme.palette.primary.main,
    },
    card: {},
    mediaContainer: {
        height: "30vh",
        display: "flex",
        justifyContent: "flex-end",
    },
    button: {
        margin: "auto 0 0 2rem",
        marginTop: "2rem",
        marginRight: "2rem",
        color: "#000",
        justifyContent: "bottom",
        alignItems: "bottom",
    },
    stats: {
        marginLeft: "1.8rem",
        textAlign: "right",
    },
    workoutListContainer: {
        backgroundColor: theme.palette.secondary.main,
        overflow: "hidden",
        display: "flex",
        flexWrap: "nowrap",
        flexDirection: "column",
        maxWidth: "750px",
    },
    weekTitle: {
        backgroundColor: theme.palette.primary.light,
        overflow: "hidden",
    },
    bottomBorder: {
        height: "25px",
        backgroundColor: theme.palette.primary.main,
        borderRadius: "0 0 4px 4px",
    },
    workoutContainer: {
        flexWrap: "wrap",
        flexDirection: "row",
        display: "flex",
    },
}));

export const WorkoutList = (props) => {
    const classes = useStyles();
    const { workouts, openModal, small, noButton, edit } = props;
    const [open, setOpen] = React.useState("");
    const handleOpen = (e) => {
        e.persist();
        open !== e.target.selectedWeek
            ? setOpen(e.target.selectedWeek)
            : setOpen("");
    };

    const orderedWorkouts = Object.keys(workouts)
        .sort()
        .reduce((obj, key) => {
            obj[key] = workouts[key];
            return obj;
        }, {});

    return (
        <Grid container className={classes.workoutListContainer}>
            {Object.entries(orderedWorkouts).map((week, weekIndex) => {
                return (
                    <Grid
                        container
                        style={{ overflow: "hidden" }}
                        key={week[0]}
                    >
                        <Grid
                            item
                            xs={12}
                            className={classes.weekTitle}
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                zIndex: 1000,
                            }}
                        >
                            <CardActionArea
                                onClick={(e) => {
                                    e.target.selectedWeek = week[0];
                                    handleOpen(e);
                                }}
                            >
                                <Typography>{week[0]}</Typography>
                            </CardActionArea>
                            {edit && (
                                <IconButton
                                    size="small"
                                    style={{
                                        marginRight: "0.3rem",
                                        backgroundColor: "#BAEAFF",
                                        height: "18px",
                                        width: "18px",
                                    }}
                                    name={week[0]}
                                    onClick={(e) => openModal(week[0])}
                                >
                                    <AddIcon
                                        style={{
                                            fill: "black",
                                            height: "16px",
                                            width: "16px",
                                        }}
                                    />
                                </IconButton>
                            )}
                        </Grid>
                        <Slide
                            in={week[0] === open}
                            mountOnEnter
                            unmountOnExit
                            timeout={{
                                enter: week[1].length * 200 - weekIndex * 200,
                                exit: 200 + weekIndex * 200,
                            }}
                        >
                            <Grid
                                item
                                xs={12}
                                className={classes.workoutContainer}
                            >
                                {week[1].map((workout, index) => {
                                    return (
                                        <Slide
                                            in={week[0] === open}
                                            mountOnEnter
                                            unmountOnExit
                                            key={workout.docId}
                                            timeout={{
                                                enter:
                                                    workout.exercises.length *
                                                        350 -
                                                    index * 350,
                                                exit: 250 + index * 250,
                                            }}
                                            style={{
                                                overflow: "hidden",
                                            }}
                                        >
                                            <Grid
                                                item
                                                lg={6}
                                                md={12}
                                                style={{
                                                    overflow: "hidden",
                                                    width: "100%",
                                                }}
                                            >
                                                <Workout
                                                    workout={workout}
                                                    small={small}
                                                    noButton={noButton}
                                                />
                                            </Grid>
                                        </Slide>
                                    );
                                })}
                            </Grid>
                        </Slide>
                    </Grid>
                );
            })}
        </Grid>
    );
};

export const ProgramModal = (props) => {
    const classes = useStyles();
    const { program, edit } = props;

    return (
        <Grid
            container
            className={classes.root}
            style={{
                minWidth: "80vw",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
                overflowY: "scroll",
            }}
            data-testid="program-modal-test"
        >
            <Card elevation={2} className={classes.card}>
                <Grid item xs={12} className={classes.mediaContainer}>
                    <IconButton
                        small
                        onClick={() => props.closeModal()}
                        style={{
                            position: "absolute",
                        }}
                    >
                        <HighlightOffIcon />
                    </IconButton>
                    <CardMedia
                        component="img"
                        src="/beachbody-original.jpg"
                        style={{ objectFit: "fill", height: "30vh" }}
                    />
                </Grid>
                <CardContent className={classes.content}>
                    <Grid container>
                        <Grid item xs={9}>
                            {!edit ? (
                                <Typography
                                    variant="h4"
                                    style={{ fontWeight: 600 }}
                                >
                                    {program.title}
                                </Typography>
                            ) : (
                                <TextField
                                    name="title"
                                    id="title"
                                    aria-label={program.title}
                                    aria-required="true"
                                    value={program.title}
                                />
                            )}

                            <Difficulty difficulty={program.difficulty} />

                            <Typography
                                style={{
                                    marginTop: "1rem",
                                    fontWeight: 700,
                                }}
                                variant="h6"
                            >
                                Description
                            </Typography>
                            {!edit ? (
                                <Typography
                                    style={{
                                        maxWidth: "500px",
                                        maxHeight: "20vh",
                                        overflowY: "scroll",
                                    }}
                                >
                                    {program.description}
                                </Typography>
                            ) : (
                                <TextField
                                    name="description"
                                    value={program.description}
                                    fullWidth
                                    multiline
                                    aria-multiline="true"
                                />
                            )}
                        </Grid>
                        <Grid item xs={3}>
                            <Typography className={classes.stats}>
                                5 weeks
                            </Typography>
                            <Typography className={classes.stats}>
                                20 workouts
                            </Typography>
                            <Typography className={classes.stats}>
                                50 exercises
                            </Typography>
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                            >
                                Add Program
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>

                <WorkoutList workouts={program.workouts} noButton />
                <div className={classes.bottomBorder} />
            </Card>
        </Grid>
    );
};
