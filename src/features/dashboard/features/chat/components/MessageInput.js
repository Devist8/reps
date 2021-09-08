import React from "react";

//Firebase
import { db, auth } from "../../../../../util/config";
import firebase from "firebase";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import {
    Grid,
    Card,
    CardMedia,
    CardContent,
    IconButton,
    Box,
    Input,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

//Redux
import { useSelector } from "react-redux";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    sendMessage: {
        position: "fixed",
        display: "flex",
        width: "75vw",
        bottom: 0,
        zIndex: 1,
        borderTop: "1px solid lightgray",
        marginLeft: "-5px",
        padding: "10px",
        paddingBottom: "30px",
        backgroundColor: "transparent",
    },
}));

export const MessageInput = (props) => {
    const { members, scroll, small } = props;
    const [message, setMessage] = React.useState();
    const user = useSelector((state) => state.user.info);
    const classes = useStyles();

    const sendMessage = async (e) => {
        e.preventDefault();

        await db.collection("messages").add({
            message: message,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),

            imageURL: user.imageURL,
            recipients: members.filter((member) => member !== user.id),
            sender: user.id,
            contacts: members,
            displayName: user.displayName,
        });
        setMessage("");
        scroll.current.scrollIntoView({ behavior: "smooth" });
    };
    return (
        <Grid container>
            <form onSubmit={sendMessage}>
                <Box
                    className={classes.sendMessage}
                    style={small && { marginBottom: "5vh" }}
                >
                    <TextField
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        style={small ? { width: "16vw" } : { width: "73vw" }}
                        fullWidth
                    />
                    <IconButton type="submit" size={small && "small"}>
                        <SendIcon />
                    </IconButton>
                </Box>
            </form>
        </Grid>
    );
};
