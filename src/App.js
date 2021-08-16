import React from "react";
import "./App.css";

//APIs
import axios from "axios";
import jwtDecode from "jwt-decode";
import firebase from "firebase";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Utilities
import { exercise } from "./util/TestData";
import themeObject from "./util/theme";
import AuthRoute from "./util/AuthRoute";

//Mui Stuff
import {
    ThemeProvider as MuiThemeProvider,
    withStyles,
    makeStyles,
    responsiveFontSizes,
} from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { Hidden } from "@material-ui/core";

//Components
import { Navbar } from "./components/Navigation/Navbar";
import { AuthNavbar } from "./components/Navigation/AuthNavbar";
import { CalendarNavBar } from "./components/Navigation/CalendarNavBar";

//Pages
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Home as DashboardHome } from "./pages/Dashboard/Home";
import { Studio } from "./pages/Dashboard/Studio";
import { Meals } from "./pages/Dashboard/Meals";
import { Meal } from "./pages/Meal";
import { Store } from "./pages/Dashboard/Store";
import { Checkout } from "./pages/Dashboard/Checkout";
import { Exercise } from "./pages/Dashboard/WorkoutPages/Exercise";
import { Profile } from "./pages/Dashboard/UserPages/Profile";
import { Settings } from "./pages/Dashboard/UserPages/Settings";
import { Account } from "./pages/Dashboard/UserPages/Account";
import { Cart } from "./pages/Cart";

//Redux
import { Provider, useSelector } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getNewToken } from "./redux/actions/userActions";
import { getUserData } from "./redux/actions/dataActions";
import { getStore } from "./redux/actions/storeActions";

//Stripe
import { StripeProvider, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { getRecentMessages } from "./redux/actions/messageActions";

const theme = responsiveFontSizes(createMuiTheme(themeObject));

axios.defaults.baseURL = "http://localhost:5001/reps-699b0/us-east1/api";

const token = localStorage.FBIdToken;

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: "65px",
        marginLeft: "8.0vw",
        marginRight: "300px",

        [theme.breakpoints.up("lg")]: {},
        [theme.breakpoints.up("xl")]: {},
    },
}));

//Persistent Login
//Set up for Facebook Auth
//It is preventing Login with email & password,
//because auth().currentUser.getIdToken returns null
const stripePromise = loadStripe(
    "pk_test_51Hr3CTBp908J0ZFHC8eQsjRQ5jKJBLDuDCGR2lm78hOHmTZxgrJEAfxMff0oDMJ14oyyvADBVr5ivdx2ZdMWkbmb00lR0Vm7tB"
);
axios.interceptors.request.use((config) => {
    console.log("interceptor");
    const token = localStorage.FBIdToken;
    if (token) {
        let idToken = token.split("Bearer ")[1];
        store.dispatch(getNewToken());
    }
    return config;
});
const App = () => {
    React.useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            const userId = user.uid;

            firebase
                .auth()
                .currentUser.getIdToken()
                .then((idToken) => {
                    const FBIdToken = `Bearer ${idToken}`;
                    localStorage.setItem("FBIdToken", FBIdToken);
                    store.dispatch({ type: SET_AUTHENTICATED });
                    axios.defaults.headers.common["Authorization"] = token;
                    store.dispatch(getUserData());
                    store.dispatch(getStore(userId));
                    store.dispatch(getRecentMessages(user.uid));
                })
                .catch((err) => {
                    console.error(err.error);
                });
        });
    });

    const classes = useStyles();
    return (
        <MuiThemeProvider theme={theme}>
            <Provider store={store}>
                <Router>
                    <Navbar />
                    {token && <AuthNavbar />}

                    {token && (
                        <Hidden mdDown>
                            <CalendarNavBar />
                        </Hidden>
                    )}
                    <div className={classes.container}>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/signup" component={Signup} />
                            <Route
                                exact
                                path="/meals/:mealId"
                                component={Meal}
                            />
                            <Route
                                exact
                                path="/exercise/:exerciseId"
                                component={Exercise}
                            />
                            <AuthRoute
                                exact
                                path="/dashboard"
                                component={DashboardHome}
                            />
                            <AuthRoute
                                exact
                                path="/workouts"
                                component={Studio}
                            />
                            <AuthRoute exact path="/meals" component={Meals} />
                            <Route exact path="/account" componet={Account} />
                            <Route
                                exact
                                path="/settings"
                                component={Settings}
                            />
                            <Route exact path="/profile" component={Profile} />
                            <Route exact path="/cart" component={Cart} />
                            <AuthRoute
                                exact
                                path="/checkout"
                                component={Checkout}
                            />
                            <Elements
                                stripe={stripePromise !== null && stripePromise}
                            >
                                <Route exact path="/store" component={Store} />
                            </Elements>
                        </Switch>
                    </div>
                </Router>
            </Provider>
        </MuiThemeProvider>
    );
};

export default App;
