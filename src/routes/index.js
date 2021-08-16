import React from "react";

import { BrowserRouter as Router } from "react-router-dom";
import { PublicRoutes } from "./PublicRoutes";
import { AuthRoutes } from "./AuthRoutes";

export const AppRoutes = () => {
    return (
        <Router>
            <PublicRoutes />
            <AuthRoutes />
        </Router>
    );
};
