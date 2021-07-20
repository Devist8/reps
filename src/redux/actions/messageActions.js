import { SET_RECENT_MESSAGES } from "../types";
import axios from "axios";

import firebase from "firebase";

import { db, auth } from "../../util/config";

export const getRecentMessages = (id) => (dispatch) => {
    const messageFilter = (contacts, messages) => {
        let matches = 0;
        const array = [];

        messages.reverse().filter((message) => {
            console.log(message.sender === id);
            console.log(id);
            if (message.sender !== id) {
                message.contacts.forEach((contact) => {
                    contacts.forEach((item) => {
                        return item === contact && matches + 1;
                    });
                });
                return matches > 0 ? false : array.push(message);
            }
        });
        return array;
    };

    db.collection("messages")
        .where("contacts", "array-contains", id.toString())
        .orderBy("createdAt")
        .onSnapshot((snapshot) => {
            const messages = [];
            console.log(snapshot.docs);
            snapshot.docs.reverse().map((doc) => {
                console.log(doc.data());
                console.log(messageFilter(doc.data().contacts, messages));
                return (
                    (messageFilter(doc.data().contacts, messages).length ===
                        0) &
                        (doc.data().sender !== id) && messages.push(doc.data())
                );
            });
            console.log(messages);
            dispatch({ type: SET_RECENT_MESSAGES, payload: messages });
        });

    axios
        .get("/messages")
        .then((res) => console.log(res.data))
        .catch((err) => console.error(err));
};
