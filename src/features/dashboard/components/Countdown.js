import React, { useState } from "react";
import ReactPlayer from "react-player";
import { Toolbar } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import dayjs from "dayjs";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.primaryDark.main,

        borderRadius: "20px",
        height: "95%",
        width: "95%",
        boxShadow: "inset 0px 0px 1000px #7DD9FF",
    },
    content: {
        width: "80%",
        display: "flex",
        margin: "auto",
        justifyContent: "center",
        textAlign: "center",
        padding: "40px 10px",
    },
    toolbar: {
        height: "5vh",
        display: "inline",
        flex: "none",
        alignItems: "end",
        width: "100%",
        justifyContent: "flex-end",
        alignContent: "flex-end",
    },
    time: {
        color: "#fff",
        fontSize: "10rem",
    },
    seconds: {
        fontSize: "5rem",
        marginBottom: "2.3vh",
        color: theme.palette.primary.light,
    },
}));
let countdownId;
export const Countdown = (props) => {
    const { time, workout, open, setOpen } = props;
    const classes = useStyles();
    const [seconds, setSeconds] = useState(parseFloat(time));
    const [showVideo, setShowVideo] = useState(false);
    const [index, setIndex] = useState(0);
    const [status, setStatus] = useState("");
    const [exercise, setExercise] = useState(workout[index]);
    //const [displayTime, setDisplayTime] = useState(0);

    const countdown = () => {
        setSeconds((prevState) => prevState - 0.01);
    };

    const startCountdown = () => {
        countdownId = setInterval(countdown, 10);
    };

    let m = ("0" + Math.floor(seconds / 60)).slice(-2);
    let s = ("0" + parseInt(seconds % 60)).slice(-2);
    let ms = ("0" + seconds * 100).slice(-2);
    let formattedTime = `${m}:${s}.${ms}`;

    //We're going to iterate through an array of workouts and
    //do a countdown for each time

    //Set state for current workout index
    //Have a function increase it each after each countdown

    let currentExercise = workout[index];

    React.useEffect(() => {
        if (status === "start") {
            startCountdown();
        }

        if (status === "stop") {
            clearInterval(countdownId);
        }
    }, [status]);

    React.useEffect(() => {
        if (seconds <= 0) {
            setStatus("stop");
        }
    }, [seconds]);

    console.log(workout[index]);
    return (
        <Grid container className={classes.root}>
            <Grid item xs={12} className={classes.toolbar}>
                <Toolbar style={{ justifyContent: "end", flex: "none" }}>
                    <Button onClick={() => setOpen(!open)}>
                        <Close />
                    </Button>
                </Toolbar>
            </Grid>
            <Grid
                container
                alignItems="center"
                justifyContent="center"
                alignContent="center"
                className={classes.content}
            >
                <Grid item xs={12}>
                    <Grid
                        item
                        xs={12}
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: "1vh",
                            flexWrap: "wrap",
                        }}
                    >
                        {showVideo ? (
                            <ReactPlayer
                                url={
                                    currentExercise && currentExercise.videoURL
                                }
                                loops="true"
                                control
                            />
                        ) : (
                            <div></div>
                        )}
                    </Grid>
                    <Grid
                        container
                        alignItems="flex-end"
                        justify="center"
                        alignContent="flex-end"
                    >
                        <Grid
                            item
                            xs={10}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                textAlign: "center",
                                alignContent: "center",
                            }}
                        >
                            <Typography className={classes.time}>
                                {seconds > 0 ? formattedTime : "00:00:00"}
                            </Typography>
                        </Grid>

                        <Grid
                            container
                            alignItems="center"
                            justifyContent="center"
                            style={{ marginTop: "1vh" }}
                        >
                            <Grid xs={2} style={{}}>
                                <Button
                                    variant="contained"
                                    onClick={() =>
                                        setShowVideo((prevState) => !prevState)
                                    }
                                >
                                    {`${
                                        showVideo ? "Hide Video" : "Show Video"
                                    }`}
                                </Button>
                            </Grid>
                            <Grid xs={2} style={{}}>
                                <Button
                                    variant="contained"
                                    onClick={() => setStatus("start")}
                                >
                                    Start
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};
