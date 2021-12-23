import React from "react";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import {
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    Typography,
    Avatar,
    Divider,
    Button,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../actions";

const useStyles = makeStyles((theme) => ({
    ...theme.spreadStyles,
    itemAvatar: {
        width: "80%",
        height: "80%",
    },
}));

export const Cart = (props) => {
    const {} = props;
    const classes = useStyles();
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.store.cart);
    let total =
        cartItems.length > 0 &&
        cartItems.reduce((a, b) => a + parseFloat(b.price), 0.0).toFixed(2);

    return (
        <Grid container>
            <Grid
                item
                xs={12}
                style={{ display: "flex", justifyContent: "center" }}
            >
                <Typography variant="h3">Cart</Typography>
            </Grid>
            <Grid
                container
                xs={12}
                style={{ display: "flex", justifyContent: "center" }}
            >
                <List>
                    {cartItems.length > 0 ? (
                        cartItems.map((item) => {
                            return (
                                <Grid container className={classes.centerX}>
                                    <ListItem className={classes.centerX}>
                                        <Grid item xs={1}>
                                            <ListItemAvatar>
                                                <Avatar
                                                    style={{ borderRadius: 0 }}
                                                    className={
                                                        classes.itemAvatar
                                                    }
                                                    src={item.imageURL}
                                                    alt={item.title}
                                                />
                                            </ListItemAvatar>
                                        </Grid>
                                        <Grid item xs={5}>
                                            <Typography>
                                                {item.title}
                                            </Typography>
                                            <Typography>{item.type}</Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={4}
                                            style={{
                                                display: "flex",
                                                justifyContent: "flex-end",
                                            }}
                                        >
                                            <Typography>
                                                ${item.price}
                                            </Typography>
                                        </Grid>
                                        <Button
                                            onClick={() =>
                                                dispatch(removeFromCart(item))
                                            }
                                        >
                                            <Close />
                                        </Button>
                                    </ListItem>
                                </Grid>
                            );
                        })
                    ) : (
                        <Grid
                            item
                            style={{
                                display: "flex",
                                textAlign: "center",
                                marginTop: "10vh",
                                justifyContent: "center",
                                alignItems: "center",
                                alignContent: "center",
                            }}
                        >
                            <Typography
                                variant="h2"
                                style={{ fontWeight: 700 }}
                            >
                                There's Nothing Here...
                            </Typography>
                        </Grid>
                    )}
                    {cartItems.length > 0 && (
                        <Grid container className={classes.centerX}>
                            <Grid
                                item
                                xs={11}
                                style={{
                                    margin: "auto",
                                    textAlign: "center",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    alignContent: "center",
                                }}
                            >
                                <Divider
                                    style={{
                                        backgroundColor: "rgba(0,0,0,0.3)",
                                        height: 2,
                                        width: "94%",
                                        textAlign: "center",
                                        margin: "auto",
                                    }}
                                />
                            </Grid>
                            <Grid item xs={9}>
                                <Typography>Total:</Typography>
                            </Grid>
                            <Grid item xs={1} className={classes.centerX}>
                                ${total}
                            </Grid>
                        </Grid>
                    )}
                </List>
            </Grid>
        </Grid>
    );
};
