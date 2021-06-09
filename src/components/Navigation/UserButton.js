import React from "react";
import { useLocation } from "react-router-dom";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import {
    Card,
    CardMedia,
    CardContent,
    Grid,
    Avatar,
    Typography,
} from "@material-ui/core";

//Redux
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    cardRoot: {
        width: "13rem",
        height: "3rem",
        borderRadius: "25px",
        backgroundColor: theme.palette.primary.main,
    },
    mealsCardRoot: {
        width: "13rem",
        height: "3rem",
        borderRadius: "25px",
        backgroundColor: theme.palette.meals.main,
    },
    content: {
        padding: 13,
    },
}));

export const UserButton = () => {
    const info = useSelector((state) => state.user.info);
    const location = useLocation();
    const loading = useSelector((state) => state.user.loading);
    const classes = useStyles();
    return (
        <Card
            className={
                !location.pathname.includes("meals")
                    ? classes.cardRoot
                    : classes.mealsCardRoot
            }
        >
            <Grid container>
                <Grid item xs={8}>
                    <CardContent className={classes.content}>
                        <Typography>
                            {`Hi ${info.displayName.split(" ")[0]}`}
                        </Typography>
                    </CardContent>
                </Grid>
                <Grid item xs={2}>
                    <CardMedia>
                        <Avatar
                            src={info.imageURL}
                            style={{
                                marginLeft: "1.5rem",
                                marginTop: "0.3rem",
                            }}
                        />
                    </CardMedia>
                </Grid>
            </Grid>
        </Card>
    );
};
