import React from "react";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";

//Stripe
import { useStripe, CardElement } from "@stripe/react-stripe-js";
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

export const PaymentForm = (props) => {
    const {} = props;
    const [success, setSuccess] = React.useState(false);
    const classes = useStyles();

    return (
        <Grid container className={classes.root}>
            <Grid item xs={6} className={classes.formContainer}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                border: "2px solid",
                                fontSize: "16px",
                                color: "#424770",
                                "::placeholder": {
                                    color: "#aab7c4",
                                },
                            },
                            invalid: {
                                color: "#9e2146",
                            },
                        },
                    }}
                />
            </Grid>
            <Grid item xs={12} className={classes.buttonContainer}>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.payButton}
                >
                    Pay
                </Button>
            </Grid>
        </Grid>
    );
};
