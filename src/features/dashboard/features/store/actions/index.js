import {
    ADD_STORE_ITEM,
    SET_STORE,
    UPDATE_STORE_INFO,
    SET_PROGRESS,
    UPDATE_NEW_PROGRAM,
    ADD_TO_CART,
    REMOVE_FROM_CART,
} from "../reducers/types";

import axios from "axios";
import firebase from "firebase";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const getStore = (id) => (dispatch) => {
    const cart = cookies.get("cart");
    axios
        .get(`/store/${id}`)
        .then((res) => {
            dispatch({
                type: SET_STORE,
                payload: cart
                    ? { ...res.data, cart: cart }
                    : { ...res.data, cart: [] },
            });
        })
        .catch((err) => console.error(err));
};

export const addToStore = (storeId, item) => (dispatch) => {
    axios
        .post(`/store/${storeId}`, item)
        .then((res) => {
            console.log("Added to store");
        })
        .catch((err) => console.error(err));
};

export const updateStoreSections = (newSection, file) => (dispatch) => {
    const storeId = newSection.store;

    delete newSection.preview;
    if (file) {
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(file.name);

        const fileUpload = fileRef.put(file);

        fileUpload.on(
            "state_changed",
            (snapshot) => {
                dispatch({
                    type: SET_PROGRESS,
                    payload:
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
                });
            },
            (error) => {
                console.error(error);
            },
            () => {
                fileUpload.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    const data = {
                        name: "videoURL",
                        value: downloadURL,
                    };
                    newSection.imageURL = downloadURL;

                    axios
                        .post(`/store/${storeId}/sections`, newSection)
                        .then((res) => {
                            console.log("Section successfully added");
                        })
                        .catch((err) => console.error(err));
                });
            }
        );
    } else {
        axios
            .post(`/store/${storeId}/sections`, newSection)
            .then((res) => {
                console.log("Section successfully added");
            })
            .catch((err) => console.error(err));
    }
};

export const deleteStore = (storeId) => (dispatch) => {
    axios
        .delete(`/stores/1EyMzvu0JeDcHuSa10JZ`)
        .then((res) => {
            console.log("store deleted");
        })
        .catch((err) => console.error(err));
};

export const addToCart = (item) => (dispatch) => {
    dispatch({ type: ADD_TO_CART, payload: item });
    const cart = cookies.get("cart");
    cart
        ? cookies.set("cart", [...cart, item], "/")
        : cookies.set("cart", [item], "/");
};

export const removeFromCart = (item) => (dispatch) => {
    console.log(item);
    dispatch({ type: REMOVE_FROM_CART, payload: item.itemId });

    let cart = cookies.get("cart");
    cart &&
        cookies.set(
            "cart",
            cart.filter((x) => x.itemId !== item.itemId)
        );

    console.log(cart);
};

export const createPaymentIntent =
    (items, customerId, email, storeId) => (dispatch) => {
        let newCustomerId;

        if (!customerId) {
            axios
                .post("/stripe/customer", { email: email })
                .then((customer) => {
                    newCustomerId = customer.data.customerId;
                    return axios.post("/user", { stripeId: newCustomerId });
                })
                .then((res) => {
                    return axios.post("/stripe/paymentIntent", {
                        items: items,
                        storeId: storeId,
                    });
                })
                .then((res) => {
                    console.log(res);
                    let clientIntent = res.data.clientSecret;
                    console.log(clientIntent);
                    dispatch({
                        type: "UPDATE_USER_DATA",
                        payload: { stripeIntent: clientIntent },
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            console.log("creating payment intent");
            axios
                .post("/stripe/paymentIntent", {
                    items: items,
                    storeId: storeId,
                })
                .then((res) => {
                    console.log(res);
                    let clientIntent = res.data.clientSecret;
                    console.log(clientIntent);
                    dispatch({
                        type: "UPDATE_USER_DATA",
                        payload: { stripeIntent: clientIntent },
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

export const getPaymentMethods = (customerId) => (dispatch) => {
    console.log("getting payment methods");
    axios
        .get(`/stripe/paymentMethods/${customerId}`)
        .then((res) => {
            console.log(res.data);
            let paymentMethods = res.data.paymentMethods;
            dispatch({
                type: "UPDATE_USER_DATA",
                payload: { paymentMethods: paymentMethods },
            });
        })
        .catch((err) => console.error(err));
};
