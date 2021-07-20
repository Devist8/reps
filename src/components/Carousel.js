import React, { useState } from "react";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import {
    Grid,
    IconButton,
    GridList,
    MobileStepper,
    Box,
} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

//Components
import { ProgramCard } from "./Programs/ProgramCard";
import { MealCard } from "./Meals/MealCard";
import { StoreItemDisplay } from "./Store/StoreItemDisplay";

const useStyles = makeStyles((theme) => ({
    arrowContainer: {
        display: "flex",
        alignItems: "center",
        maxWidth: "2.5rem",
    },
    stepperRoot: {
        background: "none",
    },
    root: {},
}));

export const Carousel = (props) => {
    const { array, size, type } = props;
    const classes = useStyles();
    const [show, setShow] = useState(
        Array(size)
            .fill()
            .map((_, i) => i)
    );
    const [slide, setSlide] = useState(1);
    const maxSlide = array.length > 2 ? Math.floor(array.length / size) : 1;

    const incrementSlide = () => {
        setSlide(slide + 1);
        setShow(show.map((x) => x + size));
        console.log(show);
    };
    const decrementSlide = () => {
        setSlide(slide - 1);
        setShow(show.map((x) => x - size));
    };

    const displaySwitch = (type, data) => {
        switch (type) {
            case "program":
                return (
                    <Box
                        key={data.id}
                        style={{ margin: "0 auto", width: "auto" }}
                    >
                        <ProgramCard program={data} />
                    </Box>
                );

            case "meal":
                return (
                    <Box key={data.id} style={{ width: "auto" }}>
                        <MealCard meal={data} />
                    </Box>
                );

            case "store":
                return (
                    <Box key={data.id} style={{ width: "auto" }}>
                        <StoreItemDisplay item={data} />
                    </Box>
                );

            default:
                return null;
        }
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
                style={{
                    display: "flex",
                    flexWrap: "noWrap",
                    justifyContent: "center",
                }}
            >
                <GridList
                    style={
                        ({
                            display: "flex",
                            flexWrap: "noWrap",
                            overflowX: "hidden",
                            justifyContent: "space-between",
                            overflow: "auto",
                            width: "100%",
                        },
                        array.length > 0
                            ? type === "meal"
                                ? { minHeight: "21vh" }
                                : { minHeight: "40vh" }
                            : { minHeight: 0 })
                    }
                >
                    {show.map((element) => {
                        if (array[element]) {
                            return displaySwitch(type, array[element]);
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
                }}
            >
                <MobileStepper
                    variant="dots"
                    position="static"
                    activeStep={slide - 1}
                    steps={maxSlide}
                    classes={{ root: classes.stepperRoot }}
                />
            </Grid>
        </Grid>
    );
};
