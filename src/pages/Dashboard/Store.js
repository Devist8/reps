import React from "react";
import { Link } from "react-router-dom";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import {
    Grid,
    Box,
    Button,
    FormControlLabel,
    Typography,
    Switch,
    Modal,
    InputAdornment,
    TextField,
    GridList,
    GridListTile,
    Badge,
} from "@material-ui/core";
import { StoreItemDisplay } from "../../components/Store/StoreItemDisplay";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Skeleton from "@material-ui/lab/Skeleton";

//Components
import { StoreCarousel } from "../../components/Store/StoreCarousel";
import { Section } from "../../components/Store/Section";
import { Carousel } from "../../components/Carousel";
import { AddToStoreModal } from "../../components/Store/AddToStoreModal";
import { SectionHeader } from "../../components/Store/SectionHeader";

// React-redux
import { useSelector, useDispatch } from "react-redux";
import { deleteStore } from "../../redux/actions/storeActions";

const useStyles = makeStyles((theme) => ({
    ...theme.spreadStyles,
    root: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
    },
    storeNav: {
        backgroundColor: theme.palette.primary.main,
        display: "flex",
        flexWrap: "noWrap",
    },
    navButton: {
        margin: "0 0.5vw",
        whiteSpace: "noWrap",
        fontWeight: 600,
    },
}));

export const Store = (props) => {
    const {} = props;
    const classes = useStyles();
    const dispatch = useDispatch();
    const [edit, setEdit] = React.useState(false);

    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);
    const [category, setCategory] = React.useState("");
    const [categoryResults, setCategoryResults] = React.useState([]);
    const cartItems = useSelector((state) => state.data.store.cart);
    const user = useSelector((store) => store.user.info);
    const storeSections = useSelector((state) => state.data.store.sections);
    const storeId = useSelector((state) => state.data.store.info.storeId);
    const trainer = useSelector((store) => store.data.store.info.trainer);
    const inventory = useSelector((store) => store.data.store.inventory);

    const handleNavClick = (e) => {
        return setCategoryResults(
            inventory.filter(
                (x) =>
                    x.categories.includes(e.target.name) ||
                    x.type === e.target.name
            )
        );
    };
    const handleSearch = () => {
        const results = [];
        inventory.map((item) => {
            Object.values(item).map((value) => {
                typeof value === "string" &&
                    value.includes(searchTerm) &&
                    !results.includes(item) &&
                    results.push(item);
                Array.isArray(value) &&
                    value.map((x) => {
                        Array.isArray(x) &&
                            x.includes(searchTerm) &&
                            results.push(item);
                    });
            });
        });
        return setSearchResults(results);
    };

    const array = [
        {
            imageURL: "/sample.jpg",
            title: "New Ab Workouts",
            description:
                "Ab workouts perfect for the summer, with and without equipment.",
            align: "center",
        },
        {
            imageURL: "/beachbody-original.jpg",
            title: "Summer Program",
            align: "right",
            description: "Intense summer program to get you right.",
        },
        {
            imageURL: "/sample.jpg",
            title: "Another set of ab workouts",
            description:
                "Ab workouts perfect for the summer, with and without equipment.",
        },
    ];

    return (
        <Grid container>
            <Grid container>
                <Grid
                    item
                    xs={12}
                    className={classes.storeNav}
                    style={{ height: "5vh" }}
                >
                    <Grid item xs={8} className={classes.noWrap}>
                        <Button
                            name="Best Sellers"
                            className={classes.navButton}
                            onClick={(e) => {
                                e.target.name = "Best Sellers";
                                setCategory("Best Sellers");
                                handleNavClick(e);
                            }}
                        >
                            Best Sellers
                        </Button>
                        <Button
                            name="Trainer's Favorites"
                            className={classes.navButton}
                            onClick={(e) => {
                                e.target.name = "Trainer's Favorites";
                                setCategory("Trainer's Favorites");
                                handleNavClick(e);
                            }}
                        >
                            Trainer's Favorites
                        </Button>
                        <Button
                            name="Programs"
                            className={classes.navButton}
                            onClick={(e) => {
                                e.target.name = "program";
                                setCategory("program");
                                handleNavClick(e);
                            }}
                        >
                            Programs
                        </Button>
                        <Button
                            name="Workouts"
                            className={classes.navButton}
                            onClick={(e) => {
                                e.target.name = "workout";
                                setCategory("workout");
                                handleNavClick(e);
                            }}
                        >
                            Workouts
                        </Button>
                        <Button
                            name="Exercises"
                            className={classes.navButton}
                            onClick={(e) => {
                                e.target.name = "exercise";
                                setCategory("exercise");
                                handleNavClick(e);
                            }}
                        >
                            Exercises
                        </Button>

                        {user.id === trainer && (
                            <FormControlLabel
                                control={
                                    <Switch
                                        color="primary"
                                        checked={edit}
                                        onChange={() => setEdit(!edit)}
                                    />
                                }
                            />
                        )}
                    </Grid>
                    <Grid
                        item
                        xs={3}
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            alignContent: "center",
                        }}
                    >
                        <TextField
                            value={searchTerm}
                            name="searchTerm"
                            type="text"
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                handleSearch();
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={1} className={classes.centerXY}>
                        <Badge
                            badgeContent={cartItems.length}
                            color="secondary"
                            component={Link}
                            to="/cart"
                            style={{ textDecoration: "none", color: "black" }}
                        >
                            <ShoppingCartIcon />
                        </Badge>
                    </Grid>
                </Grid>
                <Grid container className={classes.root}>
                    {searchTerm ? (
                        <Grid container spacing={5}>
                            <Grid item xs={12} style={{ textAlign: "center" }}>
                                <Typography variant="h6">{`Results for: "${searchTerm}"`}</Typography>
                            </Grid>
                            <GridList
                                cellHeight="auto"
                                cols={3}
                                style={{ width: "100%", marginLeft: "2.8vw" }}
                            >
                                {searchResults.map((result) => (
                                    <GridListTile cols={1}>
                                        <StoreItemDisplay item={result} />
                                    </GridListTile>
                                ))}
                            </GridList>
                        </Grid>
                    ) : category ? (
                        <Grid container spacing={5} style={{ height: "30vh" }}>
                            <Grid item xs={12} style={{ textAlign: "center" }}>
                                <Typography variant="h6">{category}</Typography>
                            </Grid>
                            <GridList
                                cellHeight="auto"
                                cols={3}
                                style={{ width: "100%", marginLeft: "2.8vw" }}
                            >
                                {categoryResults.map((result) => (
                                    <GridListTile
                                        cols={1}
                                        style={{ height: "30vh" }}
                                    >
                                        <StoreItemDisplay item={result} />
                                    </GridListTile>
                                ))}
                            </GridList>
                        </Grid>
                    ) : (
                        <Grid container>
                            <Grid
                                item
                                xs={12}
                                style={{
                                    marginBottom: "10vh",
                                    height: "50vh",
                                    overflow: "hidden",
                                }}
                            >
                                <StoreCarousel array={array} />
                            </Grid>

                            <Grid item xs={12} style={{ padding: "0 1.5vw" }}>
                                {storeSections ? (
                                    storeSections.map((section) => {
                                        return (
                                            <Section
                                                section={section}
                                                edit={edit}
                                            />
                                        );
                                    })
                                ) : (
                                    <Grid
                                        container
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Skeleton
                                            variant="rect"
                                            width={"30vw"}
                                            height={"25vh"}
                                        />
                                    </Grid>
                                )}
                            </Grid>

                            {edit && (
                                <Grid item xs={12}>
                                    <Section edit />
                                </Grid>
                            )}
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </Grid>
    );
};
