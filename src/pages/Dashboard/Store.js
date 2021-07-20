import React from "react";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
import { StoreItemDisplay } from "../../components/Store/StoreItemDisplay";

//Components
import { StoreCarousel } from "../../components/Store/StoreCarousel";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: "25px",
        width: "72vw",
        display: "flex",
        justifyContent: "center",
    },
    storeNav: {
        backgroundColor: "#3e3e3e",
    },
    navButton: {
        margin: "0 0.5vw",
        color: "#D1B100",
        fontWeight: 600,
    },
}));

export const Store = (props) => {
    const {} = props;
    const classes = useStyles();
    const [navFilter, setNavFilter] = React.useState(null);

    const handleNavClick = (e) => {
        setNavFilter(e.target.name);
    };

    const array = [
        {
            imageURL: "/sample.jpg",
            title: "New Ab Workouts",
            body: "Ab workouts perfect for the summer, with and without equipment.",
        },
        {
            imageURL: "/beachbody-original.jpg",
            title: "Summer Program",
            body: "Intense summer program to get you right.",
            align: "left",
        },
        {
            imageURL: "/sample.jpg",
            title: "Another set of ab workouts",
            body: "Ab workouts perfect for the summer, with and without equipment.",
        },
    ];

    return (
        <Grid container className={classes.root}>
            <Grid item xs={12} className={classes.storeNav}>
                <Button
                    name="Best Sellers"
                    className={classes.navButton}
                    onClick={handleNavClick}
                >
                    Best Sellers
                </Button>
                <Button
                    name="Trainer's Favorites"
                    className={classes.navButton}
                    onClick={handleNavClick}
                >
                    Trainer's Favorites
                </Button>
                <Button
                    name="Programs"
                    className={classes.navButton}
                    onClick={handleNavClick}
                >
                    Programs
                </Button>
                <Button
                    name="Workouts"
                    className={classes.navButton}
                    onClick={handleNavClick}
                >
                    Workouts
                </Button>
                <Button
                    name="Exercises"
                    className={classes.navButton}
                    onClick={handleNavClick}
                >
                    Exercises
                </Button>
            </Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={12} style={{ marginTop: "35vh" }}></Grid>
        </Grid>
    );
};
