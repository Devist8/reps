import React from "react";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";

import {
    ThemeProvider as MuiThemeProvider,
    createTheme,
    responsiveFontSizes,
    makeStyles,
} from "@material-ui/core/styles";
import theme from "../util/theme";

//Redux
import { Provider } from "react-redux";
import store from "../redux/store";
import { getNewToken } from "../features/auth/actions";

axios.interceptors.request.use((config) => {
    const token = localStorage.FBIdToken;
    if (token) {
        let idToken = token.split("Bearer ")[1];
        store.dispatch(getNewToken());
    }
    return config;
});

const themeObject = responsiveFontSizes(createTheme(theme));
export const AppProvider = (props) => {
    const { children } = props;

    return (
        <MuiThemeProvider theme={themeObject}>
            <Provider store={store}>
                <Router>{children}</Router>
            </Provider>
        </MuiThemeProvider>
    );
};
