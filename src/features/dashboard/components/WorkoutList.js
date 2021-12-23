import React from "react";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import {
    Grid,
    CardActionArea,
    Typography,
    IconButton,
    Slide,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

//Components
import { Workout } from "./Workout";
import withWidth from "material-ui/utils/withWidth";

const useStyles = makeStyles((theme) => ({
    workoutListContainer: {
        backgroundColor: theme.palette.secondary.main,
        overflow: "hidden",
        display: "flex",
        flexWrap: "nowrap",
        flexDirection: "column",
        maxWidth: "750px",
    },
    weekTitle: {
        backgroundColor: theme.palette.primary.light,
        overflow: "hidden",
    },
    bottomBorder: {
        height: "25px",
        backgroundColor: theme.palette.primary.main,
        borderRadius: "0 0 4px 4px",
    },
    workoutContainer: {
        flexWrap: "wrap",
        flexDirection: "row",
        display: "flex",
    },
}));

export const WorkoutList = (props) => {
    const classes = useStyles();
    const { workouts, openModal, small, noButton, edit, handleDelete } = props;
    const [open, setOpen] = React.useState(null);
    const handleOpen = (e) => {
        e.persist();
        open !== e.target.selectedWeek
            ? setOpen(e.target.selectedWeek)
            : setOpen(null);
    };
    return (
        <Grid container className={classes.workoutListContainer}>
            {workouts.length > 0 &&
                workouts.map((week, index) => {
                    let weekIndex = index + 1;

                    return (
                        <Grid
                            container
                            style={{ overflow: "hidden" }}
                            key={`Week: ${weekIndex}`}
                        >
                            <Grid
                                item
                                xs={12}
                                className={classes.weekTitle}
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    zIndex: 1000,
                                }}
                            >
                                {
                                    //Workout List Header
                                }
                                <CardActionArea
                                    onClick={(e) => {
                                        e.target.selectedWeek = weekIndex;
                                        handleOpen(e);
                                    }}
                                >
                                    <Typography>{`Week: ${weekIndex}`}</Typography>
                                </CardActionArea>

                                {edit && (
                                    <IconButton
                                        size="small"
                                        style={{
                                            marginRight: "0.3rem",
                                            backgroundColor: "#BAEAFF",
                                            height: "18px",
                                            width: "18px",
                                        }}
                                        name={index}
                                        onClick={(e) => openModal(weekIndex)}
                                    >
                                        <AddIcon
                                            style={{
                                                fill: "black",
                                                height: "16px",
                                                width: "16px",
                                            }}
                                        />
                                    </IconButton>
                                )}
                            </Grid>

                            {
                                //Workouts
                            }
                            <Slide
                                in={weekIndex === open}
                                mountOnEnter
                                unmountOnExit
                                timeout={{
                                    enter:
                                        week.length > 0 &&
                                        week.length * 200 - index * 200,
                                    exit: 200 + index * 200,
                                }}
                            >
                                <Grid
                                    item
                                    xs={12}
                                    className={classes.workoutContainer}
                                >
                                    {week.length > 0 &&
                                        week.map((workout, index) => {
                                            console.log("weekIndex");
                                            console.log(weekIndex);
                                            console.log(open);
                                            console.log(
                                                weekIndex === parseInt(open)
                                            );
                                            return (
                                                <Slide
                                                    in={weekIndex === open}
                                                    mountOnEnter
                                                    unmountOnExit
                                                    key={workout.docId}
                                                    timeout={{
                                                        enter:
                                                            workout.exercises &&
                                                            workout.exercises
                                                                .length *
                                                                350 -
                                                                index * 350,
                                                        exit: 250 + index * 250,
                                                    }}
                                                    style={{
                                                        overflow: "hidden",
                                                    }}
                                                >
                                                    <Grid
                                                        item
                                                        lg={6}
                                                        md={12}
                                                        style={{
                                                            overflow: "hidden",
                                                            width: "100%",
                                                        }}
                                                    >
                                                        <Workout
                                                            workout={workout}
                                                            small={small}
                                                            handleDelete={
                                                                handleDelete
                                                            }
                                                        />
                                                    </Grid>
                                                </Slide>
                                            );
                                        })}
                                </Grid>
                            </Slide>
                        </Grid>
                    );
                })}
        </Grid>
    );
};
