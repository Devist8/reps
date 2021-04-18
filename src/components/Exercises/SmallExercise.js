import React from "react";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

//Components
import { Difficulty } from "../Difficulty";

const useStyles = makeStyles((theme) => ({}));

export const SmallExercise = (props) => {
    const classes = useStyles();
    const { exercise } = props;
    return (
        <Card>
            <CardContent>
                <Typography>{exercise.title}</Typography>
                <Difficulty difficulty={exercise.difficulty} small />
                <Typography>{exercise.scheduled.duration}</Typography>
            </CardContent>
        </Card>
    );
};
