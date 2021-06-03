import React from "react";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

//Components
import { Star } from "../icons/Star";
import { LocalConvenienceStoreOutlined } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({}));
const testRating = 4.7;

const whole = Math.floor(testRating);
const remainder = testRating % 1;
console.log(whole);
console.log(parseFloat(remainder.toFixed(1)));
const array = Array(whole)
    .fill()
    .map((x, i) => 1);
console.log(array);

export const Ratings = (props) => {
    const { rating } = props;
    const whole = Math.floor(rating);
    const remainder = parseFloat((rating % 1).toFixed(1));
    const classes = useStyles();
    const array = Array(whole)
        .fill()
        .map((x, i) => 1);
    array.push(remainder);
    console.log(array);

    return (
        <div>
            {array.map((item) => {
                return <Star fill={item} />;
            })}
        </div>
    );
};
