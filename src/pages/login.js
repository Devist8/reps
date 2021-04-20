import React, { Component, useEffect } from "react";
import config from "../util/config";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";

import axios from "axios";

//MUI
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

//Redux stuff
import { connect, useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

const useStyles = makeStyles((theme) => ({
    root: {
        marginRight: "10rem",
    },
    formContainer: {
        margin: "auto",
        marginRight: "10rem",
        textAlign: "center",
    },
    title: {
        margin: "auto",
        marginRight: "10rem",
        textAlign: "center",
    },
    textField: {
        margin: "auto",
        textAlign: "center",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        width: "40%",
    },
    buttonContainer: {
        margin: "auto",
        textAlign: "center",
        marginTop: "3rem",
    },
    customError: {
        color: "red",
        fontSize: "0.8rem",
    },
    firebaseContainer: {
        marginRight: "10rem",
        marginTop: "2rem",
    },
}));

const uiConfig = {
    signInFlow: "popup",

    signInSuccessUrl: "/",

    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
};

export const Login = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [userData, setUserData] = React.useState({
        email: null,
        password: null,
    });
    const [errors, setErrors] = React.useState({});
    const handleChange = (e) => {
        e.persist();
        console.log(e.target);
        setUserData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(userData, props.history));
    };
    useEffect((nextProps) => {
        //nextProps.UI.errors && setErrors({ errors: nextProps.UI.errors });
    });

    return (
        <Grid container className={classes.formContainer}>
            <Grid item sm>
                <Typography variant="h2" className={classes.title}>
                    Login
                </Typography>
            </Grid>
            <Grid item xs={12} className={classes.formContainer}>
                <form noValidate onSubmit={handleSubmit}>
                    <Grid item xs={12}>
                        <TextField
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            className={classes.textField}
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            value={userData.email}
                            onChange={(e) => handleChange(e)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            className={classes.textField}
                            helperText={errors.password}
                            error={errors.password ? true : false}
                            value={userData.password}
                            onChange={(e) => handleChange(e)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} className={classes.buttonContainer}>
                        {errors.general && (
                            <Typography
                                variant="body2"
                                className={classes.customError}
                            >
                                {errors.general}
                            </Typography>
                        )}
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            onSubmit={handleSubmit}
                        >
                            Login
                        </Button>
                    </Grid>
                </form>
            </Grid>
            <Grid item xs={12} className={classes.firebaseContainer}>
                <StyledFirebaseAuth
                    uiConfig={uiConfig}
                    firebaseAuth={firebase.auth()}
                />
            </Grid>
        </Grid>
    );
};
