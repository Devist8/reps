import React from "react";

//Firebase
import { db, auth } from "../../../../../util/config";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import {
    Grid,
    Avatar,
    Box,
    Typography,
    Card,
    CardContent,
    CardMedia,
    IconButton,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

//Redux
import { useSelector, useDispatch } from "react-redux";

//Components
import { MessageInput } from "./MessageInput";

const useStyles = makeStyles((theme) => ({
    messages: {
        margin: "10vh 0",
        display: "flex",
        flexDirection: "column",
    },
    message: {
        display: "flex",
        padding: "20px 10px 0 20px",
        margin: "50px",
        boxShadow: "0 0 10px rgb(164, 164, 164)",
        alignItems: "center",
    },
    sent: {
        backgroundColor: theme.palette.primary.main,
        color: "white",
        paddingLeft: "12px",
        float: "right",
    },
    received: {
        border: "1px solid lightgray",
        backgroundColor: "#FAFAFA",
        paddingRight: "12px",
        float: "left",
    },
    smallText: {
        fontSize: "0.85rem",
    },
}));

export const Chat = (props) => {
    const { members, small, setContacts } = props;
    const classes = useStyles();
    const scroll = React.useRef();
    const user = useSelector((state) => state.user.info);
    const [messages, setMessages] = React.useState([]);

    React.useEffect(() => {
        db.collection("messages")
            .where("contacts", "==", [...members])
            .orderBy("createdAt")
            .limit(50)
            .onSnapshot((snapshot) => {
                console.log(snapshot.docs);
                setMessages(snapshot.docs.map((doc) => doc.data()));
            });
    }, []);

    return (
        <Box style={{ width: "75vw", padding: "10px" }}>
            {setContacts && (
                <IconButton onClick={(e) => setContacts([])}>
                    <ArrowBackIcon />
                </IconButton>
            )}
            <Box className={classes.messages}>
                {messages.length > 0 &&
                    messages.map((message, i) => (
                        <Box style={{ dispaly: "flex" }}>
                            <Box>
                                {/*messages.length > 1 &&
                                    messages[i - 1].sender !==
                                        message.sender && (
                                        <Typography>
                                            {message.displayName}
                                        </Typography>
                                        )*/}

                                {message.sender === user.id ? (
                                    <Card
                                        style={
                                            small
                                                ? {
                                                      display: "flex",
                                                      maxWidth: "none",
                                                      borderRadius: "30px",
                                                      margin: "5px",
                                                  }
                                                : {
                                                      display: "flex",
                                                      margin: "5px",
                                                      borderRadius: "30px",
                                                      maxWidth: "40%",
                                                  }
                                        }
                                        className={classes.sent}
                                    >
                                        <CardContent
                                            style={{
                                                padding: "8px",
                                                margin: "auto",
                                            }}
                                        >
                                            <Typography
                                                className={
                                                    small && classes.smallText
                                                }
                                            >
                                                {message.message}
                                            </Typography>
                                        </CardContent>
                                        <CardMedia
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                alignContent: "center",
                                                margin: "auto",
                                                padding: "8px",
                                            }}
                                        >
                                            <Avatar
                                                src={message.imageURL}
                                                style={{
                                                    height: "2.2vw",
                                                    width: "2.2vw",
                                                }}
                                            />
                                        </CardMedia>
                                    </Card>
                                ) : (
                                    <Card
                                        Card
                                        style={
                                            small
                                                ? {
                                                      display: "flex",
                                                      maxWidth: "none",
                                                      borderRadius: "30px",
                                                      margin: "5px",
                                                  }
                                                : {
                                                      display: "flex",
                                                      margin: "5px",
                                                      borderRadius: "30px",
                                                      maxWidth: "40%",
                                                  }
                                        }
                                        className={classes.received}
                                    >
                                        <CardMedia
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                alignContent: "center",

                                                padding: "8px",
                                            }}
                                        >
                                            <Avatar
                                                src={message.imageURL}
                                                style={{
                                                    height: "2.2vw",
                                                    width: "2.2vw",
                                                }}
                                            />
                                        </CardMedia>
                                        <CardContent
                                            style={{
                                                padding: "8px",
                                                margin: "auto",
                                            }}
                                        >
                                            <Typography
                                                className={
                                                    small && classes.smallText
                                                }
                                            >
                                                {message.message}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                )}
                            </Box>
                        </Box>
                    ))}

                <MessageInput members={members} scroll={scroll} small={small} />
                <Box ref={scroll}></Box>
            </Box>
        </Box>
    );
};
