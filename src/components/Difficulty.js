import React from "react";

//MUI
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Rating from "@material-ui/lab/Rating";

//Icons
import { ReactComponent as Dumbbell } from "../icons/Dumbbell.svg";
import { ReactComponent as HalfDumbbell } from "../icons/half_dumbbell.svg";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import AddIcon from "@material-ui/icons/Add";

const StyledRating = withStyles({
    iconFilled: {
        color: "#000",
    },
})(Rating);

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexWrap: "noWrap",
        width: "auto",
    },
    iconContainer: {
        textAlign: "center",
        marginTop: "0.3rem",
    },
    halfContainer: {
        marginTop: "0.3rem",
    },
    fieldContainer: {
        width: "2rem",
        display: "flex",
        marginLeft: "0.5rem",
    },
}));

export const Difficulty = (props) => {
    const classes = useStyles();
    const { edit, small, editDifficulty } = props;
    const difficulty = props.difficulty.toString();
    const range = (start, stop, step) =>
        Array.from(
            { length: (stop - start) / step + 1 },
            (_, i) => start + i * step
        );
    let wholes = range(1, parseInt(difficulty.split(".")[0]), 1);
    let half = difficulty.split(".")[1]
        ? parseInt(difficulty.split(".")[1])
        : 0;
    return (
        <Box>
            <StyledRating
                readOnly={!editDifficulty}
                name="customized-color"
                defaultValue={difficulty}
                onChange={(e, newValue) => {
                    e.target.name = "difficulty";
                    e.target.value = newValue;
                    editDifficulty(e);
                }}
                precision={0.5}
                icon={<FitnessCenterIcon fontSize="inherit" />}
            />
        </Box>
    );
};
