import React from "react";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
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
        width: "50rem",
        overflow: "hidden",
    },
    content: {
        backgroundColor: theme.palette.primary.main,
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
    },
    weekTitle: {
        backgroundColor: theme.palette.primary.light,
        overflow: "hidden",
    },
    bottomBorder: {
        height: "25px",
        backgroundColor: theme.palette.primary.main,
        borderRadius: "0 4px",
    },
    workoutContainer: {
        flexWrap: "wrap",
        flexDirection: "row",
        display: "flex",
    },
}));

export const WorkoutList = (props) => {
    const classes = useStyles();
    const { workouts } = props;
    const [openIndex, setOpenIndex] = React.useState([]);
    const handleOpen = (e) => {
        e.persist();
        setOpenIndex((prevState) => {
            if (prevState.includes(e.target.selectedIndex)) {
                const selected = prevState.indexOf(e.target.selectedIndex);
                const tempArray = prevState
                    .slice(0, selected)
                    .concat(prevState.slice(selected + 1));
                console.log(tempArray);
                console.log("remove");
                return tempArray;
            } else {
                console.log("add");
                return prevState.concat(e.target.selectedIndex);
            }
        });
    };
    console.log(openIndex);
    const orderedWorkouts = Object.keys(workouts)
        .sort()
        .reduce((obj, key) => {
            obj[key] = workouts[key];
            return obj;
        }, {});
    console.log(orderedWorkouts);
    return (
        <Grid container className={classes.workoutListContainer}>
            {Object.entries(orderedWorkouts).map((week, weekIndex) => {
                return (
                    <Grid container style={{ overflow: "hidden" }}>
                        <Grid item xs={12} className={classes.weekTitle}>
                            <CardActionArea
                                onClick={(e) => {
                                    e.target.selectedIndex = weekIndex;
                                    handleOpen(e);
                                }}
                            >
                                <Typography>{week[0]}</Typography>
                            </CardActionArea>
                        </Grid>
                        <Slide
                            in={openIndex.includes(weekIndex)}
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
                                            in={openIndex.includes(weekIndex)}
                                            mountOnEnter
                                            unmountOnExit
                                            timeout={{
                                                enter:
                                                    workout.exercises.length *
                                                        350 -
                                                    index * 350,
                                                exit: 250 + index * 250,
                                            }}
                                            style={{ overflow: "hidden" }}
                                        >
                                            <Grid
                                                item
                                                xs={6}
                                                style={{ overflow: "hidden" }}
                                            >
                                                <Workout workout={workout} />
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
            data-testid="program-modal-test"
        >
            <Card elevation={2} style={{}}>
                <Grid item xs={12} style={{ height: "200px" }}>
                    <CardMedia
                        component="img"
                        src="/beachbody-original.jpg"
                        style={{ objectFit: "fill", height: "200px" }}
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
                                <Typography>{program.description}</Typography>
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

                <WorkoutList workouts={program.workouts} />
                <div className={classes.bottomBorder} />
            </Card>
        </Grid>
    );
};
