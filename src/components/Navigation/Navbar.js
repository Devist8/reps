import React, { Component } from "react";
import { Link } from "react-router-dom";

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
}));

export const Navbar = () => {
    const classes = useStyles();
    const auth = useSelector((state) => state.user.authenticated);
    const info = useSelector((state) => state.user.info);

    return (
        <AppBar elevation={2} className={classes.root} color="default">
            {!auth ? (
                <Toolbar
                    className="nav-container"
                    style={{ backgroundImage: `url(/top_nav.svg)` }}
                >
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
                    style={{ backgroundImage: `url(/top_nav.svg)` }}
                >
                    {info.displayName && <UserButton />}
                </Toolbar>
            )}
        </AppBar>
    );
};
