import React from "react";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Typography } from "@material-ui/core";

//Components
import { MealForm } from "../../components/Meals/MealForm";
import { MealCarousel } from "../../components/Meals/MealCarousel";
import { Carousel } from "../../components/Carousel";

//Redux
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: { padding: "25px" },
    creatorContainer: {
        boxShadow:
            "0px 3px 1px -2px rgb(0 0 0 / 14%), 0px 2px 2px 0px rgb(0 0 0 / 12%), 0px 1px 5px 0px rgb(0 0 0 / 10%)",
    },
    buttonContainer: {
        backgroundColor: theme.palette.meals.main,
        textAlign: "center",
        justifyContent: "center",
        display: "flex",
        flexWrap: "noWrap",
    },
    dinners: {
        marginTop: "2vh",
        width: "100%",
    },
    creator: {},
}));

export const Meals = (props) => {
    const {} = props;
    const meals = useSelector((state) => state.data.meals);
    const [creator, setCreator] = React.useState(false);
    const classes = useStyles();

    const dinners = meals.filter((meal) => meal.type === "dinner");
    const snacks = meals.filter((meal) => meal.type === "snack");
    const breakfast = meals.filter((meal) => meal.type === "breakfast");
    const lunch = meals.filter((meal) => meal.type === "lunch");

    console.log(lunch);
    return (
        <Grid container className={classes.root}>
            <Grid item xs={12} className={classes.creatorContainer}>
                <Grid item xs={12} className={classes.buttonContainer}>
                    <Button name="newMeal" onClick={() => setCreator(!creator)}>
                        Create New Meal
                    </Button>
                </Grid>
                <Grid item xs={12} className={classes.creator}>
                    {creator && <MealForm />}
                </Grid>
            </Grid>
            <Grid item xs={12} className={classes.body}>
                <Grid item xs={12} className={classes.breakfast}>
                    <Grid item xs={12}>
                        <Typography>Get your day started</Typography>
                    </Grid>
                    <Carousel array={breakfast} type="meal" size={3} />
                </Grid>
                <Grid item xs={12} className={classes.lunch}>
                    <Grid item xs={12}>
                        <Typography>What's for lunch?</Typography>
                    </Grid>
                    <Carousel array={lunch} type="meal" size={3} />
                </Grid>
                <Grid item xs={12} className={classes.snacks}>
                    <Grid item xs={12}>
                        <Typography>Take a snack break.</Typography>
                    </Grid>
                    <Carousel array={snacks} type="meal" size={3} />
                </Grid>
                <Grid item xs={12} className={classes.dinners}>
                    <Grid item xs={12}>
                        <Typography>Dinner Ideas</Typography>
                    </Grid>
                    <Carousel
                        array={dinners}
                        type="meal"
                        size={3}
                        edit={true}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};
