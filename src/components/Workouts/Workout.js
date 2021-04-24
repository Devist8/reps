import React from "react";

//MUI
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";

//Components
import { Difficulty } from "../Difficulty";
import { ActionButton } from "../ActionButton";
import { Exercise } from "../Exercises/Exercise";

const useStyles = makeStyles((theme) => ({
    cardRoot: {
        width: "25rem",
        backgroundColor: theme.palette.secondary.main,
        overflow: "hidden",
        zIndex: 800,
        height: "5rem",
    },
    imageContainer: {
        width: "5rem",
    },
    cardContent: {
        padding: 0,
    },
}));

export const Workout = (props) => {
    const theme = useTheme();
    const classes = useStyles();
    const { workout } = props;
    const [open, setOpen] = React.useState(false);
    const handleOpen = (e) => {
        setOpen((prevState) => !prevState);
    };
    return (
        <Grid
            container
            style={{
                overflow: "hidden",
                backgroundColor: theme.palette.secondary.light,
                width: "25rem",

                borderRadius: "4px",
            }}
        >
            <Card className={classes.cardRoot}>
                <Grid container>
                    <CardMedia
                        image={workout.imageURL}
                        className={classes.imageContainer}
                    />

                    <Grid item xs={7} className={classes.cardContent}>
                        <CardActionArea
                            onClick={(e) => handleOpen(e)}
                            style={{ height: "100%" }}
                        >
                            <CardContent
                                style={{
                                    paddingTop: "10px",
                                    height: "100%",
                                    margin: "auto",
                                }}
                            >
                                <Typography style={{ marginBottom: "0.6rem" }}>
                                    {workout.title}
                                </Typography>
                                <Difficulty difficulty={workout.difficulty} />
                            </CardContent>
                        </CardActionArea>
                    </Grid>
                    <Grid item xs={2}>
                        <CardActions>
                            <ActionButton />
                        </CardActions>
                    </Grid>
                </Grid>
            </Card>

            <Grid container>
                <List style={{ padding: 0, paddingLeft: "1rem" }}>
                    {workout.exercises.map((exercise, index) => {
                        return (
                            <Slide
                                in={open}
                                mountOnEnter
                                unmountOnExit
                                timeout={{
                                    enter:
                                        workout.exercises.length * 350 -
                                        index * 350,
                                    exit: 150 + index * 150,
                                }}
                            >
                                <ListItem
                                    style={
                                        workout.exercises.length === index + 1
                                            ? {
                                                  marginBottom: "0.5rem",
                                                  padding: 0,
                                                  backgroundColor: "#fff",
                                                  marginTop: "0.5rem",
                                                  borderRadius: "4px",
                                              }
                                            : {
                                                  padding: 0,
                                                  backgroundColor: "#fff",
                                                  marginTop: "0.5rem",
                                                  borderRadius: "4px",
                                              }
                                    }
                                >
                                    <Exercise
                                        exercise={exercise}
                                        style={{ marginLeft: "1rem" }}
                                    />
                                </ListItem>
                            </Slide>
                        );
                    })}
                </List>
            </Grid>
        </Grid>
    );
};
