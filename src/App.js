import React from "react";
import "./App.css";
import config from "./util/config";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwtDecode from "jwt-decode";
import themeObject from "./util/theme";
import axios from "axios";
import AuthRoute from "./util/AuthRoute";
import firebase from "firebase";
//Mui Stuff
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

//Components
import Navbar from "./components/Navigation/Navbar";
import { AuthNavbar } from "./components/Navigation/AuthNavbar";
import { CalendarNavBar } from "./components/Navigation/CalendarNavBar";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";

//Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";

firebase.initializeApp(config);

const theme = createMuiTheme(themeObject);

axios.defaults.baseURL = "http://localhost:5000/reps-699b0/us-east1/api";

class App extends React.Component {
    componentDidMount = () => {
        firebase.auth().onAuthStateChanged((user) => {
            store.dispatch({ type: SET_AUTHENTICATED });
            store.dispatch(getUserData());
        });
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
                                <AuthRoute
                                    exact
                                    path="/login"
                                    component={Login}
                                />
                                <AuthRoute
                                    exact
                                    path="/signup"
                                    component={Signup}
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
