import React from "react";
import { Link, useLocation, useRouteMatch } from "react-router-dom";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import { ReactComponent as HomeIcon } from "../../icons/home_icon.svg";
import { ReactComponent as WorkoutsIcon } from "../../icons/workouts_icon.svg";
import { ReactComponent as MealsIcon } from "../../icons/meals_icon.svg";
import { ReactComponent as StoreIcon } from "../../icons/store_icon.svg";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/actions/userActions";

const useStyles = makeStyles((theme) => ({
    button: {
        display: "flex",
        textAlign: "center",
        margin: "2.5vh auto",
        textAlign: "center",
        justifyContent: "center",
    },
    drawerPaper: {
        backgroundImage: `url(/left_nav.svg)`,
        overflow: "hidden",
    },
    leftDrawer: {
        borderRight: "none",
        width: "8vw",
    },
    selected: {
        borderRadius: "10px",

        "&$hover": {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
    },
    "@global": {
        ".MuiListItem-root.Mui-selected:hover": {
            backgroundColor: "rgba(0, 181, 255, 0.3)",
        },
        ".MuiListItem-root.Mui-selected": {
            backgroundColor: "rgba(0, 181, 255, 0.3)",
        },
        ".MuiListItem-root:hover": {
            backgroundColor: "rgba(0, 181, 255, 0.3)",
        },
    },
    focus: {
        borderRadius: "10px",
    },
}));

export const AuthNavbar = () => {
    const dispatch = useDispatch();
    const classes = useStyles();

    return (
        <AppBar style={{ zIndex: "1000", overflow: "hidden" }}>
            <Drawer
                open={true}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                    paperAnchorDockedLeft: classes.leftDrawer,
                }}
            >
                <Grid
                    container
                    style={{
                        marginTop: "5rem",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <ToolBar
                        disableGutters
                        style={{ display: "flex", justifyContent: "center" }}
                    >
                        <List>
                            <ListItem
                                component={Link}
                                to="/dashboard"
                                button
                                className={classes.button}
                                selected={useRouteMatch("/dashboard")}
                                classes={{
                                    selected: classes.selected,
                                    button: classes.focus,
                                }}
                            >
                                <HomeIcon />
                            </ListItem>
                            <ListItem
                                button
                                component={Link}
                                to="/workouts"
                                className={classes.button}
                                selected={useRouteMatch("/workouts")}
                                classes={{
                                    selected: classes.selected,
                                    button: classes.focus,
                                }}
                            >
                                <WorkoutsIcon />
                            </ListItem>
                            <ListItem
                                button
                                component={Link}
                                to="/meals"
                                className={classes.button}
                                selected={useRouteMatch("/meals")}
                                classes={{
                                    selected: classes.selected,
                                    button: classes.focus,
                                }}
                            >
                                <MealsIcon />
                            </ListItem>
                            <ListItem
                                button
                                component={Link}
                                to="/store"
                                className={classes.button}
                                selected={useRouteMatch("/store")}
                                classes={{
                                    selected: classes.selected,
                                    button: classes.focus,
                                }}
                            >
                                <StoreIcon />
                            </ListItem>
                            <ListItem button className={classes.textButton}>
                                <Button onClick={() => dispatch(logoutUser())}>
                                    Logout
                                </Button>
                            </ListItem>
                        </List>
                    </ToolBar>
                </Grid>
            </Drawer>
        </AppBar>
    );
};
