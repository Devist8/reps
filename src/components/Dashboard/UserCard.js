import React from "react";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import {
    Box,
    Grid,
    Card,
    Avatar,
    CardMedia,
    CardActionArea,
    CardContent,
    CardActions,
    Typography,
    IconButton,
    Collapse,
    Divider,
} from "@material-ui/core";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";

const useStyles = makeStyles((theme) => ({
    avatarContainer: {
        minWidth: "10vw",
        height: "10vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    largeImg: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    contentContainer: {
        width: "20vw",
        padding: 5,
    },
    content: {
        width: "100%",
    },
    infoContainer: { display: "flex", textAlign: "center", flexWrap: "wrap" },
    button: {
        color: theme.palette.primary.main,
    },
}));

export const UserCard = (props) => {
    const { user } = props;
    const classes = useStyles();
    const [showInfo, setShowInfo] = React.useState(false);
    const [showGoals, setShowGoals] = React.useState(false);
    const [showAllergies, setShowAllergies] = React.useState(false);

    return (
        <Grid container>
            <Card>
                <CardMedia className={classes.avatarContainer}>
                    <Avatar src={user.imageURL} className={classes.largeImg} />
                </CardMedia>
                <CardContent className={classes.contentContainer}>
                    <Box
                        style={{
                            display: "flex",
                            flexWrap: "noWrap",
                            justifyContent: "center",
                        }}
                    >
                        <CardActionArea onClick={() => setShowInfo(!showInfo)}>
                            <Typography
                                className={classes.content}
                                style={{
                                    textAlign: "center",
                                }}
                            >
                                {user.displayName}
                            </Typography>
                        </CardActionArea>
                    </Box>
                    <Collapse in={showInfo}>
                        <Grid item xs={12} className={classes.infoContainer}>
                            <Typography className={classes.content}>
                                {user.height}
                            </Typography>
                            <Typography className={classes.content}>
                                {user.weight}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.extraInfo}>
                            <Box
                                style={{
                                    display: "flex",
                                    flexWrap: "noWrap",
                                    marginTop: "1vh",
                                }}
                            >
                                <Typography
                                    className={classes.content}
                                    variant="h6"
                                >
                                    Goals
                                </Typography>

                                <IconButton
                                    style={{ padding: 0 }}
                                    onClick={() => setShowGoals(!showGoals)}
                                >
                                    {showGoals ? (
                                        <KeyboardArrowUpIcon />
                                    ) : (
                                        <KeyboardArrowDownIcon />
                                    )}
                                </IconButton>
                            </Box>
                            <Divider style={{ width: "100%" }} />
                            <Collapse in={showGoals}>
                                {user.goals &&
                                    user.goals.map((goal) => {
                                        return (
                                            <Typography
                                                className={classes.content}
                                            >
                                                {goal}
                                            </Typography>
                                        );
                                    })}
                            </Collapse>
                            <Box
                                style={{
                                    display: "flex",
                                    flexWrap: "noWrap",
                                    marginTop: "1vh",
                                }}
                            >
                                <Typography
                                    className={classes.content}
                                    variant="h6"
                                    style={{ justifySelf: "flex-start" }}
                                >
                                    Allergies
                                </Typography>
                                <IconButton
                                    style={{ padding: 0 }}
                                    onClick={() =>
                                        setShowAllergies(!showAllergies)
                                    }
                                >
                                    {showGoals ? (
                                        <KeyboardArrowUpIcon />
                                    ) : (
                                        <KeyboardArrowDownIcon />
                                    )}
                                </IconButton>
                            </Box>
                            <Divider style={{ width: "100%" }} />
                            <Collapse in={showAllergies}>
                                {user.allergies ? (
                                    user.allergies.map((allergy) => {
                                        return (
                                            <Typography
                                                className={classes.content}
                                            >
                                                {allergy}
                                            </Typography>
                                        );
                                    })
                                ) : (
                                    <Typography className={classes.content}>
                                        None
                                    </Typography>
                                )}
                            </Collapse>
                        </Grid>
                    </Collapse>
                </CardContent>
                <CardActions
                    style={{
                        display: "flex",
                        flexWrap: "nowrap",
                        justifyContent: "flex-end",
                    }}
                >
                    <IconButton>
                        <PersonAddIcon className={classes.button} />
                    </IconButton>
                    <IconButton>
                        <ChatBubbleIcon className={classes.button} />
                    </IconButton>
                    <IconButton>
                        <FitnessCenterIcon className={classes.button} />
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    );
};
