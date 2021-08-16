import React from "react";

//MUI
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
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

const useStyles = makeStyles((theme) => ({}));

export const Ratings = (props) => {
    const { small, editRating, rating } = props;

    return (
        <Box>
            <StyledRating
                readOnly={!editRating}
                name="rating"
                defaultValue={rating}
                size={small && "small"}
                precision={0.5}
                style={small && { fontSize: "1rem" }}
                icon={<FavoriteIcon fontSize="inherit" />}
                onChange={(e, newValue) => {
                    e.target.value = newValue;
                    editRating(e);
                }}
            />
        </Box>
    );
};
