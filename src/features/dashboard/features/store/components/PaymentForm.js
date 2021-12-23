import React, { useState, useEffect } from "react";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { createPaymentIntent } from "../actions";

//Stripe
import {
    useStripe,
    useElements,
    CardElement,
    PaymentElement,
    Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    formContainer: {
        margin: "2vh 0",
        border: "2px solid #eee",
        padding: "1%",
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "center",
    },
    payButton: {
        marginTop: "2vh",
    },
}));

const stripePromise = loadStripe(
    "pk_test_51Hr3CTBp908J0ZFHC8eQsjRQ5jKJBLDuDCGR2lm78hOHmTZxgrJEAfxMff0oDMJ14oyyvADBVr5ivdx2ZdMWkbmb00lR0Vm7tB"
);

export const PaymentForm = (props) => {
    const {} = props;
    const dispatch = useDispatch();
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState("");
    const cartItems = useSelector((state) => state.store.cart);
    const userInfo = useSelector((state) => state.user.info);
    const classes = useStyles();
    const stripe = useStripe();
    const elements = useElements();

    let paymentIntent;
    useEffect(() => {
        //Create Payment Intent as soon as the page loads
        if (userInfo.stripeId) {
            paymentIntent = dispatch(
                createPaymentIntent(
                    cartItems,
                    userInfo.stripeId,
                    "",
                    userInfo.storeId
                )
            );
        } else {
            paymentIntent = dispatch(
                createPaymentIntent(
                    cartItems,
                    "",
                    userInfo.email,
                    userInfo.storeId
                )
            );
        }
    }, []);

    console.log(paymentIntent);
    const handleChange = async (event) => {};

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (userInfo.stripeIntent) {
            setProcessing(true);
            let element = elements.getElement(CardElement);
            console.log(element);
            const payload = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: element,
                },
            });
        }
    };

    return (
        <Grid container className={classes.root}>
            <Grid item xs={6} className={classes.formContainer}>
                <form
                    id="payment-form"
                    onSubmit={handleSubmit}
                    style={{ textAlign: "center" }}
                >
                    {userInfo.stripeIntent && (
                        <Grid>
                            <PaymentElement />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.payButton}
                            >
                                Pay
                            </Button>
                        </Grid>
                    )}
                </form>
            </Grid>
        </Grid>
    );
};
