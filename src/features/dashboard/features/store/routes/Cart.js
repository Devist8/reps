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
} from "@material-ui/core";

//Redux
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
    ...theme.spreadStyles,
}));

export const Cart = (props) => {
    const {} = props;
    const classes = useStyles();
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.data.store.cart);
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
            <Grid item xs={12}>
                <List>
                    {cartItems.map((item) => {
                        return (
                            <Grid container className={classes.centerX}>
                                <ListItem className={classes.centerX}>
                                    <Grid item xs={1}>
                                        <ListItemAvatar>
                                            <Avatar
                                                style={{ borderRadius: 0 }}
                                                src={item.imageURL}
                                                alt={item.title}
                                            />
                                        </ListItemAvatar>
                                    </Grid>
                                    <Grid item xs={5}>
                                        <Typography>{item.title}</Typography>
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
                                        <Typography>${item.price}</Typography>
                                    </Grid>
                                </ListItem>
                                <Grid item xs={10}>
                                    <Divider
                                        style={{
                                            backgroundColor: "rgba(0,0,0,0.3)",
                                            height: 2,
                                            width: "100%",
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        );
                    })}
                    <Grid container className={classes.centerX}>
                        <Grid item xs={9}>
                            <Typography>Total:</Typography>
                        </Grid>
                        <Grid item xs={1} className={classes.centerX}>
                            ${total}
                        </Grid>
                    </Grid>
                </List>
            </Grid>
        </Grid>
    );
};
