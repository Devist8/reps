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
} from "@material-ui/core";

//Redux
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.primaryDark.main,
        maxWidth: "30vw",
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
}));

export const Timer = (props) => {
    const { exercise } = props;
    const dispatch = useDispatch();
    const classes = useStyles();
    const [seconds, setSeconds] = useState(0);
    const [time, setTime] = useState(null);
    let timer = 0;

    const count = () => {
        let timerSeconds = seconds + 1;
        console.log(timerSeconds);
        setSeconds((prevState) => prevState + 1);
    };

    const startTimer = () => {
        timer = setInterval(count, 1000);
    };

    let h = Math.floor(seconds / 3600);
    let m = Math.floor((seconds % 3600) / 60);
    let s = Math.ceil((seconds % 3600) % 60);

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
                        url={exercise && exercise.videoURL}
                        width="20vw"
                        height="18vh"
                        loop="true"
                        controls
                    />
                </Grid>
                <Typography>
                    {`${h < 10 ? `0${h}` : h} : ${m < 10 ? `0${m}` : m} : ${
                        s < 10 ? `0${s}` : s
                    }`}
                </Typography>
            </Grid>
            <Grid item xs={12} style={{ display: "flex", flexWrap: "wrap" }}>
                <Grid item xs={12}>
                    <Typography variant="overline">Set a time limit</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        style={{ width: "4vw" }}
                    />
                </Grid>
            </Grid>
            <Grid item xs={12} className={classes.buttons}>
                <Button variant="outlined" className={classes.button}>
                    Set timer
                </Button>
                <Button
                    variant="outlined"
                    onClick={startTimer}
                    className={classes.button}
                >
                    Start stopwatch
                </Button>
                <Button variant="outlined" className={classes.button}>
                    Mark Complete
                </Button>
            </Grid>
        </Grid>
    );
};
