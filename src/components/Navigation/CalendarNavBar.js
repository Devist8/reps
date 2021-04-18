import React from "react";
import Calendar from "react-calendar";
import "./Calendar.css";
import dayjs from "dayjs";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {},
    calendarContainer: {
        margin: "auto",
        marginTop: "5rem",
        width: "65%",
    },
    drawerPaper: {
        width: "300px",
        backgroundImage: `url(/right_nav.svg)`,
    },
    selectedTile: {
        backgroundColor: theme.palette.primary.main,
        borderRadius: "30px",
        padding: 0,
    },
    tile: {
        padding: 0,
    },
    rightDrawer: {
        borderLeft: "none",
    },
    dateDisplayContainer: {
        marginTop: "1rem",
    },
}));

export const DateHeader = (props) => {
    const { date } = props;
    const dayDate = dayjs(date).format("DD");
    const day = dayjs(date).format("ddd");
    console.log(date);

    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="h5" style={{ fontWeight: 700 }}>
                    {dayDate}
                </Typography>
                <Typography variant="h5">{day}</Typography>
            </Grid>
        </Grid>
    );
};

export const CalendarNavBar = () => {
    const classes = useStyles();
    const [selected, setSelected] = React.useState([new Date()]);
    const handleDateClick = (value) => {
        let data = [...selected];
        selected.find(
            (x) =>
                dayjs(x).format("DD-MM-YYYY") ===
                dayjs(value).format("DD-MM-YYYY")
        )
            ? (data = selected
                  .slice(0, selected.indexOf(value))
                  .concat(selected.slice(selected.indexOf(value)) + 1))
            : data.push(value);
        setSelected(data);
    };
    return (
        <AppBar style={{ zIndex: "1000", border: "none" }}>
            <Drawer
                variant="permanent"
                anchor="right"
                classes={{
                    paper: classes.drawerPaper,
                    paperAnchorDockedRight: classes.rightDrawer,
                }}
            >
                <Grid item xs={12} className={classes.calendarContainer}>
                    <Calendar
                        tileClassName={({ date, view }) => {
                            if (
                                selected.find(
                                    (x) =>
                                        dayjs(x).format("DD-MM-YYYY") ===
                                        dayjs(date).format("DD-MM-YYYY")
                                )
                            ) {
                                return classes.selectedTile;
                            } else {
                                return classes.tile;
                            }
                        }}
                        formatShortWeekday={(locale, date) =>
                            dayjs(date).format("dd")
                        }
                        prev2Label={null}
                        next2Label={null}
                        onClickDay={(value, event) => handleDateClick(value)}
                        className={classes.calendar}
                    />
                    <Grid item xs={12} className={classes.dateDisplayContainer}>
                        {selected.map((date) => {
                            console.log(date);
                            return (
                                <Grid
                                    item
                                    xs={12}
                                    className={classes.dateDisplay}
                                >
                                    <DateHeader date={date} />
                                </Grid>
                            );
                        })}
                    </Grid>
                </Grid>
            </Drawer>
        </AppBar>
    );
};
