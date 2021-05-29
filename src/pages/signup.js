import React, { Component } from "react";

import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";

//Redux
import { connect, useDispatch } from "react-redux";
import { signupUser } from "../redux/actions/userActions";

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
        width: "65%",
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

export const Signup = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [userData, setUserData] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
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
        const data = {
            ...userData,
            displayName: `${userData.firstName} ${userData.lastName}`,
        };
        dispatch(signupUser(data, props.history));
    };
    return (
        <Grid container className={classes.root}>
            <Grid item xs={12}>
                <Typography variant="h2" className={classes.title}>
                    Sign Up
                </Typography>
            </Grid>
            <Grid item xs={12} className={classes.formContainer}>
                <form noValidate onSubmit={handleSubmit}>
                    <Grid item xs={12} className={classes.textField}>
                        <TextField
                            id="firstName"
                            name="firstName"
                            type="firstName"
                            label="First Name"
                            className={classes.textField}
                            helperText={errors.name}
                            error={errors.name ? true : false}
                            value={userData.firstName}
                            onChange={(e) => handleChange(e)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} className={classes.textField}>
                        <TextField
                            id="name"
                            name="lastName"
                            type="name"
                            label="Last Name"
                            className={classes.textField}
                            helperText={errors.name}
                            error={errors.name ? true : false}
                            value={userData.lastName}
                            onChange={(e) => handleChange(e)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} className={classes.textField}>
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
                    <Grid item xs={12} className={classes.textField}>
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
                    <Grid item xs={12} className={classes.textField}>
                        <TextField
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            label="Confirm Password"
                            className={classes.textField}
                            helperText={errors.password}
                            error={errors.password ? true : false}
                            value={userData.confirmPassword}
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
                            color="primary"
                            className={classes.button}
                            onSubmit={handleSubmit}
                        >
                            Sign Up
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
