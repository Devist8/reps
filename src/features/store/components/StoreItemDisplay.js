import React from "react";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button } from "@material-ui/core";

import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/storeActions";

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
    const { item } = props;
    const { imageURL, title, price, count, type } = item;
    const dispatch = useDispatch();
    const classes = useStyles();

    const handleCartAdd = (item) => {
        dispatch(addToCart(item));
    };

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
                <Grid item xs={6}>
                    <Typography>{type}</Typography>
                </Grid>
                <Grid
                    item
                    xs={6}
                    style={{ display: "flex", justifyContent: "flex-end" }}
                >
                    <Button
                        color="primary"
                        variant="outlined"
                        style={{ textTransform: "none" }}
                        onClick={() => handleCartAdd(item)}
                    >
                        Add to Cart
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
};
