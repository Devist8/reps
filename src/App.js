import React from "react";
import "./App.css";

//APIs
import axios from "axios";
import jwtDecode from "jwt-decode";
import firebase from "firebase";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Utilities
import { exercise } from "./util/TestData";
import config from "./util/config";
import themeObject from "./util/theme";
import AuthRoute from "./util/AuthRoute";

//Mui Stuff
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

//Components
import { Navbar } from "./components/Navigation/Navbar";
import { AuthNavbar } from "./components/Navigation/AuthNavbar";
import { CalendarNavBar } from "./components/Navigation/CalendarNavBar";
import { Exercise } from "./components/Exercises/Exercise";

//Pages
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Home as DashboardHome } from "./pages/Dashboard/Home";
import { Studio } from "./pages/Dashboard/Studio";
import { Meals } from "./pages/Dashboard/Meals";
import { Store } from "./pages/Dashboard/Store";

//Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getNewToken } from "./redux/actions/userActions";
import { getUserData } from "./redux/actions/dataActions";

const app = firebase.initializeApp(config);

const theme = createMuiTheme(themeObject);

axios.defaults.baseURL = "http://localhost:5001/reps-699b0/us-east1/api";

const token = localStorage.FBIdToken;
if (token) {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
}

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount = () => {
        const checkToken = firebase.auth().onAuthStateChanged((user) => {
            firebase
                .auth()
                .currentUser.getIdToken()
                .then((idToken) => {
                    const decodedToken = jwtDecode(idToken);

                    if (decodedToken.exp * 1000 < Date.now()) {
                        store.dispatch(
                            getNewToken(
                                firebase.auth().currentUser.refreshToken,
                                this.props.history
                            )
                        );
                        store.dispatch(getUserData());
                        setTimeout(checkToken(), 3600000);
                    } else {
                        const FBIdToken = `Bearer ${idToken}`;
                        localStorage.setItem("FBIdToken", FBIdToken);
                        setTimeout(checkToken(), 3600000);
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        });

        return () => checkToken();
    };

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Provider store={store}>
                    <Router>
                        <Navbar />
                        <AuthNavbar />
                        <CalendarNavBar />
                        <div className="container">
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <Route exact path="/login" component={Login} />
                                <Route
                                    exact
                                    path="/signup"
                                    component={Signup}
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
                                <AuthRoute
                                    exact
                                    path="/meals"
                                    component={Meals}
                                />
                                <AuthRoute
                                    exact
                                    path="/store"
                                    component={Store}
                                />
                            </Switch>
                        </div>
                    </Router>
                </Provider>
            </MuiThemeProvider>
        );
    }
}

export default App;
