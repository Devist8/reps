import React from "react";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

//Icons
import { ReactComponent as Dumbbell } from "../icons/Dumbbell.svg";
import { ReactComponent as HalfDumbbell } from "../icons/half_dumbbell.svg";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexWrap: "noWrap",
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
        <Grid container direction="row" className={classes.root}>
            {wholes.map((x) => {
                return (
                    <Grid
                        item
                        key={x}
                        className={classes.iconContainer}
                        style={small ? { width: "1rem" } : { width: "1.35rem" }}
                    >
                        <Dumbbell style={small && { height: "50%" }} />
                    </Grid>
                );
            })}
            {half === 5 && (
                <Grid
                    item
                    className={classes.halfContainer}
                    style={small ? { width: "1rem" } : { width: "1.35rem" }}
                >
                    <HalfDumbbell style={small && { height: "31%" }} />
                </Grid>
            )}
            {edit && (
                <Grid item className={classes.fieldContainer}>
                    <TextField
                        name="difficulty"
                        value={difficulty}
                        size="small"
                        onChange={(e) => {
                            const data = {
                                name: e.target.name,
                                value: e.target.value,
                            };
                            editDifficulty(data);
                        }}
                        classes={{
                            root: classes.input,
                        }}
                        className={classes.difficultyField}
                    />
                </Grid>
            )}
        </Grid>
    );
};
