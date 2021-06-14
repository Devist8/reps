import React from "react";
import { Link } from "react-router-dom";

//MUI
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
    Grid,
    GridListTile,
    ButtonBase,
    GridListTileBar,
    FormControl,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import FavoriteIcon from "@material-ui/icons/Favorite";

const StyledRating = withStyles({
    iconFilled: {
        color: "#ff6d75",
    },
    iconHover: {
        color: "#ff3d47",
    },
})(Rating);

const useStyles = makeStyles((theme) => ({
    buttonBase: {
        color: "green",
    },
}));

export const MealCard = (props) => {
    const { meal } = props;
    const classes = useStyles();
    console.log(meal.id);
    return (
        <GridListTile
            key={meal.id}
            key={meal.imageURL}
            cols={1}
            component={Link}
            to={`/meals/${meal.id}`}
            style={{
                width: "20vw",
                height: "20vh",
                margin: "0 0.4vw",
                borderRadius: "8px",
            }}
        >
            <FormControl>
                <ButtonBase
                    className={classes.buttonBase}
                    children={
                        <img
                            src={meal.imageURL}
                            alt={meal.title}
                            style={{
                                width: "20vw",
                                height: "20vh",
                                borderRadius: "8px",
                            }}
                        />
                    }
                />
            </FormControl>
            <GridListTileBar
                title={meal.title}
                style={{ borderRadius: "0 0 8px 8px" }}
                subtitle={
                    <StyledRating
                        readOnly
                        name="customized-color"
                        defaultValue={meal.rating}
                        getLabelText={(value) =>
                            `${value} Heart${value !== 1 ? "s" : ""}`
                        }
                        precision={0.5}
                        icon={<FavoriteIcon fontSize="inherit" />}
                    />
                }
            />
        </GridListTile>
    );
};
