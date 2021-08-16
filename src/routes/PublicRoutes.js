import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AuthRoute from "../util/AuthRoute";

//Routes
import { Home } from "./Home";
import { Login, Signup } from "../features/auth";

export const PublicRoutes = () => {
    return (
        <Router>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
        </Router>
    );
};
