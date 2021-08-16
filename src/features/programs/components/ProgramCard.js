import React from "react";

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
    IconButton,
    Popper,
    ClickAwayListener,
} from "@material-ui/core";
import ScheduleIcon from "@material-ui/icons/Schedule";
import ShareIcon from "@material-ui/icons/Share";
import DeleteIcon from "@material-ui/icons/Delete";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@material-ui/lab";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

//Components
import { Difficulty } from "../Difficulty";
import { ProgramModal } from "./ProgramModal";
import { Scheduler } from "../Scheduler";
import { AddToStoreModal } from "../Store/AddToStoreModal";

//react-redux
import { useSelector, useDispatch } from "react-redux";
import { deleteWorkout } from "../../redux/actions/dataActions";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "17vw",

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

    speedDialBtn: {
        backgroundColor: theme.palette.secondary.main,
        width: "2.5vw",
        height: "2.5vw",
    },
}));

export const ProgramCard = (props) => {
    const { program } = props;
    const userInfo = useSelector((state) => state.user.info);
    const [modalOpen, setModalOpen] = React.useState(false);
    const dispatch = useDispatch();
    const [storeModal, setStoreModal] = React.useState(false);
    const [popperOpen, setPopperOpen] = React.useState(false);
    const [speedDial, setSpeedDial] = React.useState(false);
    const [anchor, setAnchor] = React.useState(null);
    const classes = useStyles();

    const closeModal = () => {
        setModalOpen(false);
    };

    const closePopper = () => {
        setPopperOpen(false);
    };

    const scheduleClick = (e) => {
        setAnchor(e.currentTarget);
        setPopperOpen(!popperOpen);
    };

    const handleDelete = (docId) => {
        dispatch(deleteWorkout(docId));
    };

    return (
        <Grid container>
            <Card className={classes.root}>
                <CardMedia image={program.imageURL} className={classes.media} />
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

                        padding: 0,
                    }}
                >
                    <Grid item xs={12}>
                        <SpeedDial
                            ariaLabel="ProgramSpeedDial"
                            icon={<SpeedDialIcon />}
                            open={speedDial}
                            onOpen={() => setSpeedDial(true)}
                            onClose={() => setSpeedDial(false)}
                            direction="left"
                            classes={{
                                root: classes.speedDialRoot,
                                fab: classes.speedDialBtn,
                            }}
                            style={{ marginRight: "0.5vw" }}
                        >
                            <SpeedDialAction
                                key={"schedule2"}
                                icon={<ScheduleIcon />}
                                onClick={scheduleClick}
                                tooltipPlacement={"top"}
                                tooltipTitle="schedule"
                            />

                            <SpeedDialAction
                                key={"Send to user"}
                                icon={<ShareIcon />}
                                onClick={scheduleClick}
                                tooltipPlacement={"top"}
                                tooltipTitle="Send to user"
                                style={{ width: "2vw", height: "2vw" }}
                            />
                            {userInfo.type === "trainer" && (
                                <SpeedDialAction
                                    key={"Delete"}
                                    icon={<DeleteIcon />}
                                    onClick={() => handleDelete(program.id)}
                                    tooltipPlacement={"top"}
                                    tooltipTitle="Delete"
                                />
                            )}
                        </SpeedDial>
                        <Popper
                            open={popperOpen}
                            anchorEl={anchor}
                            style={{ zIndex: "1000" }}
                        >
                            <Scheduler
                                id={program.id}
                                item={program}
                                popperToggle={closePopper}
                            />
                        </Popper>
                    </Grid>
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
                <Modal
                    open={storeModal}
                    onClose={() => setStoreModal(false)}
                    onBackdropClick={() => closeModal()}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        alignContent: "center",
                    }}
                >
                    <AddToStoreModal item={program} />
                </Modal>
            </Grid>
        </Grid>
    );
};
