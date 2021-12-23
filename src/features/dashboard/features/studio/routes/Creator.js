import React from "react";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

//Components
import { ExerciseForm, WorkoutForm, ProgramForm } from "..";
import { Workout } from "../../../components/Workout";
import { Exercise } from "../../../components/Exercise";
import { Carousel } from "../../../components/Carousel";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { addToCollection, deleteWorkout, getWorkoutId } from "../actions";

const useStyles = makeStyles((theme) => ({}));

export const Creator = (props) => {
    const {} = props;
    const dispatch = useDispatch();
    const creator = props.match.params.creatorType;
    const classes = useStyles();
    console.log(props);
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
    React.useEffect(() => {
        dispatch(getWorkoutId());
    }, []);

    return (
        <Grid
            container
            style={{
                display: "flex",
                justifyContent: "center",
            }}
        >
            {displayCreator(creator)}
        </Grid>
    );
};
