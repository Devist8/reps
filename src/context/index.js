import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import {
    ThemeProvider as MuiThemeProvider,
    createTheme,
    responsiveFontSizes,
    makeStyles,
} from "@material-ui/core/styles";
import theme from "../util/theme";

import { Provider } from "react-redux";
import store from "./redux/store";

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
