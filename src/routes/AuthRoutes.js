import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AuthRoute from "../util/AuthRoute";

//Routes
import { Home } from "../features/dashboard/routes/Home";
import { Studio } from "../features/studio/routes";
import { Meals } from "../features/meals";
import { StoreRoutes } from "../features/store";

export const AuthRoutes = () => {
    return (
        <Router>
            <AuthRoute exact path="/dashboard" component={Home} />
            <AuthRoute exact path="/workouts" component={Studio} />
            <AuthRoute exact path="/meals" component={Meals} />

            <AuthRoute path="/store/*" component={StoreRoutes} />
        </Router>
    );
};
