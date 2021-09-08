import React from "react";
import axios from "axios";

import { BrowserRouter as Switch, Router, Route } from "react-router-dom";
import { PublicRoutes } from "./PublicRoutes";
import { AuthRoutes } from "./AuthRoutes";

//import { Home } from "../features/dashboard/features/home/routes/Home";
import { Studio } from "../features/dashboard/features/studio/index";
import { Meals } from "../features/dashboard/features/meals/routes";
import { StoreRoutes } from "../features/dashboard/features/store";
import { Home } from "./Home";
import { Login, Signup } from "../features/auth";

export const AppRoutes = () => {
    return (
        <div>
            <PublicRoutes />
            <AuthRoutes />
        </div>
    );
};
