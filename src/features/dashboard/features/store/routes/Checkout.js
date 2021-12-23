import React from "react";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Typography } from "@material-ui/core";

//Stripe
import { useStripe, CardElement, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

//Components
import { PaymentForm } from "../components/PaymentForm";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { createPaymentIntent, getPaymentMethods } from "../actions";

const stripePromise = loadStripe(
    "pk_test_51Hr3CTBp908J0ZFHC8eQsjRQ5jKJBLDuDCGR2lm78hOHmTZxgrJEAfxMff0oDMJ14oyyvADBVr5ivdx2ZdMWkbmb00lR0Vm7tB"
);

const useStyles = makeStyles((theme) => ({
    root: {},
    formContainer: {
        display: "flex",
        justifyContent: "flex-start",
    },
}));

export const Checkout = (props) => {
    const {} = props;
    const classes = useStyles();
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.store.cart);
    const userInfo = useSelector((state) => state.user.info);

    React.useEffect(() => {
        //Create Payment Intent as soon as the page loads
        if (userInfo.email) {
            if (userInfo.stripeId) {
                dispatch(
                    createPaymentIntent(
                        cartItems,
                        userInfo.stripeId,
                        "",
                        userInfo.storeId
                    )
                );
            } else {
                dispatch(
                    createPaymentIntent(
                        cartItems,
                        "",
                        userInfo.email,
                        userInfo.storeId
                    )
                );
            }
        }
    }, []);

    React.useEffect(() => {
        dispatch(getPaymentMethods(userInfo.stripeId));
    }, []);

    return (
        <Grid container className={classes.root}>
            <Grid
                item
                xs={12}
                style={{ justifyContent: "center", textAlign: "center" }}
            >
                <Typography variant="h5">Checkout</Typography>
            </Grid>
            <Grid container className={classes.formContainer}>
                <Grid item xs={12}>
                    <Typography>Items</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>Payment Methods</Typography>
                </Grid>
                <Typography>Billing Information</Typography>
            </Grid>
            {userInfo.stripeIntent && (
                <Elements
                    stripe={stripePromise}
                    options={{ clientSecret: userInfo.stripeIntent }}
                >
                    <PaymentForm />
                </Elements>
            )}
        </Grid>
    );
};
