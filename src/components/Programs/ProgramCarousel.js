import React, { useState } from "react";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import {
    Grid,
    IconButton,
    GridList,
    GridListTile,
    MobileStepper,
} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

//Components
import { ProgramCard } from "./ProgramCard";

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
    },
}));

export const ProgramCarousel = (props) => {
    const {} = props;
    const programs = useSelector((state) => state.data.programs);
    const classes = useStyles();
    const [show, setShow] = useState([0, 1, 2]);
    const [slide, setSlide] = useState(1);
    const maxSlide = Math.floor(programs.length / 3) + 1;

    /*const changeProgramsShown = () => ({
        //setShow([0 + slide * 3, 1 + slide * 3, 2 + slide * 3]);
        console.log(slide);
        console.log(show);
    });*/
    const calculateNewShowArray = () => {
        const newArray = [];
        for (const item of show) {
            newArray.push(item + slide * 3);
        }

        return newArray;
    };

    const incrementSlide = () => {
        setSlide(slide + 1);

        setShow(calculateNewShowArray());
    };
    const decrementSlide = () => {
        setSlide(slide - 1);
        console.log(slide);
        setShow(calculateNewShowArray());
    };

    return (
        <Grid container style={{ width: "75vw" }}>
            <Grid item xs={1} className={classes.arrowContainer}>
                <IconButton onClick={decrementSlide} disabled={slide === 1}>
                    <ArrowBackIosIcon />
                </IconButton>
            </Grid>
            <Grid item xs={10}>
                <GridList>
                    {show.map((element) => {
                        if (programs[element]) {
                            return (
                                <ProgramCard
                                    program={programs[element]}
                                    key={programs[element].id}
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
                }}
            >
                <MobileStepper
                    variant="dots"
                    position="static"
                    activeStep={slide}
                    steps={maxSlide}
                    classes={{ root: classes.stepperRoot }}
                />
            </Grid>
        </Grid>
    );
};
