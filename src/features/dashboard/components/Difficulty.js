import React from "react";

//MUI
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

//Icons
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";

const StyledRating = withStyles({
    iconFilled: {
        color: "#000",
    },
})(Rating);

export const Difficulty = (props) => {
    const { small, editDifficulty } = props;
    const difficulty = props.difficulty.toString();

    return (
        <Box>
            <StyledRating
                readOnly={!editDifficulty}
                name="customized-color"
                defaultValue={difficulty}
                size={small && "small"}
                onChange={(e, newValue) => {
                    e.target.name = "difficulty";
                    e.target.value = newValue;
                    editDifficulty(e);
                }}
                precision={0.5}
                style={small && { fontSize: "0.8rem" }}
                icon={<FitnessCenterIcon fontSize="inherit" />}
            />
        </Box>
    );
};
