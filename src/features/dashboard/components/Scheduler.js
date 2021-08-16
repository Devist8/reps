import React from "react";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import { Grid, TextField, Button } from "@material-ui/core";

//Redux
import { useDispatch } from "react-redux";
import { addToSchedule } from "../actions";

dayjs.extend(LocalizedFormat);

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "rgba(255, 255, 255, 1)",
        width: "20vw",
        height: "15vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        borderRadius: "8px",
        marginTop: "2.4vh",
        boxShadow:
            "0px 3px 1px -2px rgb(0 0 0 / 10%), 0px 2px 2px 0px rgb(0 0 0 / 8%), 0px 1px 5px 0px rgb(0 0 0 / 6%)",
    },
    dateSelect: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        marginBottom: "1vh",
    },
    scheduleBtn: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        marginTop: "1vh",
    },
    button: {
        backgroundColor: "rgba(255,255,255,1)",
        boxShadow:
            "0px 3px 1px -2px rgb(0 0 0 / 6%), 0px 2px 2px 0px rgb(0 0 0 / 4%), 0px 1px 5px 0px rgb(0 0 0 / 2%)",
    },
}));

export const Scheduler = (props) => {
    const { item, popperToggle } = props;
    const [selectedDate, setSelectedDate] = React.useState("");
    const dispatch = useDispatch();
    const classes = useStyles();

    const handleChange = (e) => {
        e.preventDefault();
        setSelectedDate(e.target.value);
    };

    const schedule = () => {
        const scheduleObject = {
            ...item,
        };
        console.log(selectedDate);
        const dateInMilliseconds = dayjs(selectedDate).valueOf();
        const yesterdayInMilliseconds = dayjs(
            dayjs(Date.now() - 86400000).format("L")
        ).valueOf();
        const today = new Date();
        console.log(dateInMilliseconds);
        item.type === "program"
            ? (scheduleObject.dateRange = [dateInMilliseconds])
            : (scheduleObject.date = dateInMilliseconds);

        scheduleObject.status = "pending";
        console.log(scheduleObject);
        popperToggle();
        dispatch(addToSchedule(scheduleObject));
    };

    return (
        <Grid container className={classes.root}>
            <Grid item xs={12} className={classes.dateSelect}>
                <TextField
                    type="date"
                    onChange={handleChange}
                    value={selectedDate}
                />
            </Grid>
            <Grid item xs={12} className={classes.scheduleBtn}>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={schedule}
                    className={classes.button}
                    classes={{ outlinedPrimary: classes.outlined }}
                >
                    Schedule
                </Button>
            </Grid>
        </Grid>
    );
};
