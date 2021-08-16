import React from "react";
import { quotes } from "../../../../../util/static-data";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid, Avatar, Typography } from "@material-ui/core";

//Component
import { BubbleArray } from "../../../components/BubbleArray";

//Redux
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.primary.main,
        borderRadius: "15px",
        display: "flex",
        flexWrap: "noWrap",
        padding: "1.5vh 0",
    },
    bubbleArrays: {
        marginTop: "1vh",
    },
    avatar: {
        marginTop: "2vh",
        marginLeft: "1.5vw",
        marginRight: "1vw",
    },
}));

export const UserHeader = (props) => {
    const {} = props;
    const classes = useStyles();
    const user = useSelector((state) => state.user.info);
    const schedule = useSelector((state) => state.data.schedule);
    const today = dayjs(dayjs(Date.now()).format("L")).valueOf();
    const [scheduledWorkouts, setScheduledWorkouts] = React.useState([]);
    const [completedWorkouts, setCompletedWorkouts] = React.useState([]);
    const [muscles, setMuscles] = React.useState([]);
    const [equipment, setEquipment] = React.useState([]);

    React.useEffect(() => {
        const workouts = [];
        const complete = [];
        const muscles = [];
        const equipment = [];
        schedule.map((item) => {
            if (item.type === "program") {
                Object.values(item.workouts).map((week) => {
                    return week.map((workout) => {
                        today === workout.date && workouts.push(workout);
                        (today === workout.date) &
                            (workout.status === "complete") &&
                            complete.push(workout);
                    });
                });
            }

            if (item.type === "workouts") {
                workouts.push(item);
                item.status === "complete" && complete.push(item);
            }
            setScheduledWorkouts(workouts);
            setCompletedWorkouts(complete);
            workouts.map((workout) => {
                workout.muscles.map((muscle) => {
                    !muscles.includes(muscle) && muscles.push(muscle);
                });
                workout.equipment.map((item) => {
                    !equipment.includes(item) && equipment.push(item);
                });
            });
            setMuscles(muscles);
            setEquipment(equipment);
        });
    }, [schedule]);

    return (
        <Grid container className={classes.root}>
            <Grid item xs={1} className={classes.avatar}>
                <Avatar
                    src={user && user.imageURL}
                    style={{ width: "3.5vw", height: "3.5vw" }}
                />
            </Grid>
            <Grid item xs={10} className={classes.content}>
                {scheduledWorkouts.length > 0 ? (
                    <Box>
                        <Typography
                            variant="h6"
                            style={{ fontWeight: 700 }}
                        >{`${scheduledWorkouts.length} workout${
                            scheduledWorkouts.lenth > 1 ? "s" : ""
                        } scheduled today`}</Typography>
                        <Typography variant="h6" style={{ fontWeight: 700 }}>
                            {completedWorkouts.length === 0
                                ? "No workouts completed yet."
                                : `${completedWorkouts.length} workout${
                                      completedWorkouts.lenth > 1 ? "s" : ""
                                  } completed today`}
                        </Typography>
                    </Box>
                ) : (
                    <Box>
                        <Typography variant="h6" style={{ fontWeight: 700 }}>
                            No workouts scheduled today
                        </Typography>
                    </Box>
                )}
                <Grid container className={classes.bubbleArrays} spacing={1}>
                    {scheduledWorkouts.length > 0 ? (
                        <Box>
                            <Grid item xs={12}>
                                <Typography
                                    variant="h5"
                                    style={{ fontWeight: 600 }}
                                >
                                    Muscles
                                </Typography>
                                {muscles.length > 0 ? (
                                    <BubbleArray
                                        array={muscles}
                                        itemType="muscles"
                                        color="secondary"
                                    />
                                ) : (
                                    <Typography>Loadding...</Typography>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                <Typography
                                    variant="h5"
                                    style={{ fontWeight: 600 }}
                                >
                                    Equipment
                                </Typography>
                                {equipment.length > 0 ? (
                                    <BubbleArray
                                        array={equipment}
                                        itemType="equipment"
                                        color="secondary"
                                    />
                                ) : (
                                    <Typography>No equipment needed</Typography>
                                )}
                            </Grid>
                        </Box>
                    ) : (
                        <Grid item xs={12}>
                            <Typography
                                variant="h6"
                                style={{ fontWeight: 700 }}
                            >
                                Stay Motivated!
                            </Typography>
                            <Typography>
                                {
                                    quotes[
                                        Math.floor(
                                            Math.random() * quotes.length
                                        )
                                    ]
                                }
                            </Typography>
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </Grid>
    );
};
