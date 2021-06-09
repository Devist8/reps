import React from "react";
import { Link } from "react-router-dom";

//MUI
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
    useMediaQuery,
    GridList,
    GridListTile,
    GridListTileBar,
    IconButton,
    ButtonBase,
    CardActionArea,
} from "@material-ui/core";
import TouchRipple from "@material-ui/core/ButtonBase/TouchRipple.js";
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

export const MealCardList = (props) => {
    const { meals } = props;
    const classes = useStyles();

    return (
        <GridList cellHeight={180} cols={3}>
            {meals.map((meal) => {
                return (
                    <GridListTile
                        key={meal.id}
                        key={meal.imageURL}
                        cols={1}
                        component={Link}
                        to={`/meals/${meal.id}`}
                    >
                        <ButtonBase style={{ width: "100%" }}>
                            <img
                                src={meal.imageURL}
                                alt={meal.title}
                                style={{ width: "100%", height: "inherit" }}
                            />
                        </ButtonBase>
                        <GridListTileBar
                            title={meal.title}
                            subtitle={
                                <StyledRating
                                    readOnly
                                    name="customized-color"
                                    defaultValue={meal.rating}
                                    getLabelText={(value) =>
                                        `${value} Heart${
                                            value !== 1 ? "s" : ""
                                        }`
                                    }
                                    precision={0.5}
                                    icon={<FavoriteIcon fontSize="inherit" />}
                                />
                            }
                        />
                    </GridListTile>
                );
            })}
        </GridList>
    );
};
