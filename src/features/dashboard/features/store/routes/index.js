import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AuthRoute from "../../../../../util/AuthRoute";

import { Cart } from "./Cart";
import { Checkout } from "./Checkout";
import { Store } from "./Store";

export const StoreRoutes = () => {
    return (
        <Router>
            <AuthRoute exact path="" component={Store} />
            <AuthRoute exact path="/cart" component={Cart} />
            <AuthRoute exact path="/checkout" component={Checkout} />
        </Router>
    );
};
