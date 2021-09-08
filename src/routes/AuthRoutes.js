import React from "react";
import { BrowserRouter as Routes } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import AuthRoute from "../util/AuthRoute";

//Routes
import { Home } from "../features/dashboard/features/home/routes/Home";
import { Studio } from "../features/dashboard/features/studio/index";
import { Meals } from "../features/dashboard/features/meals/routes";
//import { StoreRoutes } from "../features/dashboard/features/store";

/*export const AuthRoutes = () => {
    return (
        <Routes>
            <AuthRoute exact path="/dashboard" component={Home} />
            <AuthRoute exact path="/workouts" component={Studio} />
            <AuthRoute exact path="/meals" component={Meals} />
            <AuthRoute path="/store/*" component={StoreRoutes} />
        </Routes>
    );
};*/

export const AuthRoutes = [
    { path: "/dashboard", element: <Home /> },
    { path: "/workouts", element: <Studio /> },
    { path: "/meals", element: <Meals /> },
    //{ path: "/store/*", element: <StoreRoutes /> },
];
