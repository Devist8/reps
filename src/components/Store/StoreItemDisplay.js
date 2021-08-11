import React from "react";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    imageContainer: {
        width: "20vw",
        height: "18vh",
        borderRadius: "8px",
    },
    contentContainer: {
        display: "flex",
        flexWrap: "wrap",
    },
}));

export const StoreItemDisplay = (props) => {
    const { imageURL, title, price, count, type } = props.item;
    const classes = useStyles();

    return (
        <Grid container style={{ width: "20vw" }}>
            <Grid item xs={12} className={classes.imageContainer}>
                <img
                    src={imageURL}
                    alt={title}
                    style={{
                        width: "20vw",
                        height: "18vh",
                        borderRadius: "15px",
                    }}
                />
            </Grid>
            <Grid item xs={12} className={classes.contentContainer}>
                <Grid item xs={10}>
                    <Typography>{title}</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography>{price}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>{type}</Typography>
                </Grid>
            </Grid>
        </Grid>
    );
};
