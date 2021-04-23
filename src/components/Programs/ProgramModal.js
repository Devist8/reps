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
} from "@material-ui/core";

//Components
import { Difficulty } from "../Difficulty";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "50rem",
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
}));

export const ProgramModal = (props) => {
    const classes = useStyles();
    const { program } = props;
    return (
        <Grid container className={classes.root}>
            <Card style={{}}>
                <Grid item xs={12} style={{ height: "60%" }}>
                    <CardMedia
                        component="img"
                        src="/beachbody-original.jpg"
                        style={{ height: "60%", objectFit: "fill" }}
                    ></CardMedia>
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
                </Grid>
            </Card>
        </Grid>
    );
};
