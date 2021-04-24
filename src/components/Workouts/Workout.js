import React from "react";

//MUI
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
    Grid,
    Card,
    CardContent,
    CardActionArea,
    CardActions,
    CardMedia,
    List,
    ListItem,
    Typography,
    Slide,
    TextField,
} from "@material-ui/core";

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
    const { workout, edit } = props;
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
                        style={{ objectFit: "fill" }}
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
                                {!edit ? (
                                    <Typography
                                        style={{ marginBottom: "0.6rem" }}
                                    >
                                        {workout.title}
                                    </Typography>
                                ) : (
                                    <TextField
                                        name="title"
                                        id="title"
                                        aria-label={workout.title}
                                        aria-required="true"
                                        value={workout.title}
                                    />
                                )}

                                <Difficulty difficulty={workout.difficulty} />
                            </CardContent>
                        </CardActionArea>
                    </Grid>
                    <Grid item xs={2}>
                        <CardActions>
                            <ActionButton edit={edit} />
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
