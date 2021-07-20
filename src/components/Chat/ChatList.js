import React from "react";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import {
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
} from "@material-ui/core";

//Redux
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({}));

export const ChatList = (props) => {
    const { setContacts } = props;
    const recentMessages = useSelector((state) => state.data.recentMessages);
    const classes = useStyles();

    console.log(recentMessages);
    return (
        <Grid container>
            <List style={{ width: "100%" }}>
                {recentMessages.map((message) => {
                    return (
                        <ListItem
                            button
                            style={{ width: "100%" }}
                            onClick={(e) => setContacts(message.contacts)}
                        >
                            <ListItemAvatar>
                                <Avatar src={message.imageURL} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={message.displayName}
                                secondary={message.message}
                            />
                        </ListItem>
                    );
                })}
            </List>
        </Grid>
    );
};
