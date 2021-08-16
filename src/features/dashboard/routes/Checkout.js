import React from "react";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";

//Stripe
import { useStripe, CardElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

//Components
import { PaymentForm } from "../../components/Store/PaymentForm";

const useStyles = makeStyles((theme) => ({}));

export const Checkout = (props) => {
    const {} = props;
    const classes = useStyles();
    const stripe = useStripe();

    return (
        <Grid container className={classes.root}>
            <PaymentForm />
        </Grid>
    );
};
