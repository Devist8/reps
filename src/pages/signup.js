import React from "react";

import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import {
    Grid,
    TextField,
    Typography,
    Button,
    IconButton,
    Stepper,
    Step,
    StepLabel,
    Box,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

//Redux
import { useDispatch } from "react-redux";
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

const SignUpForm = (props) => {
    const { errors, handleChange, userData, handleSubmit, setActiveStep } =
        props;
    const classes = useStyles();
    const uiConfig = {
        signInFlow: "popup",

        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        ],

        callbacks: {
            signInSuccessWithAuthResult: () => {
                setActiveStep(1);
                return false;
            },
        },
    };
    return (
        <Grid container>
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
                    <Typography variant="body2" className={classes.customError}>
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
                <Grid item xs={12} className={classes.firebaseContainer}>
                    <StyledFirebaseAuth
                        uiConfig={uiConfig}
                        firebaseAuth={firebase.auth()}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export const InfoForm = (props) => {
    const { errors, handleChange, userData, setActiveStep } = props;
    const classes = useStyles();

    return (
        <Grid container>
            <Grid item xs={12}>
                <TextField
                    id="dob"
                    name="dob"
                    label="Date of Birth"
                    className={classes.textField}
                    helperText={errors.dob}
                    error={errors.dob ? true : false}
                    value={userData.dob}
                    onChange={(e) => handleChange(e)}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id="height"
                    name="height"
                    label="Height"
                    className={classes.textField}
                    helperText={errors.height}
                    error={errors.height ? true : false}
                    value={userData.height}
                    onChange={(e) => handleChange(e)}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id="weight"
                    name="weight"
                    label="Weight"
                    className={classes.textField}
                    helperText={errors.weight}
                    error={errors.weight ? true : false}
                    value={userData.weight}
                    onChange={(e) => handleChange(e)}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} className={classes.stepperButtons}>
                <Button>Back</Button>
                <Button>Next</Button>
            </Grid>
        </Grid>
    );
};

export const ArrayForm = (props) => {
    const classes = useStyles();
    const { errors, handleChange, userData, setActiveStep } = props;
    const [newAllergy, setNewAllergy] = React.useState("");
    const [newGoal, setNewGoal] = React.useState("");

    const addArray = (e) => {
        e.persist();
        const type = e.target.name === "goals" ? "goals" : "allergies";
        const item = e.target.value;
        const newArray =
            type === "goals"
                ? [...userData.goals, item]
                : [...userData.allergies, item];
        e.target.value = newArray;
        type === "goals" ? setNewGoal("") : setNewAllergy("");
        return handleChange(e);
    };
    return (
        <Grid container>
            <Grid item xs={12}>
                {userData.goals.length > 0 && (
                    <ul>
                        {userData.goals.map((goal) => {
                            return <li>{goal}</li>;
                        })}
                    </ul>
                )}
                <Box>
                    <TextField
                        name="goals"
                        value={newGoal}
                        onChange={(e) => setNewGoal(e.target.value)}
                    />
                    <IconButton onClick={addArray}>
                        <AddIcon />
                    </IconButton>
                </Box>
            </Grid>
            <Grid item xs={12}>
                {userData.allergies.length > 0 && (
                    <ul>
                        {userData.allergies.map((allergy) => {
                            return <li>{allergy}</li>;
                        })}
                    </ul>
                )}
                <Box>
                    <TextField
                        name="allergies"
                        value={newAllergy}
                        onChange={(e) => setNewAllergy(e.target.value)}
                    />
                    <IconButton onClick={addArray}>
                        <AddIcon />
                    </IconButton>
                </Box>
            </Grid>

            <Grid item xs={12} className={classes.stepperButtons}>
                <Button>Back</Button>
                <Button>Submit</Button>
            </Grid>
        </Grid>
    );
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
        dob: "",
        height: "",
        weight: "",
        goals: [],
        allergies: [],
    });
    const [activeStep, setActiveStep] = React.useState(2);
    const [errors, setErrors] = React.useState({});

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <SignUpForm
                        errors={errors}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        userData={userData}
                        setActiveStep={setActiveStep}
                    />
                );
            case 1:
                return (
                    <InfoForm
                        errors={errors}
                        handleChange={handleChange}
                        userData={userData}
                        setActiveStep={setActiveStep}
                    />
                );
            case 2:
                return (
                    <ArrayForm
                        errors={errors}
                        handleChange={handleChange}
                        userData={userData}
                        setActiveStep={setActiveStep}
                    />
                );
        }
    };

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
        dispatch(signupUser(data));
        return setActiveStep(1);
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
                    {getStepContent(activeStep)}
                </form>
            </Grid>
        </Grid>
    );
};
