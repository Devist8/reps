import React from "react";

//MUI
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";

//Components
import { Difficulty } from "../Difficulty";
import { ActionButton } from "../ActionButton";

const useStyles = makeStyles((theme) => ({
    cardRoot: {
        width: "23rem",
    },
    cardContent: {
        paddingBottom: "30px",
        height: "4.6rem",
    },
    title: {
        maxWidth: "80%",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "noWrap",
    },
}));

export const Exercise = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const { exercise, small } = props;
    return (
        <Card
            className={classes.cardRoot}
            style={
                small && {
                    width: "15rem",
                    height: "4.6rem",
                    borderRadius: "18px",
                    backgroundColor: theme.palette.secondary.light,
                }
            }
        >
            <Grid container>
                <Grid item xs={9} className={classes.cardContent}>
                    <CardContent
                        style={
                            small
                                ? { paddingTop: "10px" }
                                : { paddingTop: "10px", display: "flex" }
                        }
                    >
                        <Grid item xs={7}>
                            <Typography className={classes.title}>
                                {exercise.title}
                            </Typography>
                            <Difficulty
                                difficulty={exercise.difficulty}
                                small
                            />
                        </Grid>

                        {!small && (
                            <Grid
                                item
                                xs={4}
                                style={{
                                    marginTop: "1rem",
                                    marginLeft: "1rem",
                                }}
                            >
                                <Typography>3x5</Typography>
                            </Grid>
                        )}
                    </CardContent>
                </Grid>
                <Grid item xs={2} style={{ marginLeft: "1.8rem" }}>
                    <CardActions>
                        <ActionButton />
                    </CardActions>
                </Grid>
            </Grid>
        </Card>
    );
};
