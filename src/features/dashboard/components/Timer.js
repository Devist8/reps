import React, { useState } from "react";
import ReactPlayer from "react-player";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import {
    Grid,
    Box,
    Typography,
    Button,
    TextField,
    IconButton,
    Divider,
} from "@material-ui/core";

//Redux
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.primaryDark.main,
        maxWidth: "450px",
        padding: "40px 10px",
        justifyContent: "center",
        textAlign: "center",
        borderRadius: "20px",
    },
    buttons: { marginTop: "2vh" },
    button: {
        maxWidth: "100px",
        margin: "0 1vw",
        fontSize: "0.8rem",
        color: theme.palette.secondary.main,
        borderColor: theme.palette.secondary.main,
    },
    selected: {
        color: "#4CCAFF",
    },
}));

let reps = 5;
let timerId;
export const Timer = (props) => {
    const { exercise } = props;
    const dispatch = useDispatch();
    const classes = useStyles();
    const exercises = useSelector((state) => state.data.exercises);
    const [seconds, setSeconds] = useState(0);
    const [currentRep, setCurrentRep] = useState(0);
    const [completedReps, setCompletedReps] = useState(
        Array(reps).fill("00 : 00 : 00")
    );
    const [status, setStatus] = useState("");

    const count = () => {
        setSeconds((prevState) => prevState + 1);
    };

    const startTimer = () => {
        timerId = setInterval(count, 1000);
    };

    let h = Math.floor(seconds / 3600);
    let m = Math.floor((seconds % 3600) / 60);
    let s = Math.ceil((seconds % 3600) % 60);
    let formattedTime = `${h < 10 ? `0${h}` : h} : ${m < 10 ? `0${m}` : m} : ${
        s < 10 ? `0${s}` : s
    }`;

    const completeRep = () => {
        let clone = completedReps;
        clone[currentRep] = formattedTime;
        setStatus("stop");
        setCompletedReps(clone);
        setCurrentRep(currentRep + 1);
    };

    const resetTimer = () => {
        setSeconds(0);
        setCompletedReps(Array(reps).fill("00 : 00 : 00"));
        setStatus("");
        setCurrentRep(0);
    };

    React.useEffect(() => {
        if (status === "start") {
            startTimer();
        }
        if (status === "stop") {
            clearInterval(timerId);
        }
    }, [status]);

    return (
        <Grid
            container
            alignItems="center"
            justify="center"
            alignContent="center"
            className={classes.root}
        >
            <Grid item xs={12} className={classes.timeDisplay}>
                <Grid
                    item
                    xs={12}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "1vh",
                    }}
                >
                    <ReactPlayer
                        url={
                            exercise
                                ? exercise.videoURL
                                : exercises[3] && exercises[3].videoURL
                        }
                        width="20vw"
                        height="18vh"
                        loop="true"
                        controls
                    />
                </Grid>
                <Typography>{formattedTime}</Typography>
            </Grid>
            <Grid item xs={12} style={{ display: "flex", flexWrap: "wrap" }}>
                <Grid item xs={12}>
                    <Button
                        variant="outlined"
                        className={classes.button}
                        style={{ maxWidth: "none" }}
                        onClick={() => completeRep()}
                    >
                        Mark rep complete
                    </Button>
                </Grid>
            </Grid>
            <Grid item xs={12} className={classes.buttons}>
                <Button
                    variant="outlined"
                    onClick={() => setStatus("start")}
                    className={classes.button}
                    disabled={status === "start"}
                >
                    Start
                </Button>
                <Button
                    variant="outlined"
                    className={classes.button}
                    onClick={resetTimer}
                >
                    Stop
                </Button>
            </Grid>
            <Divider style={{ width: "100%", margin: "5vh 0 2vh 0" }} />
            <Grid container>
                {completedReps.map((rep, i) => {
                    return (
                        <Grid container>
                            <Grid item xs={2} style={{ textAlign: "start" }}>
                                <Typography
                                    className={
                                        i === currentRep && classes.selected
                                    }
                                >{`Rep ${i + 1}`}</Typography>
                            </Grid>
                            <Grid item xs={10} style={{ textAlign: "end" }}>
                                <Typography
                                    className={
                                        i === currentRep && classes.selected
                                    }
                                >
                                    {i === currentRep ? formattedTime : rep}
                                </Typography>
                            </Grid>
                        </Grid>
                    );
                })}
            </Grid>
            <Grid
                item
                xs={12}
                style={{ display: "flex", justifyContent: "center" }}
            >
                <Button variant="outlined" className={classes.button}>
                    Submit
                </Button>
            </Grid>
        </Grid>
    );
};
