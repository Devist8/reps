import React from "react";

//MUI
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
    Grid,
    Typography,
    TextField,
    Switch,
    Button,
    ButtonGroup,
} from "@material-ui/core";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { updateUserData } from "../../../redux/actions/userActions";

const useStyles = makeStyles((theme) => ({
    name: {
        flexGrow: "0.1",
    },
    value: {
        width: "3vw",
        paddingLeft: "2vw",
    },
}));

export const Settings = (props) => {
    const {} = props;
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.info);
    const [userDetails, setUserDetails] = React.useState({
        preferredDays: user.preferredDays ? [...user.preferredDays] : [],
        restLength: user.restLength ? user.restLength : 0,
        darkMode: user.darkMode ? user.darkMode : false,
    });

    const handleArrayChange = (e) => {
        const preferredDays = [...userDetails.preferredDays, e.target.value];
        setUserDetails((prevState) => ({
            ...prevState,
            preferredDays: preferredDays,
        }));
        console.log(userDetails);
        return dispatch(
            updateUserData({
                preferredDays: [...userDetails.preferredDays, e.target.value],
            })
        );
    };

    const handleChange = (e) => {
        e.persist();
        setUserDetails((prevState) => ({
            ...prevState,
            [e.target.name]:
                e.target.name === "darkMode"
                    ? !userDetails.darkMode
                    : e.target.value,
        }));

        return dispatch(
            updateUserData({
                [e.target.name]:
                    e.target.name === "darkMode"
                        ? !userDetails.darkMode
                        : e.target.value,
            })
        );
    };
    return (
        <Grid container>
            <Grid item xs={12} style={{ padding: "25px" }}>
                <Typography variant="h4">Settings</Typography>
            </Grid>
            <Grid
                item
                xs={12}
                style={{
                    padding: "25px",
                    display: "flex",
                    flexWrap: "nowrap",
                    paddingBottom: "0",
                }}
            >
                <Typography variant="overline">Rest Length</Typography>

                <TextField
                    name="restLength"
                    value={userDetails.restLength}
                    type="number"
                    className={classes.value}
                    onChange={handleChange}
                />
            </Grid>
            <Grid
                item
                xs={12}
                style={{
                    padding: "25px",
                    display: "flex",
                    flexWrap: "nowrap",
                    paddingBottom: "0",
                }}
            >
                <Typography variant="overline" style={{ marginRight: "2vw" }}>
                    Dark Mode
                </Typography>

                <Switch
                    checked={userDetails.darkMode}
                    onChange={(e) => {
                        e.target.value = !user.darkMode;
                        return handleChange(e);
                    }}
                    name="darkMode"
                />
            </Grid>
            <Grid
                item
                xs={4}
                style={{
                    padding: "25px",
                    display: "flex",
                    flexWrap: "wrap",
                    paddingBottom: "0",
                }}
            >
                <Grid item xs={12}>
                    <Typography
                        variant="overline"
                        style={{ marginRight: "2vw" }}
                    >
                        Dark Mode
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <ButtonGroup color="primary">
                        <Button
                            value="Su"
                            style={
                                userDetails.preferredDays.includes("Su")
                                    ? {
                                          backgroundColor:
                                              theme.palette.secondary.main,
                                      }
                                    : { backgroundColor: "white" }
                            }
                            onClick={handleArrayChange}
                        >
                            Su
                        </Button>
                        <Button
                            value="M"
                            style={
                                userDetails.preferredDays.includes("M")
                                    ? {
                                          backgroundColor:
                                              theme.palette.secondary.main,
                                      }
                                    : { backgroundColor: "white" }
                            }
                            onClick={handleArrayChange}
                        >
                            M
                        </Button>
                        <Button
                            value="T"
                            style={
                                userDetails.preferredDays.includes("T")
                                    ? {
                                          backgroundColor:
                                              theme.palette.secondary.main,
                                      }
                                    : { backgroundColor: "white" }
                            }
                            onClick={handleArrayChange}
                        >
                            T
                        </Button>
                        <Button
                            value="W"
                            style={
                                userDetails.preferredDays.includes("W")
                                    ? {
                                          backgroundColor:
                                              theme.palette.secondary.main,
                                      }
                                    : { backgroundColor: "white" }
                            }
                            onClick={handleArrayChange}
                        >
                            W
                        </Button>
                        <Button
                            value="Th"
                            style={
                                userDetails.preferredDays.includes("Th")
                                    ? {
                                          backgroundColor:
                                              theme.palette.secondary.main,
                                      }
                                    : { backgroundColor: "white" }
                            }
                            onClick={handleArrayChange}
                        >
                            Th
                        </Button>
                        <Button
                            value="F"
                            style={
                                userDetails.preferredDays.includes("F")
                                    ? {
                                          backgroundColor:
                                              theme.palette.secondary.main,
                                      }
                                    : { backgroundColor: "white" }
                            }
                            onClick={handleArrayChange}
                        >
                            F
                        </Button>
                        <Button
                            value="Sa"
                            style={
                                userDetails.preferredDays.includes("Sa")
                                    ? {
                                          backgroundColor:
                                              theme.palette.secondary.main,
                                      }
                                    : { backgroundColor: "white" }
                            }
                            onClick={handleArrayChange}
                        >
                            Sa
                        </Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        </Grid>
    );
};
