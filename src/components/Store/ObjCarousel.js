import React from "react";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import {
    Grid,
    IconButton,
    GridList,
    GridListTile,
    MobileStepper,
    Slide,
} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

//Components
import { StoreItemDisplay } from "./StoreItemDisplay";

const useStyles = makeStyles((theme) => ({
    arrowContainer: {
        display: "flex",
        alignItems: "center",
        maxWidth: "2.5rem",
    },
    stepperRoot: {
        background: "none",
        "& .MuiMobileStepper-dotActive": {
            backgroundColor: "#A9ECB0",
        },
    },
    dotActive: {
        backgroundColor: "#A9ECB0",
    },
    root: {
        width: "75vw",
        [theme.breakpoints.up("xl")]: {
            width: "80vw",
        },
    },
}));

export const ObjCarousel = (props) => {
    const { items } = props;
    const [show, setShow] = React.useState([0, 1, 2]);
    const [slide, setSlide] = React.useState(1);
    const classes = useStyles();
    const maxSlide = meals.length > 2 ? Math.floor(meals.length / 3) : 1;

    const incrementSlide = () => {
        setSlide(slide + 1);
        console.log(slide);
        setShow(show.map((x) => x + 3));
        console.log(show);
    };
    const decrementSlide = () => {
        setSlide(slide - 1);
        console.log(slide);
        setShow(show.map((x) => x - 3));
        console.log(show);
    };

    return (
        <Grid container className={classes.root}>
            <Grid item xs={1} className={classes.arrowContainer}>
                <IconButton onClick={decrementSlide} disabled={slide === 1}>
                    <ArrowBackIosIcon />
                </IconButton>
            </Grid>
            <Grid
                item
                xs={10}
                style={{ width: "75vw", display: "flex", flexWrap: "noWrap" }}
            >
                <GridList
                    spacing={4}
                    style={{
                        display: "flex",
                        flexWrap: "noWrap",
                        overflowX: "hidden",
                        minHeight: "20vh",
                    }}
                >
                    {show.map((element) => {
                        if (items[element]) {
                            let item = items[element];
                            return (
                                <StoreItemDisplay
                                    image={item.image}
                                    title={item.title}
                                    price={item.price}
                                    type={item.type}
                                    count={item.workoutCount}
                                />
                            );
                        }
                    })}
                </GridList>
            </Grid>
            <Grid item xs={1} className={classes.arrowContainer}>
                <IconButton
                    onClick={incrementSlide}
                    disabled={slide === maxSlide}
                >
                    <ArrowForwardIosIcon />
                </IconButton>
            </Grid>
            <Grid
                item
                xs={11}
                style={{
                    display: "flex",
                    textAlign: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "50vw",
                }}
            >
                <MobileStepper
                    variant="dots"
                    position="static"
                    activeStep={slide - 1}
                    steps={maxSlide}
                    classes={{
                        root: classes.stepperRoot,
                        dotActive: { backgroundColor: "green" },
                    }}
                />
            </Grid>
        </Grid>
    );
};
