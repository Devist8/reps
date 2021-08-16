import React from "react";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import {
    Grid,
    Typography,
    TextField,
    Button,
    ButtonGroup,
    Avatar,
    IconButton,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { updateUserData } from "../../../redux/actions/userActions";

const useStyles = makeStyles((theme) => ({
    img: { imageRendering: "pixelated" },
    infoContainer: {
        paddingLeft: "25px",
    },
    info: {
        marginTop: "5px",
        marginBottom: "5px",
    },
}));

export const Profile = (props) => {
    const {} = props;
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.info);
    const classes = useStyles();
    const [edit, setEdit] = React.useState({
        displayName: false,
        email: false,
        weight: false,
        goals: false,
    });
    const [userDetails, setUserDetails] = React.useState({
        displayName: user.displayName,
        email: user.email,
        dob: user.dob,
        weight: user.weight,
        goals: user.goals,
        allergies: user.allergies,
    });

    const handleArrayChange = (e) => {
        e.persist();
        const newArray = [...userDetails[e.target.name], e.target.value];
        setUserDetails((prevState) => ({
            ...prevState,
            [e.target.name]: newArray,
        }));
        console.log(userDetails);
        return dispatch(
            updateUserData({
                [e.target.name]: newArray,
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
            <Grid
                item
                xs={12}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                    marginTop: "2vh",
                    flexWrap: "wrap",
                }}
            >
                <Avatar
                    src={user.imageURL}
                    style={{
                        width: "4vw",
                        height: "4vw",
                        imageRendering: "pixelated",
                        objectFit: "contain",
                    }}
                    classes={{ img: classes.img }}
                />
                <Grid
                    item
                    xs={12}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        alignContent: "center",
                    }}
                >
                    <Grid
                        item
                        xs={2}
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            alignContent: "center",
                        }}
                    >
                        {edit.displayName ? (
                            <TextField
                                name="displayName"
                                value={userDetails.displayName}
                                placeholder={user.displayName}
                            />
                        ) : (
                            <Typography>{user.displayName}</Typography>
                        )}
                        <Grid item xs={1}>
                            <IconButton
                                onClick={() =>
                                    setEdit((prevState) => ({
                                        ...prevState,
                                        displayName: !prevState.displayName,
                                    }))
                                }
                            >
                                <EditIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container className={classes.infoContainer}>
                <Typography variant="h3">Information</Typography>
                <Grid item xs={12} className={classes.info}>
                    <Typography>{user.dob}</Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                    className={classes.info}
                    style={{
                        display: "flex",

                        alignItems: "center",
                        alignContent: "center",
                    }}
                >
                    <Grid item xs={2}>
                        {edit.email ? (
                            <TextField
                                name="email"
                                value={userDetails.email}
                                placeholder={user.email}
                            />
                        ) : (
                            <Typography>{user.email}</Typography>
                        )}
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton
                            onClick={() =>
                                setEdit((prevState) => ({
                                    ...prevState,
                                    email: !prevState.email,
                                }))
                            }
                        >
                            <EditIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};
