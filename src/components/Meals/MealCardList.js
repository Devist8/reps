import React from "react";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import {
    useMediaQuery,
    GridList,
    GridListTile,
    GridListTileBar,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({}));

export const MealCard = (props) => {
    const {} = props;
    const classes = useStyles();

    return <GridList container></GridList>;
};
