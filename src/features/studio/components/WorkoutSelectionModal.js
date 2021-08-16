import React from "react";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, GridList, ListSubheader } from "@material-ui/core";

//Components
import { WorkoutDisplay } from "./WorkoutDisplay";
import { Workout } from "../Workouts/Workout";

//Redux
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({}));

export const WorkoutSelectionModal = (props) => {
    const { selectedWorkouts, selectedWeek, addWorkout } = props;
    const classes = useStyles();
    const workouts = useSelector((state) => state.data.workouts);
    console.log(selectedWorkouts);
    console.log(selectedWeek);

    return (
        <Grid
            container
            style={{ backgroundColor: "#98d9f5", maxWidth: "800px" }}
        >
            <Grid item xs={5} style={{}}>
                <ListSubheader
                    color="default"
                    style={{ height: "5%", color: "black" }}
                >
                    Workouts
                </ListSubheader>
                <GridList
                    cols={1}
                    spacing={5}
                    style={{ margin: "1rem 1rem 1rem 1rem" }}
                >
                    <br />
                    <Grid item style={{ marginLeft: "4rem", height: "250px" }}>
                        {workouts.map((workout, index) => {
                            return (
                                <WorkoutDisplay
                                    workout={workout}
                                    style={{ margin: "3rem" }}
                                    addWorkout={addWorkout}
                                    selectedWeek={selectedWeek}
                                />
                            );
                        })}
                    </Grid>
                </GridList>
            </Grid>
            <Grid item xs={7} style={{}}>
                <ListSubheader
                    color="default"
                    style={{ height: "5%", color: "black" }}
                >
                    {selectedWeek}
                </ListSubheader>
                <GridList cols={2} style={{ margin: "1rem 1rem 1rem 1rem" }}>
                    <br />
                    <Grid
                        item
                        style={{
                            marginLeft: "2rem",
                            height: "250px",
                            width: "100%",
                        }}
                    >
                        {selectedWorkouts.length > 0 ? (
                            selectedWorkouts.map((selectedWorkout, index) => {
                                return <Workout workout={selectedWorkout} />;
                            })
                        ) : (
                            <Typography>Add some workouts</Typography>
                        )}
                    </Grid>
                </GridList>
            </Grid>
        </Grid>
    );
};
