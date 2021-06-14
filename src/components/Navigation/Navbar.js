import React, { Component } from "react";
import { Link, useLocation, useRouteMatch } from "react-router-dom";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

//Componrnts
import { UserButton } from "./UserButton";

//Redux
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    navToolbar: {
        margin: "auto",
    },
}));

export const Navbar = () => {
    const classes = useStyles();
    const location = useLocation();
    let mealsMatch = useRouteMatch("/meals");
    const mealPage = useRouteMatch("/meals/mealId");
    const auth = useSelector((state) => state.user.authenticated);
    const info = useSelector((state) => state.user.info);

    return (
        <AppBar
            elevation={1}
            className={classes.root}
            color="default"
            style={
                !location.pathname.includes("meals")
                    ? {
                          background:
                              "linear-gradient(105deg, #7DD9FF, #b5e9ff 28%, #e3f6ff)",
                      }
                    : {
                          background:
                              "linear-gradient(105deg, #cfffd4, #e0ffe4 28%, #e6ffe9)",
                      }
            }
        >
            {!auth ? (
                <Toolbar className="nav-container">
                    <Button
                        color="inherit"
                        className={classes.navBtn}
                        component={Link}
                        to="/"
                    >
                        Home
                    </Button>
                    <Button
                        color="inherit"
                        className={classes.navBtn}
                        component={Link}
                        to="/login"
                    >
                        Login
                    </Button>
                    <Button
                        color="inherit"
                        className={classes.navBtn}
                        component={Link}
                        to="/signup"
                    >
                        Sign up
                    </Button>
                </Toolbar>
            ) : (
                <Toolbar
                    className="nav-container"
                    style={
                        !location.pathname.includes("meals")
                            ? {
                                  background:
                                      "linear-gradient(105deg, #7DD9FF, #b5e9ff 28%, #e3f6ff)",
                              }
                            : {
                                  background:
                                      "linear-gradient(105deg, #cfffd4, #e0ffe4 28%, #e6ffe9)",
                              }
                    }
                >
                    {info.displayName && <UserButton />}
                </Toolbar>
            )}
        </AppBar>
    );
};
