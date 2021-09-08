import React, { useState } from "react";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import {
    Grid,
    IconButton,
    GridList,
    MobileStepper,
    Box,
    Modal,
} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import AddCircleIcon from "@material-ui/icons/AddCircle";

//Components
import { ProgramCard } from "./ProgramCard";
import { MealCard } from "../features/meals/components/MealCard";
import { StoreItemDisplay } from "../features/store/components/StoreItemDisplay";
import { AddToStoreModal } from "./AddToStoreModal";

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
    const { array, size, type, edit, setState } = props;

    const classes = useStyles();
    const [show, setShow] = useState(
        Array(size)
            .fill()
            .map((_, i) => i)
    );
    const [slide, setSlide] = useState(1);
    const [storeModal, setStoreModal] = React.useState(false);
    const maxSlide = array.length > size ? Math.ceil(array.length / size) : 1;

    const incrementSlide = () => {
        setSlide(slide + 1);
        setShow(show.map((x) => x + size));
    };
    const decrementSlide = () => {
        setSlide(slide - 1);
        setShow(show.map((x) => x - size));
    };

    const addToCarousel = (item) => {
        setState((prevState) => ({
            ...prevState,
            items: [...prevState.items, item],
        }));
    };

    React.useEffect(() => {
        setShow(
            Array(size)
                .fill()
                .map((_, i) => i)
        );
    }, [array]);

    const displaySwitch = (type, data) => {
        {
            switch (type) {
                case "program":
                    return (
                        <Box key={data.id}>
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
        }
    };

    const invisibleSwitch = (type) => {
        switch (type) {
            case "program":
                return (
                    <Box
                        key={`${type}-invisible`}
                        style={{
                            width: "20vw",

                            display: "invisible",
                        }}
                    />
                );
            case "meal":
                return (
                    <Box
                        key={`${type}-invisible`}
                        style={{
                            width: "20vw",
                            height: "20vh",
                            display: "invisible",
                        }}
                    />
                );

            case "store":
                return (
                    <Box
                        key={`${type}-invisible`}
                        style={{
                            width: "20vw",
                            height: "18vh",
                            display: "invisible",
                        }}
                    />
                );

            default:
                return null;
        }
    };

    return (
        <Grid container className={classes.root}>
            <Box style={{ display: "flex", flexWrap: "nowrap", width: "100%" }}>
                <Box className={classes.arrowContainer}>
                    <IconButton onClick={decrementSlide} disabled={slide === 1}>
                        <ArrowBackIosIcon />
                    </IconButton>
                </Box>
                <Grid
                    item
                    xs={12}
                    style={{
                        display: "flex",
                        flexWrap: "noWrap",
                        justifyContent: "center",
                    }}
                >
                    <GridList
                        style={
                            ({},
                            array.length > 0
                                ? type !== "program"
                                    ? {
                                          minHeight: "30vh",
                                          display: "flex",
                                          alignContent: "center",
                                          alignItems: "center",
                                          justifyContent: "center",
                                      }
                                    : {
                                          minHeight: "40vh",
                                          marginRight: "3vw",
                                          display: "flex",
                                          flexWrap: "nowrap",
                                      }
                                : { minHeight: 0 })
                        }
                    >
                        {show.map((element) => {
                            if (array[element]) {
                                return displaySwitch(type, array[element]);
                            } else if (edit) {
                                return (
                                    <Box
                                        style={{
                                            width: "18vw",
                                            height: "18vh",
                                            backgroundColor: "lightgray",
                                            borderRadius: "15px",
                                            display: "flex",
                                        }}
                                    >
                                        <IconButton
                                            onClick={() => setStoreModal(true)}
                                            style={{
                                                display: "flex",
                                                margin: "auto",
                                            }}
                                        >
                                            <AddCircleIcon />
                                        </IconButton>
                                    </Box>
                                );
                            } else {
                                return invisibleSwitch(type);
                            }
                        })}
                    </GridList>
                </Grid>
                <Box className={classes.arrowContainer}>
                    <IconButton
                        onClick={incrementSlide}
                        disabled={slide === maxSlide || array.length / size < 1}
                    >
                        <ArrowForwardIosIcon />
                    </IconButton>
                </Box>
            </Box>
            <Grid
                item
                xs={12}
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
            <Modal
                open={storeModal}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                }}
                onClose={() => setStoreModal(false)}
            >
                <AddToStoreModal handleChange={setState} />
            </Modal>
        </Grid>
    );
};
