import React from "react";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

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
    const { image, title, price, count, type } = props;
    const classes = useStyles();

    return (
        <Grid container style={{ width: "20vw" }}>
            <Grid item xs={12} className={classes.imageContainer}>
                <img
                    src={image}
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
                    {title}
                </Grid>
                <Grid item xs={2}>
                    {price}
                </Grid>
                <Grid item xs={6}>
                    {`${count} ${type}s`}
                </Grid>
                <Grid item xs={6}></Grid>
            </Grid>
        </Grid>
    );
};
