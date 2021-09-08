import React from "react";
import { BrowserRouter as Routes, Route } from "react-router-dom";
import AuthRoute from "../util/AuthRoute";

//Routes
import { Home } from "./Home";
import { Login, Signup } from "../features/auth";

/*export const PublicRoutes = () => {
    return (
        <Routes>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
        </Routes>
    );
};*/

export const PublicRoutes = [
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
];
