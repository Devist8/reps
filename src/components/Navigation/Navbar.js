import React, { Component } from "react";
import link from "react-router-dom/Link";

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
        backgroundImage: `url(/top_nav.svg)`,
        display: "flex",
    },
    navToolbar: {
        margin: "auto",
    },
    appBarPaper: {
        backgroundImage: `url(/top_nav.svg)`,
        display: "flex",
    },
}));

export const Navbar = () => {
    const classes = useStyles();
    const auth = useSelector((state) => state.user.authenticated);
    const info = useSelector((state) => state.user.info);
    console.log(info);
    return (
        <AppBar
            elevation={2}
            className={classes.root}
            color="default"
            classes={{ paper: classes.appBarPaper }}
        >
            {!auth ? (
                <Toolbar
                    className="nav-container"
                    style={{ backgroundImage: `url(/top_nav.svg)` }}
                >
                    <Button
                        color="inherit"
                        className={classes.navBtn}
                        component={link}
                        to="/"
                    >
                        Home
                    </Button>
                    <Button
                        color="inherit"
                        className={classes.navBtn}
                        component={link}
                        to="/login"
                    >
                        Login
                    </Button>
                    <Button
                        color="inherit"
                        className={classes.navBtn}
                        component={link}
                        to="/signup"
                    >
                        Sign up
                    </Button>
                </Toolbar>
            ) : (
                <Toolbar
                    className="nav-container"
                    style={{ backgroundImage: `url(/top_nav.svg)` }}
                >
                    {info.displayName && <UserButton />}
                </Toolbar>
            )}
        </AppBar>
    );
};
