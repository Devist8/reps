import React, { Component } from "react";
import axios from "axios";

//Mui
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

export class home extends Component {
  state = {
    exercises: null,
    defaultUser: {
      username: "user",
      repXP: 0,
      profileImage:
        "https://firebasestorage.googleapis.com/v0/b/reps-699b0.appspot.com/o/98062229209.jpg/?alt=media",
    },
    defaultExercises: [
      {
        activity: "Push-ups",
        repXP: 20,
        reps: "10 x 3",
        duration: 30,
        difficulty: "Beginner",
        musclesTargeted: ["chest", "biceps"],
      },
      {
        activity: "sit-ups",
        repXP: 20,
        reps: "10 x 3",
        duration: 30,
        difficulty: "Beginner",
        musclesTargeted: ["abs", "legs"],
      },
      {
        activity: "Push-ups",
        repXP: 20,
        reps: "10 x 3",
        duration: 30,
        difficulty: "Beginner",
        musclesTargeted: ["chest", "biceps"],
      },
    ],
  };

  componentDidMount() {
    axios
      .get("/exercises")
      .then((res) => {
        this.setState({
          exercises: res.data,
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    let featuredExercises = this.state.exercises ? (
      this.state.exercises.map((exercise) => <p>{exercise.activity}</p>)
    ) : (
      <p>Loading...</p>
    );
    return (
      <Grid container>
        <Grid item sm={8}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table" size="medium">
              <TableHead>
                <TableRow>
                  <TableCell>Exercise</TableCell>
                  <TableCell align="right">Difficulty</TableCell>
                  <TableCell align="right">Reps</TableCell>
                  <TableCell align="right">Time</TableCell>
                  <TableCell align="right">Muscles Targeted</TableCell>
                  <TableCell align="right">RepXP</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.defaultExercises.map((exercise) => (
                  <TableRow key={exercise.activity}>
                    <TableCell scope="row" component="th">
                      {exercise.activity}
                    </TableCell>
                    <TableCell align="right">{exercise.difficulty}</TableCell>
                    <TableCell align="right">{exercise.reps}</TableCell>
                    <TableCell align="right">{exercise.duration} min</TableCell>
                    <TableCell align="right">
                      {exercise.musclesTargeted}
                    </TableCell>
                    <TableCell align="right">{exercise.repXP}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    );
  }
}

export default home;
