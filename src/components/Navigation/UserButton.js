import React from "react";
import { useLocation, Link } from "react-router-dom";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import {
    Card,
    CardMedia,
    CardContent,
    Grid,
    Avatar,
    Typography,
    Badge,
    IconButton,
    Menu,
    MenuItem,
} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ChatIcon from "@material-ui/icons/Chat";

//Redux
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    cardRoot: {
        width: "15vw",
        height: "3rem",
        borderRadius: "25px",
        backgroundColor: theme.palette.primary.main,
    },
    mealsCardRoot: {
        width: "15vw",
        height: "3rem",
        borderRadius: "25px",
        backgroundColor: theme.palette.meals.main,
    },
    content: {
        padding: 13,
        paddingRight: 10,
    },
}));

export const UserButton = () => {
    const info = useSelector((state) => state.user.info);
    const location = useLocation();
    const loading = useSelector((state) => state.user.loading);
    const [menu, setMenu] = React.useState(null);
    const classes = useStyles();
    return (
        <Card
            className={
                !location.pathname.includes("meals")
                    ? classes.cardRoot
                    : classes.mealsCardRoot
            }
        >
            <Grid container style={{ height: "5.7vh" }}>
                <Grid item xs={7} style={{ height: "5.7vh" }}>
                    <CardContent className={classes.content}>
                        <Typography>
                            {`Hi ${info.displayName.split(" ")[0]}`}
                        </Typography>
                    </CardContent>
                </Grid>
                <Grid
                    item
                    xs={2}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        height: "5.7vh",
                    }}
                >
                    {location.pathname.includes("store") ? (
                        <Badge>
                            <ShoppingCartIcon />
                        </Badge>
                    ) : (
                        <Badge>
                            <ChatIcon />
                        </Badge>
                    )}
                </Grid>
                <Grid
                    item
                    xs={3}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        height: "5.7vh",
                        justifyContent: "center",
                    }}
                >
                    <CardMedia>
                        <IconButton
                            style={{ padding: 0 }}
                            onClick={(e) =>
                                menu ? setMenu(null) : setMenu(e.currentTarget)
                            }
                        >
                            <Avatar src={info.imageURL} />
                            <Menu
                                anchorEl={menu}
                                keepMounted
                                open={!!menu}
                                style={{ marginTop: "3.5vh" }}
                            >
                                <MenuItem component={Link} to="/profile">
                                    Profile
                                </MenuItem>
                                <MenuItem component={Link} to="/account">
                                    MyAccount
                                </MenuItem>
                                <MenuItem component={Link} to="/settings">
                                    Settings
                                </MenuItem>
                                <MenuItem>Lougout</MenuItem>
                            </Menu>
                        </IconButton>
                    </CardMedia>
                </Grid>
            </Grid>
        </Card>
    );
};
