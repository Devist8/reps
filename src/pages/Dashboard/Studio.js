import React from "react";
import dayjs from "dayjs";

//functions
import { sortObjsByDifficulty, sortObjsByTitle } from "../../util/functions";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import {
    Grid,
    Button,
    Typography,
    TextField,
    IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

//Components
import { ExerciseForm } from "../../components/Exercises/ExerciseForm";
import { WorkoutForm } from "../../components/Workouts/WorkoutForm";
import { ProgramForm } from "../../components/Programs/ProgramForm";
import { Workout } from "../../components/Workouts/Workout";
import { Exercise } from "../../components/Exercises/Exercise";
import { ProgramCarousel } from "../../components/Programs/ProgramCarousel";

//Redux
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        minHeight: "563px",
        display: "flex",
    },
    creatorContainer: {
        boxShadow: "1px 2px 4px 1px rgba(0,0,0,0.1)",
        marginLeft: "1.5vw",
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
    const [creator, setCreator] = React.useState("program");
    const exercises = useSelector((state) => state.data.exercises);
    const workouts = useSelector((state) => state.data.workouts);
    const programs = useSelector((state) => state.data.programs);
    const [exerciseSort, setExerciseSort] = React.useState(exercises);
    const [workoutSort, setWorkoutSort] = React.useState(workouts);
    const [programSort, setProgramSort] = React.useState(programs);

    console.log(exerciseSort);

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

    const changeCreator = (selected) => {
        setCreator(selected);
    };

    const handleDateChange = () => {};

    return (
        <Grid container className={classes.root}>
            <Grid container className={classes.creatorContainer}>
                <Grid item xs={12} className={classes.buttonContainer}>
                    <Grid item xs={11} style={{ marginLeft: "2rem" }}>
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
                <Grid
                    item
                    xs={12}
                    style={{ flexDirection: "column", overflow: "hidden" }}
                >
                    {displayCreator(creator)}
                </Grid>
            </Grid>
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
                            onClick={() =>
                                setProgramSort((prevState) => [
                                    ...sortObjsByTitle(programs),
                                ])
                            }
                        >
                            Title
                        </Button>
                        <Button
                            onClick={() =>
                                setProgramSort((prevState) => [
                                    ...sortObjsByDifficulty(programs),
                                ])
                            }
                        >
                            Difficulty
                        </Button>
                    </Grid>
                    <Grid item xs={12} style={{ width: "100%" }}>
                        {programs && (
                            <ProgramCarousel
                                type="program"
                                array={programSort}
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
                            onClick={() =>
                                setWorkoutSort((prevState) => [
                                    ...sortObjsByTitle(workouts),
                                ])
                            }
                        >
                            Title
                        </Button>
                        <Button
                            onClick={() =>
                                setWorkoutSort((prevState) => [
                                    ...sortObjsByDifficulty(workouts),
                                ])
                            }
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
                                    />
                                    <TextField
                                        id="scheduleDate"
                                        type="date"
                                        defaultValue={dayjs(new Date()).format(
                                            "DD-MM-YYYY"
                                        )}
                                        onChange={handleDateChange}
                                        style={{ visibility: "hidden" }}
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
                            onClick={() =>
                                exerciseSort !== "title"
                                    ? setExerciseSort((prevState) => [
                                          ...sortObjsByTitle(exercises),
                                      ])
                                    : setExerciseSort(null)
                            }
                        >
                            Title
                        </Button>
                        <Button
                            onClick={() =>
                                exerciseSort !== "difficulty"
                                    ? setExerciseSort((prevState) => [
                                          ...sortObjsByDifficulty(exercises),
                                      ])
                                    : setExerciseSort(null)
                            }
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
                                        schedule
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
