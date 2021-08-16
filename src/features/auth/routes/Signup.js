import React from "react";

import axios from "axios";
import { useHistory } from "react-router";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";
import { allergies, fitnessGoals } from "../../../util/static-data";

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
    Select,
    Badge,
    MenuItem,
    Avatar,
    Box,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { signupUser, oAuthSignUp, updateUserData } from "../actions";
import { SET_AUTHENTICATED, CLEAR_FILE, SET_FILE } from "../reducers/types";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        margin: "0 auto",
        justifyContent: "center",
    },
    signUpContainer: {
        display: "flex",
        margin: "0 auto",
        justifyContent: "center",
    },
    formContainer: {
        margin: "auto",

        textAlign: "center",
    },
    title: {
        margin: "auto",
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
        marginTop: "2rem",
    },
    stepperButtons: {
        display: "flex",
        justifyContent: "space-between",
    },
    largeImg: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
}));

const SignUpForm = (props) => {
    const { handleChange, userData, handleSubmit, setActiveStep, setUserData } =
        props;
    const classes = useStyles();
    const user = useSelector((state) => state.user.info);
    const dispatch = useDispatch();
    const errors = useSelector((state) => state.ui.errors);
    const uiConfig = {
        signInFlow: "popup",

        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        ],

        callbacks: {
            signInSuccessWithAuthResult: () => {
                firebase.auth().onAuthStateChanged((user) => {
                    console.log(user);
                    user.photoURL &&
                        setUserData((prevState) => ({
                            ...prevState,
                            imageURL: user.photoURL,
                        }));
                    const userData = {
                        displayName: user.displayName,
                        email: user.email,
                        imageURL: user.photoURL,
                        type: "user",
                    };
                    firebase
                        .auth()
                        .currentUser.getIdToken()
                        .then((idToken) => {
                            const FBIdToken = `Bearer ${idToken}`;

                            localStorage.setItem("FBIdToken", FBIdToken);
                            dispatch({ type: SET_AUTHENTICATED });
                            axios.defaults.headers.common["Authorization"] =
                                FBIdToken;
                            dispatch(oAuthSignUp(userData, user.uid));
                            setActiveStep(1);
                            return user.dob & user.goals ? true : false;
                        })
                        .catch((err) => {
                            console.log(err.error);
                        });
                });
            },
        },
    };

    console.log(errors);
    return (
        <Grid container className={classes.signUpContainer}>
            <Grid item xs={12} className={classes.textField}>
                <TextField
                    id="firstName"
                    name="firstName"
                    type="name"
                    label="First Name"
                    required
                    className={classes.textField}
                    helperText={errors && errors.name}
                    error={errors && errors.name}
                    value={userData.firstName}
                    onChange={(e) => handleChange(e)}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} className={classes.textField}>
                <TextField
                    id="name"
                    name="lastName"
                    required
                    type="name"
                    label="Last Name"
                    className={classes.textField}
                    helperText={errors && errors.name}
                    error={errors && errors.name}
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
                    required
                    className={classes.textField}
                    helperText={errors && errors.email}
                    error={errors && errors.email}
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
                    required
                    className={classes.textField}
                    helperText={errors && errors.password}
                    error={errors && errors.password}
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
                    required
                    className={classes.textField}
                    helperText={errors && errors.password}
                    error={errors && errors.password}
                    value={userData.confirmPassword}
                    onChange={(e) => handleChange(e)}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} className={classes.buttonContainer}>
                {errors && errors.general && (
                    <Typography variant="body2" className={classes.customError}>
                        {errors && errors.general}
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
    const { handleChange, userData, setActiveStep } = props;
    const classes = useStyles();
    const dispatch = useDispatch();
    const errors = useSelector((state) => state.ui.errors);
    const [preview, setPreview] = React.useState(null);

    const handleFileChange = (e) => {
        const reader = new FileReader();
        let file = e.target.files[0];

        if (file) {
            reader.onload = () => {
                if (reader.readyState === 2) {
                    console.log(file);
                    dispatch({ type: SET_FILE, payload: file });
                    setPreview(window.URL.createObjectURL(file));
                    dispatch({ type: "CLEAR_PROGRESS" });
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        } else {
            dispatch({ type: CLEAR_FILE, payload: file });
        }
    };

    const handleEditPicture = () => {
        const fileInput = document.getElementById("imageInput");
        fileInput.click();
    };

    return (
        <Grid container>
            <Grid
                item
                xs={12}
                style={{ display: "flex", justifyContent: "center" }}
            >
                <Badge
                    badgeContent={
                        <IconButton onClick={handleEditPicture}>
                            <EditIcon />
                            <input
                                type="file"
                                id="imageInput"
                                hidden="hidden"
                                onChange={handleFileChange}
                            />
                        </IconButton>
                    }
                >
                    <Avatar
                        src={preview ? preview : userData.imageURL}
                        className={classes.largeImg}
                    />
                </Badge>
            </Grid>
            <Grid container style={{ display: "flex", marginTop: "1.5vh" }}>
                <Grid item xs={12} style={{}}>
                    <Typography
                        variant="overline"
                        style={{ justifySelf: "flex-start", width: "100%" }}
                    >
                        Date of Birth
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="dob"
                        name="dob"
                        type="date"
                        className={classes.textField}
                        value={userData.dob}
                        onChange={(e) => handleChange(e)}
                    />
                </Grid>
            </Grid>
            <Grid container style={{ marginTop: "1vh" }}>
                <Grid item xs={12}>
                    <Typography
                        variant="overline"
                        style={{ justifySelf: "flex-start", width: "100%" }}
                    >
                        Height
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="height"
                        name="height"
                        className={classes.textField}
                        value={userData.height}
                        onChange={(e) => handleChange(e)}
                    />
                </Grid>
            </Grid>
            <Grid container style={{ marginTop: "1vh" }}>
                <Grid item xs={12}>
                    <Typography
                        variant="overline"
                        style={{ justifySelf: "flex-start", width: "100%" }}
                    >
                        Weight
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="weight"
                        name="weight"
                        className={classes.textField}
                        value={userData.weight}
                        onChange={(e) => handleChange(e)}
                    />
                </Grid>
            </Grid>
            <Grid item xs={12} className={classes.stepperButtons}>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={() => setActiveStep(0)}
                >
                    Back
                </Button>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={() => {
                        console.log(userData);
                        return setActiveStep(2);
                    }}
                >
                    Next
                </Button>
            </Grid>
        </Grid>
    );
};

export const ArrayForm = (props) => {
    const classes = useStyles();
    const { errors, handleChange, userData, setActiveStep, handleArrayChange } =
        props;
    let history = useHistory();
    const dispatch = useDispatch();
    const [newAllergy, setNewAllergy] = React.useState("");
    const [newGoal, setNewGoal] = React.useState("");
    const file = useSelector((state) => state.data.file);

    const addArray = (e) => {
        e.persist();

        const type = e.target.name === "goals" ? "goals" : "allergies";

        const newArray =
            type === "goals"
                ? !userData.goals.includes(newGoal)
                    ? Array.from([...userData.goals, newGoal])
                    : userData.goals
                : !userData.allergies.includes(newAllergy)
                ? Array.from([...userData.allergies, newAllergy])
                : userData.allergies;

        console.log(newArray);
        e.target.value = Array.from(newArray);
        type === "goals" ? setNewGoal("") : setNewAllergy("");
        const data = {
            name: type,
            value: Array.from(newArray),
        };
        return handleArrayChange(data);
    };

    const handleSubmit = () => {
        dispatch(updateUserData(userData, file));
        dispatch({ type: CLEAR_FILE });
        history.push("/dashboard");
    };
    return (
        <Grid container>
            <Grid
                item
                xs={12}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    textAlign: "center",
                    margin: "1vh 0",
                }}
            >
                <Grid item xs={12}>
                    <Typography variant="h6" style={{ textAlign: "center" }}>
                        What are some goals you hope to achieve
                    </Typography>
                </Grid>
                <Grid item xs={8}>
                    {userData.goals.length > 0 && (
                        <ul style={{ listStyleType: "none", padding: 0 }}>
                            {userData.goals.map((goal) => {
                                return <li key={goal}>{goal}</li>;
                            })}
                        </ul>
                    )}
                </Grid>
                <Box style={{}}>
                    <TextField
                        name="goals"
                        select
                        value={newGoal}
                        style={{ width: "20vw", marginLeft: "2vw" }}
                        onChange={(e) => setNewGoal(e.target.value)}
                    >
                        {fitnessGoals.map((goal) => (
                            <MenuItem key={goal} value={goal}>
                                {goal}
                            </MenuItem>
                        ))}
                    </TextField>
                    <IconButton
                        name="goals"
                        onClick={(e) => {
                            e.target.name = "goals";
                            addArray(e);
                        }}
                    >
                        <AddIcon />
                    </IconButton>
                </Box>
            </Grid>
            <Grid
                item
                xs={12}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    textAlign: "center",
                    margin: "1vh 0",
                }}
            >
                <Grid item xs={12}>
                    <Typography variant="h6">
                        Please add any allergies that you may have
                    </Typography>
                </Grid>
                <Grid item xs={8}>
                    {userData.allergies.length > 0 && (
                        <ul style={{ listStyleType: "none", padding: 0 }}>
                            {userData.allergies.map((allergy) => {
                                return <li key={allergy}>{allergy}</li>;
                            })}
                        </ul>
                    )}
                </Grid>
                <Box>
                    <TextField
                        name="allergies"
                        select
                        value={newAllergy}
                        style={{ width: "20vw", marginLeft: "2vw" }}
                        onChange={(e) => setNewAllergy(e.target.value)}
                    >
                        {allergies.map((allergy) => (
                            <MenuItem key={allergy} value={allergy}>
                                {allergy}
                            </MenuItem>
                        ))}
                    </TextField>
                    <IconButton
                        name="allergies"
                        onClick={(e) => {
                            e.target.name = "allergies";
                            addArray(e);
                        }}
                    >
                        <AddIcon />
                    </IconButton>
                </Box>
            </Grid>

            <Grid container className={classes.stepperButtons}>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={() => setActiveStep(1)}
                >
                    Back
                </Button>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </Grid>
        </Grid>
    );
};

export const Signup = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.info);
    console.log(user.imageURL);
    const [userData, setUserData] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        imageURL: "",
        dob: "",
        height: "",
        weight: "",
        goals: [],
        allergies: [],
    });
    const [activeStep, setActiveStep] = React.useState(0);
    const errors = useSelector((state) => state.ui.errors);

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
                        setUserData={setUserData}
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
                        handleArrayChange={handleArrayChange}
                        userData={userData}
                        setActiveStep={setActiveStep}
                    />
                );
        }
    };

    const labels = [
        "Create account",
        "Personal Information",
        "Goals & Allergies",
    ];

    const handleChange = (e) => {
        e.persist();
        console.log(e.target);
        setUserData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleArrayChange = (data) => {
        setUserData((prevData) => ({
            ...prevData,
            [data.name]: data.value,
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            ...userData,
            displayName: `${userData.firstName} ${userData.lastName}`,
        };
        dispatch(signupUser(data));
        errors && console.log(errors);
        !errors && setActiveStep(1);
    };

    return (
        <Grid container className={classes.root}>
            <Grid item xs={12}>
                <Typography variant="h2" className={classes.title}>
                    Sign Up
                </Typography>
            </Grid>
            <Grid item xs={8} className={classes.formContainer}>
                <form noValidate onSubmit={handleSubmit}>
                    {getStepContent(activeStep)}
                </form>
            </Grid>
            <Grid item xs={8} className={classes.stepper}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {labels.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Grid>
        </Grid>
    );
};
