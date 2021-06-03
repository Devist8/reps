import React from "react";

//MUI
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
    Grid,
    Typography,
    List,
    ListItem,
    ListItemText,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import FavoriteIcon from "@material-ui/icons/Favorite";

//Redux
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({}));

const StyledRating = withStyles({
    iconFilled: {
        color: "#ff6d75",
    },
    iconHover: {
        color: "#ff3d47",
    },
})(Rating);

export const Meal = (props) => {
    const {} = props;
    const classes = useStyles();
    const meals = useSelector((state) => state.data.meals);
    const mealId = props.match.params.mealId;
    const meal = meals.filter((meal) => meal.id === mealId);
    console.log(meal);

    return (
        <Grid container>
            <Grid container xs={12}>
                <Grid item xs={12}>
                    <Typography variant="h4">{meal[0].title}</Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                    style={{ display: "flex", flexWrap: "noWrap" }}
                >
                    <StyledRating
                        readOnly
                        name="customized-color"
                        defaultValue={meal[0].rating}
                        getLabelText={(value) =>
                            `${value} Heart${value !== 1 ? "s" : ""}`
                        }
                        precision={0.5}
                        icon={<FavoriteIcon fontSize="inherit" />}
                    />
                    <Typography
                        style={{ marginLeft: "1vw" }}
                        variant="subtitle2"
                    >{`${meal[0].rating} Rating`}</Typography>
                </Grid>
            </Grid>
            <Grid
                container
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    marginTop: "6vh",
                }}
                spacing={3}
            >
                <Grid item md={4} xs={6}>
                    <img
                        src={meal[0].imageURL}
                        style={{ width: "100%", height: "100%" }}
                    />
                </Grid>
                <Grid item md={4} xs={6}>
                    <Typography variant="h6">Ingredients</Typography>
                    <List>
                        {meal[0].ingredients.map((ingredient) => {
                            return (
                                <ul
                                    style={{
                                        listStyleType: "none",
                                        paddingLeft: 0,
                                    }}
                                >
                                    <li>{ingredient}</li>
                                </ul>
                            );
                        })}
                    </List>
                </Grid>
                <Grid item md={4} xs={12}>
                    <Typography variant="h6">Directions</Typography>
                    <ol
                        style={{
                            paddingLeft: 15,
                        }}
                    >
                        {meal[0].directions.map((step) => {
                            return <li>{step}</li>;
                        })}
                    </ol>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h1">Related items</Typography>
                </Grid>
            </Grid>
        </Grid>
    );
};
