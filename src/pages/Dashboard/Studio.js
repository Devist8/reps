import React from "react";

//MUI
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Grid, Button, Typography, TextField } from "@material-ui/core";

//Components
import { ExerciseForm } from "../../components/Exercises/ExerciseForm";
import { WorkoutForm } from "../../components/Workouts/WorkoutForm";
import { ProgramForm } from "../../components/Programs/ProgramForm";

const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: "0.5rem",
    },
    buttonContainer: {
        textAlign: "center",
        backgroundColor: theme.palette.secondary.main,
    },
}));

export const Studio = () => {
    const classes = useStyles();
    const [creator, setCreator] = React.useState("");

    const displayCreator = (creator) => {
        console.log(creator);
        switch (creator) {
            case "exercise":
                return <ExerciseForm />;
                break;
            case "workout":
                return <WorkoutForm />;
                break;
            case "program":
                return <ProgramForm />;
                break;
            default:
                return null;
        }
    };

    const changeCreator = (selected) => {
        setCreator(selected);
    };

    return (
        <Grid container className={classes.root}>
            <Grid item xs={12} className={classes.buttonContainer}>
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
            <Grid item xs={12}>
                {displayCreator(creator)}
            </Grid>
        </Grid>
    );
};
