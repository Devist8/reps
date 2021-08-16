import React from "react";
import "./App.css";

import axios from "axios";
import firebase from "firebase";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//MUI
import themeObject from "./util/theme";
import { Hidden } from "@material-ui/core";

import { AppProvider } from "./context";
import { AppRoutes } from "./routes";

const newApp = () => {
    return (
        <AppProvider>
            <AppRoutes />
        </AppProvider>
    );
};

export default newApp;
