import React from "react";
import "./App.css";

import axios from "axios";
import firebase from "firebase";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthRoute from "./util/AuthRoute";

//MUI
import themeObject from "./util/theme";
import { makeStyles, responsiveFontSizes } from "@material-ui/core/styles";
import { Hidden, Typography } from "@material-ui/core";

//Navigation
import { Navbar } from "./components/Navbar";
import { AuthNavbar } from "./components/AuthNavbar";
import { CalendarNavBar } from "./components/CalendarNavBar";
import { AppProvider } from "./context";
import { AppRoutes } from "./routes";

//Redux
import store from "./redux/store";
import { useDispatch } from "react-redux";
import { getUserData } from "./redux/actions/dataActions";
import { getStore } from "./redux/actions/storeActions";
import { SET_AUTHENTICATED } from "./redux/types";
import { getRecentMessages } from "./redux/actions/messageActions";

//Routes
import { Home as DashboardHome } from "./features/dashboard/features/home/routes/Home";
import { Studio, Exercise } from "./features/dashboard/features/studio/index";
import { Meals, Meal } from "./features/dashboard/features/meals/routes";
import { Store, Checkout, Cart } from "./features/dashboard/features/store";
import { Home } from "./routes/Home";
import { Login, Signup, Account, Settings, Profile } from "./features/auth";

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: "65px",
        marginLeft: "8.0vw",
        marginRight: "300px",

        [theme.breakpoints.up("lg")]: {},
        [theme.breakpoints.up("xl")]: {},
    },
}));

const token = localStorage.FBIdToken;

const App = () => {
    const classes = useStyles();

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

    return (
        <AppProvider>
            <Router>
                <Navbar />
                {token && <AuthNavbar />}
                {token && (
                    <Hidden mdDown>
                        <CalendarNavBar />
                    </Hidden>
                )}
                <CalendarNavBar />
                <div className={classes.container}>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/signup" component={Signup} />
                        <Route exact path="/meals/:mealId" component={Meal} />
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
                        <AuthRoute exact path="/workouts" component={Studio} />
                        <AuthRoute exact path="/meals" component={Meals} />
                        <Route exact path="/account" componet={Account} />
                        <Route exact path="/settings" component={Settings} />
                        <Route exact path="/profile" component={Profile} />
                        <Route exact path="/cart" component={Cart} />
                        <AuthRoute
                            exact
                            path="/checkout"
                            component={Checkout}
                        />
                        {
                            /*<Elements
                            stripe={stripePromise !== null && stripePromise}
                        >*/
                            <Route exact path="/store" component={Store} />
                            /*</Elements>*/
                        }
                    </Switch>
                </div>
            </Router>
        </AppProvider>
    );
};

export default App;
