import React from "react";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box, Typography, Slide } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: { position: "relative", width: "100%" },
    imageContainer: {
        position: "absolute",
        width: "100%",
        overflow: "hidden",
    },
    overlayContainer: {
        position: "absolute",
        top: "30vh",

        backgroundColor: "rgba(62, 62, 62, 0.4)",
        width: "99.9%",
        marginLeft: "1.5px",
        height: "20vh",
    },
}));

export const OverlayImage = (props) => {
    const { image, title, body, align, color } = props;
    const classes = useStyles();
    console.log(align);
    return (
        <Grid container className={classes.root}>
            <Grid item xs={12} className={classes.imageContainer}>
                <img src={image} style={{ height: "50vh", width: "100%" }} />
            </Grid>
            <Grid item xs={12} className={classes.overlayContainer}>
                <Typography
                    variant="h4"
                    style={
                        align === "left"
                            ? { paddingLeft: "2.5vw", marginBottom: "5vh" }
                            : { paddingLeft: "40vw", marginBottom: "2vh" }
                    }
                >
                    {title}
                </Typography>
                <Typography
                    variant="body1"
                    style={
                        align === "left"
                            ? { paddingLeft: "2.5vw" }
                            : { paddingLeft: "40vw" }
                    }
                >
                    {body}
                </Typography>
            </Grid>
        </Grid>
    );
};

export const StoreCarousel = (props) => {
    const { array } = props;
    const [index, setIndex] = React.useState(0);
    const classes = useStyles();

    React.useEffect(() => {
        setTimeout(
            () =>
                setIndex((prevIndex) =>
                    prevIndex === array.length - 1 ? 0 : prevIndex + 1
                ),
            10000
        );
        return () => {};
    }, [index]);

    return (
        <Grid container>
            <Grid item xs={12}>
                {array &&
                    array.map((item, i) => {
                        console.log(item);
                        return (
                            <Slide
                                direction="left"
                                in={i === index}
                                mountOnEnter
                                unmountOnExit
                            >
                                <Box>
                                    <OverlayImage
                                        image={item.imageURL}
                                        title={item.title}
                                        body={item.body}
                                        align={item.align}
                                    />
                                </Box>
                            </Slide>
                        );
                    })}
            </Grid>
        </Grid>
    );
};
