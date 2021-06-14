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
import { MealCard } from "../Meals/MealCard";

//Redux
import { useSelector, useDispatch } from "react-redux";

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
}));

export const MealCarousel = (props) => {
    const { meals } = props;

    const classes = useStyles();
    const [show, setShow] = React.useState([0, 1, 2]);
    const [slide, setSlide] = React.useState(1);
    const maxSlide = meals.length > 2 ? Math.floor(meals.length / 3) : 1;
    console.log(maxSlide);

    const calculateNewShowArray = () => {
        const original = [0, 1, 2];
        const newArray = [];
        for (const item of original) {
            newArray.push(item + slide * 3);
        }

        return newArray;
    };

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
        <Grid container style={{ width: "75vw" }}>
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
                        if (meals[element]) {
                            return (
                                <MealCard
                                    meal={meals[element]}
                                    key={meals[element].id}
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
