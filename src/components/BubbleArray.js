import React from "react";
import { useLocation } from "react-router-dom";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Chip, GridList, GridListTile } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    bubbleArray: {
        margin: "auto",
        alignContent: "center",
        alignItems: "center",
        textAlign: "center",
        display: "flex",
    },
    bubbleContainer: {
        margin: "auto",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",

        width: "50px",
    },
    bubbleLabel: {
        whiteSpace: "normal",
        padding: 2,
    },
    bubble: {
        padding: 5,
        margin: "auto",
        boxShadow: "2px 2px 3px -2px rgba(0,0,0,0.40)",
    },
}));

export const BubbleArray = (props) => {
    const { array, itemType, selectedArray, addHandler, color, rr } = props;
    const classes = useStyles();
    const location = useLocation();

    return (
        <Grid container spacing={1} className={classes.bubbleArray}>
            {array.map((item) => {
                return (
                    <Grid item xs={3} className={classes.bubbleContainer}>
                        <Chip
                            label={item}
                            clickable={addHandler ? true : false}
                            color={color ? color : "primary"}
                            disabled={
                                selectedArray && selectedArray.includes(item)
                            }
                            onClick={
                                addHandler &&
                                ((e) => {
                                    e.target.name = itemType;
                                    e.target.value = item;
                                    addHandler(e);
                                })
                            }
                            className={classes.bubble}
                            classes={{ label: classes.bubbleLabel }}
                            style={
                                color === "secondary"
                                    ? { color: "black" }
                                    : location.pathname.includes("meal")
                                    ? {
                                          backgroundColor: "#b1fcb9",
                                      }
                                    : { color: "white" }
                            }
                        />
                    </Grid>
                );
            })}
        </Grid>
    );
};
