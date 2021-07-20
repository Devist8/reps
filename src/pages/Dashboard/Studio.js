import React from "react";
import dayjs from "dayjs";

//functions
import { sortObjsByDifficulty, sortObjsByTitle } from "../../util/functions";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import {
    Grid,
    Box,
    Button,
    Typography,
    TextField,
    IconButton,
    Switch,
    FormControlLabel,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

//Components
import { ExerciseForm } from "../../components/Exercises/ExerciseForm";
import { WorkoutForm } from "../../components/Workouts/WorkoutForm";
import { ProgramForm } from "../../components/Programs/ProgramForm";
import { Workout } from "../../components/Workouts/Workout";
import { Exercise } from "../../components/Exercises/Exercise";
import { ProgramCarousel } from "../../components/Programs/ProgramCarousel";
import { Carousel } from "../../components/Carousel";

//Redux
import { useSelector, useDispatch } from "react-redux";
import {
    addToCollection,
    deleteWorkout,
    deleteUserWorkout,
} from "../../redux/actions/dataActions";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "72vw",
        minHeight: "563px",
        display: "flex",
        padding: "25px",
        justifyContent: "center",
        [theme.breakpoints.up("xl")]: {
            margin: "auto",
        },
    },
    creatorContainer: {
        boxShadow: "1px 2px 4px 1px rgba(0,0,0,0.1)",
    },
    buttonContainer: {
        textAlign: "center",
        backgroundColor: theme.palette.secondary.main,
        boxShadow: "1px 2px 4px 1px rgba(0,0,0,0.05)",
        zIndex: "1000",
        display: "flex",
        flexWrap: "noWrap",
    },
    collectionContainer: {
        marginTop: "2.5vh",
    },
}));

export const Studio = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const exercises = useSelector((state) => state.data.exercises);
    const workouts = useSelector((state) => state.data.workouts);
    const programs = useSelector((state) => state.data.programs);
    const user = useSelector((state) => state.user.info);
    const [creator, setCreator] = React.useState("");
    const [exerciseSort, setExerciseSort] = React.useState(exercises);
    const [workoutSort, setWorkoutSort] = React.useState(workouts);
    const [programSort, setProgramSort] = React.useState(programs);
    const [filter, setFilter] = React.useState("difficulty");
    const [edit, setEdit] = React.useState(false);

    const displayCreator = (creator) => {
        switch (creator) {
            case "exercise":
                return <ExerciseForm />;

            case "workout":
                return <WorkoutForm />;

            case "program":
                return <ProgramForm />;

            default:
                return null;
        }
    };

    const handleFilter = (type, filter) => {
        setFilter(filter);
        if (type === "programs") {
            setProgramSort((prevState) => {
                return filter === "title"
                    ? [...sortObjsByTitle(programs)]
                    : [...sortObjsByDifficulty(programs)];
            });
        } else if (type === "workouts") {
            setWorkoutSort((prevState) => {
                return filter === "title"
                    ? [...sortObjsByTitle(workouts)]
                    : [...sortObjsByDifficulty(workouts)];
            });
        } else {
            setExerciseSort((prevState) => {
                return filter === "title"
                    ? [...sortObjsByTitle(exercises)]
                    : [...sortObjsByDifficulty(exercises)];
            });
        }

        return setFilter(filter);
    };

    const handleDelete = (docId) => {
        dispatch(deleteWorkout(docId));
    };

    const changeCreator = (selected) => {
        setCreator(selected);
    };

    const addToUserCollection = (exercise, userId) => {
        const docId = exercise.id;
        dispatch(addToCollection(docId, userId ? userId : user.id));
    };

    React.useEffect(() => {
        handleFilter("programs", filter);
        handleFilter("workouts", filter);
        return handleFilter("exercises", filter);
    }, [exercises, workouts, programs]);

    return (
        <Grid container className={classes.root}>
            {user.type === "trainer" && (
                <Grid container className={classes.creatorContainer}>
                    <Grid item xs={12} className={classes.buttonContainer}>
                        <Grid item xs={1}>
                            <Box style={{ marginLeft: "1vh" }}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            color="primary"
                                            checked={edit}
                                            onChange={() => setEdit(!edit)}
                                        />
                                    }
                                    label="Delete"
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={10} style={{ marginLeft: "2rem" }}>
                            <Button
                                name="exercise"
                                disabled={creator === "exercise"}
                                className={classes.button}
                                onClick={(e) => changeCreator("exercise")}
                            >
                                Exercise
                            </Button>
                            <Button
                                name="workout"
                                disabled={creator === "workout"}
                                className={classes.button}
                                onClick={(e) => changeCreator("workout")}
                            >
                                Workout
                            </Button>
                            <Button
                                name="program"
                                disabled={creator === "program"}
                                className={classes.button}
                                onClick={(e) => changeCreator("program")}
                            >
                                Program
                            </Button>
                        </Grid>
                        <Grid item xs={1} style={{ flexBasis: 0 }}>
                            <IconButton
                                size="small"
                                style={{ marginTop: "0.18rem" }}
                                onClick={() => setCreator("")}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                    {user.type === "trainer" && (
                        <Grid
                            item
                            xs={12}
                            style={{
                                flexDirection: "column",
                                overflow: "hidden",
                            }}
                        >
                            {displayCreator(creator)}
                        </Grid>
                    )}
                </Grid>
            )}
            <Grid container className={classes.collectionContainer}>
                <Grid item xs={12} style={{ width: "100%" }}>
                    <Grid
                        item
                        xs={12}
                        style={{ display: "flex", flexWrap: "noWrap" }}
                    >
                        <Typography variant="h4" style={{ margin: "1vh 0 " }}>
                            Programs
                        </Typography>
                        <Typography
                            style={{ marginLeft: "2vw", marginTop: "1vw" }}
                        >
                            Sort by:
                        </Typography>
                        <Button
                            onClick={() => {
                                handleFilter("programs", "title");
                            }}
                        >
                            Title
                        </Button>
                        <Button
                            onClick={() => {
                                handleFilter("programs", "difficulty");
                            }}
                        >
                            Difficulty
                        </Button>
                    </Grid>
                    <Grid item xs={12} style={{ width: "100%" }}>
                        {programs && (
                            <Carousel
                                array={programSort}
                                type="program"
                                size={3}
                            />
                        )}
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid
                        item
                        xs={12}
                        style={{ display: "flex", flexWrap: "noWrap" }}
                    >
                        <Typography variant="h4" style={{ margin: "1vh 0 " }}>
                            Workouts
                        </Typography>
                        <Typography
                            style={{ marginLeft: "2vw", marginTop: "1vw" }}
                        >
                            Sort by:
                        </Typography>
                        <Button
                            onClick={() => {
                                handleFilter("workouts", "title");
                            }}
                        >
                            Title
                        </Button>
                        <Button
                            onClick={() => {
                                handleFilter("workouts", "difficulty");
                            }}
                        >
                            Difficulty
                        </Button>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        style={{
                            width: "75vw",
                            display: "flex",
                            flexWrap: "wrap",
                        }}
                    >
                        {workoutSort.map((workout) => {
                            return (
                                <Grid
                                    item
                                    lg={5}
                                    md={9}
                                    style={{
                                        margin: "0% 4% 4% 4%",
                                        justifyContent: "center",
                                    }}
                                    key={workout.id}
                                >
                                    <Workout
                                        workout={workout}
                                        schedule={true}
                                        handleDelete={edit && handleDelete}
                                    />
                                </Grid>
                            );
                        })}
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid
                        item
                        xs={12}
                        style={{ display: "flex", flexWrap: "noWrap" }}
                    >
                        <Typography variant="h4" style={{ margin: "1vh 0" }}>
                            Exercises
                        </Typography>
                        <Typography
                            style={{ marginLeft: "2vw", marginTop: "1vw" }}
                        >
                            Sort by:
                        </Typography>
                        <Button
                            onClick={() => {
                                handleFilter("exercises", "title");
                            }}
                        >
                            Title
                        </Button>
                        <Button
                            onClick={() => {
                                console.log("difficulty");
                                handleFilter("exercises", "difficulty");
                            }}
                        >
                            Difficulty
                        </Button>
                    </Grid>
                    <Grid
                        container
                        style={{
                            width: "75vw",
                        }}
                    >
                        {exerciseSort.map((exercise, i) => {
                            return (
                                <Grid
                                    item
                                    lg={3}
                                    sm={5}
                                    xs={12}
                                    style={{
                                        marginBottom: "2%",
                                        margin: "0% 2% 2% 2%",
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                    key={exercise.id}
                                >
                                    <Exercise
                                        exercise={exercise}
                                        key={exercise.id}
                                        handleDelete={edit && handleDelete}
                                        schedule={user.type !== "trainer"}
                                        addExercise={
                                            user.type === "trainer" &&
                                            addToUserCollection
                                        }
                                    />
                                </Grid>
                            );
                        })}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};
