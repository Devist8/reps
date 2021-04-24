import React from "react";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Grid,
    Typography,
    TextField,
    Button,
    Slide,
} from "@material-ui/core";

//Components
import { Difficulty } from "../Difficulty";
import { Workout } from "../Workouts/Workout";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "50rem",
        overflow: "hidden",
    },
    content: {
        backgroundColor: theme.palette.primary.main,
    },
    button: {
        margin: "auto 0 0 2rem",
        marginTop: "2rem",
        marginRight: "2rem",
        color: "#000",
    },
    stats: {
        marginLeft: "1.8rem",
        textAlign: "right",
    },
    workoutListContainer: {
        backgroundColor: theme.palette.secondary.main,
        overflow: "hidden",
    },
    weekTitle: {
        backgroundColor: theme.palette.primary.light,
        overflow: "hidden",
    },
    bottomBorder: {
        height: "25px",
        backgroundColor: theme.palette.primary.main,
        borderRadius: "0 4px",
    },
    workoutContainer: {
        flexWrap: "wrap",
        flexDirection: "row",
        display: "flex",
    },
}));

export const WorkoutList = (props) => {
    const classes = useStyles();
    const { workouts } = props;
    const [open, setOpen] = React.useState(false);
    const handleOpen = (e) => {
        setOpen((prevState) => !prevState);
    };
    return (
        <Grid container className={classes.workoutListContainer}>
            {Object.entries(workouts).map((week, index) => {
                return (
                    <Grid container>
                        <Grid item xs={12} className={classes.weekTitle}>
                            <Button onClick={(e) => handleOpen(e)}>
                                <Typography>{week[0]}</Typography>
                            </Button>
                        </Grid>
                        <Slide
                            in={open}
                            mountOnEnter
                            unmountOnExit
                            timeout={{
                                enter: week[1].length * 350 - index * 350,
                                exit: 150 + index * 150,
                            }}
                        >
                            <Grid
                                item
                                xs={12}
                                className={classes.workoutContainer}
                            >
                                {week[1].map((workout, index) => {
                                    return (
                                        <Grid item xs={6}>
                                            <Workout workout={workout} />
                                        </Grid>
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

export const ProgramModal = (props) => {
    const classes = useStyles();
    const { program } = props;
    console.log(program.workouts);
    return (
        <Grid container className={classes.root}>
            <Card elevation={2} style={{}}>
                <Grid item xs={12} style={{ height: "250px" }}>
                    <CardMedia
                        component="img"
                        src="/beachbody-original.jpg"
                        style={{ objectFit: "fill", height: "250px" }}
                    />
                </Grid>
                <CardContent className={classes.content}>
                    <Grid container>
                        <Grid item xs={9}>
                            <Typography
                                variant="h4"
                                style={{ fontWeight: 600 }}
                            >
                                {program.title}
                            </Typography>
                            <Difficulty difficulty={program.difficulty} />
                            <Typography
                                style={{
                                    marginTop: "1rem",
                                    fontWeight: 700,
                                }}
                                variant="h6"
                            >
                                Description
                            </Typography>
                            <Typography>{program.description}</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography className={classes.stats}>
                                5 weeks
                            </Typography>
                            <Typography className={classes.stats}>
                                20 workouts
                            </Typography>
                            <Typography className={classes.stats}>
                                50 exercises
                            </Typography>
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                            >
                                Add Program
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>

                <WorkoutList workouts={program.workouts} />
                <div className={classes.bottomBorder} />
            </Card>
        </Grid>
    );
};
