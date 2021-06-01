import React from "react";

//React Router
import { useLocation } from "react-router-dom";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import {
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    Button,
    Modal,
} from "@material-ui/core";
import ScheduleIcon from "@material-ui/icons/Schedule";

//Components
import { Difficulty } from "../Difficulty";
import { ProgramModal } from "./ProgramModal";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "17vw",
        minWidth: "200px",
        maxWidth: "300px",
        overflow: "hidden",
        backgroundColor: theme.palette.primary.main,
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        borderRadius: "8px",
    },
    amounts: {
        backgroundColor: theme.palette.primary.main,
    },
    media: {
        width: "100%",
        height: "17vh",
    },
    content: {
        padding: "8px",
    },
}));

export const ProgramCard = (props) => {
    const { program } = props;
    const [modalOpen, setModalOpen] = React.useState(false);
    const classes = useStyles();
    const location = useLocation();

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <Grid container>
            <Card className={classes.root}>
                <CardMedia
                    image={"/beachbody-original.jpg"}
                    className={classes.media}
                />
                <CardContent className={classes.content}>
                    <Typography
                        variant="h5"
                        style={{ fontWeight: 700, fontSize: "1.3rem" }}
                    >
                        {program.title}
                    </Typography>
                    <Difficulty difficulty={program.difficulty} small />
                    <Grid container className={classes.amounts}>
                        <Grid item xs={12}>
                            <Typography
                                variant="body1"
                                style={{ fontSize: "0.9rem" }}
                            >
                                {`${
                                    Object.keys(program.workouts).length
                                } weeks`}
                            </Typography>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <Typography
                                variant="body1"
                                style={{ fontSize: "0.9rem" }}
                            >{`${program.exerciseCount} exercises`}</Typography>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <Typography
                                variant="body1"
                                style={{ fontSize: "0.9rem" }}
                            >{`${program.workoutCount} workouts`}</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        padding: 0,
                    }}
                >
                    <Button
                        style={{ color: "white" }}
                        onClick={() => setModalOpen(true)}
                    >
                        See More
                    </Button>
                </CardActions>
            </Card>
            <Grid
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                    margin: "auto",
                }}
            >
                <Modal
                    open={modalOpen}
                    onClose={() => closeModal()}
                    onBackdropClick={() => closeModal()}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        alignContent: "center",
                        margin: "auto",
                        overflowY: "scroll",
                    }}
                >
                    <ProgramModal program={program} closeModal={closeModal} />
                </Modal>
            </Grid>
        </Grid>
    );
};