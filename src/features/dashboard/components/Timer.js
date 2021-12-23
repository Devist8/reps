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
    Modal,
} from "@material-ui/core";

//Redux
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.primaryDark.main,

        padding: "40px 10px",
        justifyContent: "center",
        textAlign: "center",
        borderRadius: "20px",
        height: "95%",
        width: "95%",
        boxShadow: "inset 0px 0px 1000px #7DD9FF",
    },
    content: {
        width: "80%",
    },
    time: {
        color: "#fff",
        fontSize: "5.5rem",
    },
    seconds: {
        fontSize: "2.5rem",
        marginBottom: "2.3vh",
        color: theme.palette.primary.light,
    },
    reps: {
        margin: "auto",
        width: "50%",
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

let reps = 2;
let timerId;
export const Timer = (props) => {
    const { exercise, countDown } = props;
    const dispatch = useDispatch();
    const classes = useStyles();
    const exercises = useSelector((state) => state.studio.exercises);
    const [seconds, setSeconds] = useState(0);
    const [currentRep, setCurrentRep] = useState(0);
    const [completedReps, setCompletedReps] = useState(
        Array(reps).fill("00 : 00 : 00")
    );
    const [status, setStatus] = useState("");

    const count = () => {
        setSeconds((prevState) => prevState + 0.01);
    };

    const startTimer = () => {
        timerId = setInterval(count, 10);
    };

    let m = ("0" + Math.floor(seconds / 60)).slice(-2);
    let s = ("0" + parseInt(seconds % 60)).slice(-2);
    let ms = ("0" + seconds * 100).slice(-2);
    let formattedTime = `${m}:${s}.${ms}`;

    let displayTime = new Date(seconds).toISOString().slice(11, -1);

    const completeRep = () => {
        let clone = completedReps;
        clone[currentRep] = displayTime;
        setStatus("pause");
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
            if (currentRep >= completedReps.length) {
                let clone = completedReps;
                clone[currentRep] = displayTime;
                setCompletedReps(clone);
            }

            startTimer();
        }
        if (status === "pause") {
            clearInterval(timerId);
        }
        if (status === "stop") {
            resetTimer();
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
            <Grid item className={classes.content}>
                <Grid item xs={12}>
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
                    <Grid
                        container
                        alignItems="flex-end"
                        justify="center"
                        alignContent="center"
                    >
                        <Grid
                            xs={10}
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                textAlign: "center",
                                alignContent: "center",
                                alignItems: "flex-end",
                            }}
                        >
                            <Typography className={classes.time}>
                                {formattedTime.split(".")[0]}
                            </Typography>
                            <Typography className={classes.seconds}>
                                {formattedTime.split(".")[1]}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid
                    item
                    xs={12}
                    style={{ display: "flex", flexWrap: "wrap" }}
                >
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
                        onClick={() => setStatus("stop")}
                    >
                        Stop
                    </Button>
                </Grid>

                <Grid container className={classes.reps}>
                    <Divider style={{ width: "100%", margin: "5vh 0 2vh 0" }} />
                    {completedReps.map((rep, i) => {
                        return (
                            <Grid container>
                                <Grid
                                    item
                                    xs={2}
                                    style={{ textAlign: "start" }}
                                >
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
                                        {i === currentRep ? displayTime : rep}
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
        </Grid>
    );
};
