import React from "react";
import {
    mealLabels as labels,
    mealTypes,
    nutritionItems,
} from "../../util/static-data";

//MUI
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import {
    Grid,
    Typography,
    Badge,
    IconButton,
    Box,
    TextField,
    Select,
    Button,
    MenuItem,
    FormControl,
    LinearProgress,
    Divider,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";

//Components
import { Ratings } from "./Ratings";
import { BubbleArray } from "../BubbleArray";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { submitMeal } from "../../redux/actions/dataActions";
import { UPDATE_NEW_MEAL, SET_FILE, CLEAR_FILE } from "../../redux/types";

const useStyles = makeStyles((theme) => ({
    editImageIcon: {
        backgroundColor: "#A9ECB0",
    },
    headerContainer: {
        display: "flex",
        backgroundColor: theme.palette.meals.light,
        flexWrap: "noWrap",
        padding: "8px",
        boxShadow:
            "0px 3px 1px -2px rgb(0 0 0 / 10%), 0px 2px 2px 0px rgb(0 0 0 / 8%), 0px 1px 5px 0px rgb(0 0 0 / 6%)",
    },
    button: {
        backgroundColor: theme.palette.meals.main,
        "&:hover": {
            backgroundColor: theme.palette.meals.light,
        },
    },
    boxShadow: {
        width: "1200px",
        minHeight: "563px",
        backgroundColor: "#FAFDFF",
    },
    formContainer: {
        padding: "30px",
        boxShadow:
            "0px 3px 1px -2px rgb(0 0 0 / 6%), 0px 2px 2px 0px rgb(0 0 0 / 4%), 0px 1px 5px 0px rgb(0 0 0 / 2%)",
    },
    textField: {
        marginBottom: "1vh",
        display: "flex",
        flexWrap: "wrap",
    },
    submit: {
        display: "flex",
        flexWrap: "wrap",
        textAlign: "center",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
    },
    root: {},
    progressBar: {
        backgroundColor: "#A9ECB0",
    },
    textFieldRoot: {
        "& label.Mui-focused": {
            color: "springgreen",
        },
        "& .MuiInput-underline:after": {
            borderBottom: `2px solid springgreen`,
        },
    },
}));

export const MealForm = (props) => {
    const {} = props;
    const dispatch = useDispatch();
    const [preview, setPreview] = React.useState("");
    const [newIngredient, setNewIngredient] = React.useState("");
    const [newStep, setNewStep] = React.useState("");
    const [newNutrition, setNewNutrition] = React.useState({
        name: "",
        value: "",
    });
    const newMeal = useSelector((state) => state.data.newMeal);
    const file = useSelector((state) => state.data.file);
    const progress = useSelector((state) => state.ui.progress);
    const classes = useStyles();
    const theme = useTheme();

    const handleChange = (e) => {
        const data = {
            name: e.target.name,
            value: e.target.value,
        };

        dispatch({ type: UPDATE_NEW_MEAL, payload: data });
    };

    const handleFileChange = (e) => {
        e.persist();
        const reader = new FileReader();
        let file = e.target.files[0];

        if (file) {
            reader.onload = () => {
                if (reader.readyState === 2) {
                    dispatch({ type: SET_FILE, payload: file });
                    console.log(file);
                    setPreview(URL.createObjectURL(file));
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        } else {
            dispatch({ type: CLEAR_FILE, payload: file });
        }
    };

    const handleEditPicture = () => {
        const fileInput = document.getElementById("imageInput");
        fileInput.click();
    };

    const changeNewNutrition = (e) => {
        e.persist();

        if (e.target.name === "nutrition") {
            const newObject = { ...newNutrition, name: e.target.value };

            setNewNutrition(newObject);
        } else {
            setNewNutrition({ ...newNutrition, value: e.target.value });
        }
    };

    const handleFieldSubmit = (e) => {
        e.preventDefault();
        e.persist();
        e.target.value =
            e.target.name === "directions"
                ? Array.from([...newMeal.directions, newStep])
                : Array.from([...newMeal.ingredients, newIngredient]);
        handleChange(e);
        e.target.name === "directions" ? setNewStep("") : setNewIngredient("");
    };

    const handleNutritionSubmit = (e) => {
        e.preventDefault();
        e.persist();
        let newObject = {
            ...newMeal.nutrition,
            [newNutrition.name]: newNutrition.value,
        };
        setNewNutrition({
            name: "",
            value: "",
        });
        e.target.name = "nutrition";
        e.target.value = newObject;
        handleChange(e);
        setNewNutrition({
            name: "",
            value: "",
        });
    };

    const submit = () => {
        dispatch(submitMeal(newMeal, file));
    };
    return (
        <Grid container className={classes.root}>
            <Grid item xs={12} className={classes.headerContainer}>
                <Grid
                    item
                    xs={4}
                    style={{
                        margin: "1.5vh 1vw",
                        display: "flex",
                        flexWrap: "wrap",
                    }}
                >
                    <Badge
                        className={classes.editImage}
                        badgeContent={
                            <IconButton
                                size="small"
                                onClick={handleEditPicture}
                                className={classes.editImageIcon}
                            >
                                <EditIcon style={{ color: "black" }} />
                                <input
                                    type="file"
                                    id="imageInput"
                                    hidden="hidden"
                                    onChange={handleFileChange}
                                />
                            </IconButton>
                        }
                    >
                        {newMeal.imageURL || preview ? (
                            <img
                                src={
                                    newMeal.imageURL
                                        ? newMeal.imageURL
                                        : preview
                                }
                                alt={newMeal.id}
                                style={{
                                    width: "20vw",
                                    height: "20vh",
                                    boxShadow:
                                        "0px 3px 1px -2px rgb(0 0 0 / 10%), 0px 2px 2px 0px rgb(0 0 0 / 8%), 0px 1px 5px 0px rgb(0 0 0 / 6%)",
                                }}
                            />
                        ) : (
                            <Box
                                style={{
                                    width: "20vw",
                                    height: "20vh",
                                    margin: "1vh 0",
                                    backgroundColor: "white",
                                    display: "flex",
                                    textAlign: "center",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    boxShadow:
                                        "0px 3px 1px -2px rgb(0 0 0 / 10%), 0px 2px 2px 0px rgb(0 0 0 / 8%), 0px 1px 5px 0px rgb(0 0 0 / 6%)",
                                }}
                            />
                        )}
                    </Badge>
                </Grid>
                <Grid item xs={6} className={classes.textFields}>
                    <TextField
                        name="title"
                        label="Title"
                        margin="dense"
                        value={newMeal.title}
                        onChange={handleChange}
                        className={classes.textField}
                        style={{ width: "8vw" }}
                        classes={{ root: classes.textFieldRoot }}
                    />
                    <FormControl>
                        <Typography
                            variant="overline"
                            style={{ alignSelf: "start" }}
                        >
                            Rating
                        </Typography>
                        <Ratings
                            editRating={handleChange}
                            rating={newMeal.rating}
                        />
                    </FormControl>

                    <Box style={{ display: "flex", flexWrap: "wrap" }}>
                        <FormControl>
                            <Typography variant="overline">
                                Meal Type
                            </Typography>

                            <Select
                                name="type"
                                autoWidth
                                label="Type"
                                label-id="type-label"
                                value={newMeal.type}
                                onChange={handleChange}
                            >
                                {mealTypes.map((type) => {
                                    return (
                                        <MenuItem value={type}>{type}</MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box style={{ display: "flex", flexWrap: "wrap" }}>
                        <FormControl>
                            <Typography variant="overline">Labels</Typography>
                            <BubbleArray
                                array={labels}
                                addHandler={(e) => {
                                    e.persist();
                                    const newLabel = e.target.value;
                                    e.target.name = "labels";
                                    e.target.value = [
                                        ...newMeal.labels,
                                        newLabel,
                                    ];
                                    console.log(e.target.value);
                                    handleChange(e);
                                }}
                                itemType={"mealLabels"}
                                selectedArray={newMeal.labels}
                            />
                        </FormControl>
                    </Box>
                </Grid>
            </Grid>
            <Grid item xs={12} className={classes.formContainer}>
                <Box style={{ display: "flex", flexWrap: "wrap" }}>
                    <form
                        name="ingredients"
                        onSubmit={(e) => handleFieldSubmit(e)}
                    >
                        <FormControl>
                            <Typography variant="overline">
                                Ingredients
                            </Typography>
                            {newMeal.ingredients.length > 0 ? (
                                <ul
                                    style={{
                                        listStyleType: "none",
                                        paddingLeft: 5,
                                        margin: "5px 0",
                                    }}
                                >
                                    {newMeal.ingredients.map((ingredient) => {
                                        return (
                                            <li style={{ margin: "5px 0" }}>
                                                {ingredient}
                                                <Divider />
                                            </li>
                                        );
                                    })}
                                </ul>
                            ) : (
                                <Typography variant="caption">
                                    Add ingredients here
                                </Typography>
                            )}
                            <Box
                                style={{ display: "flex", flexWrap: "noWrap" }}
                            >
                                <TextField
                                    name="ingredients"
                                    autoWidth
                                    value={newIngredient}
                                    classes={{ root: classes.textFieldRoot }}
                                    onChange={(e) =>
                                        setNewIngredient(e.target.value)
                                    }
                                />
                                <IconButton
                                    size="small"
                                    name="ingredients"
                                    onClick={(e) => {
                                        e.persist();
                                        e.target.name = "ingredients";
                                        e.target.value = [
                                            ...newMeal.ingredients,
                                            newIngredient,
                                        ];
                                        handleChange(e);
                                        setNewIngredient("");
                                    }}
                                >
                                    <AddIcon />
                                </IconButton>
                            </Box>
                        </FormControl>
                    </form>
                </Box>
                <Box style={{ display: "flex", flexWrap: "wrap" }}>
                    <form name="directions" onSubmit={handleFieldSubmit}>
                        <FormControl
                            style={{
                                display: "inline-block",
                                alignItems: "center",
                                justifyContent: "center",
                                alignContent: "center",
                            }}
                        >
                            <Typography variant="overline">
                                Directions
                            </Typography>
                            <br />
                            {newMeal.directions.length > 0 ? (
                                <ol
                                    style={{ paddingLeft: 20, margin: "5px 0" }}
                                >
                                    {newMeal.directions.map((step) => {
                                        return (
                                            <li>
                                                {step}
                                                <Divider />
                                            </li>
                                        );
                                    })}
                                </ol>
                            ) : (
                                <Typography variant="caption">
                                    Add directions here
                                </Typography>
                            )}
                            <Box
                                style={{ display: "flex", flexWrap: "noWrap" }}
                            >
                                <TextField
                                    name="directions"
                                    value={newStep}
                                    style={{ width: "30vw" }}
                                    classes={{ root: classes.textFieldRoot }}
                                    onChange={(e) => setNewStep(e.target.value)}
                                />
                                <IconButton
                                    size="small"
                                    onClick={(e) => {
                                        e.target.name = "directions";
                                        e.target.value = Array.from([
                                            ...newMeal.directions,
                                            newStep,
                                        ]);
                                        handleChange(e);
                                        setNewStep("");
                                    }}
                                >
                                    <AddIcon />
                                </IconButton>
                            </Box>
                        </FormControl>
                    </form>
                </Box>
                <Box>
                    <form onSubmit={(e) => handleNutritionSubmit(e)}>
                        <FormControl>
                            <Typography variant="overline">
                                Nutrition
                            </Typography>
                            {Object.entries(newMeal.nutrition).length > 0 ? (
                                Object.entries(newMeal.nutrition).map(
                                    (item) => {
                                        return (
                                            item && (
                                                <Typography>{`${item[0]}: ${item[1]}`}</Typography>
                                            )
                                        );
                                    }
                                )
                            ) : (
                                <Typography variant="caption">
                                    Select a nutritional fact and add it's value
                                </Typography>
                            )}
                            <Box>
                                <Select
                                    name="nutrition"
                                    value={newNutrition.name}
                                    onChange={(e) => changeNewNutrition(e)}
                                    style={{
                                        width: "7vw",
                                        marginRight: "1vw",
                                    }}
                                >
                                    {nutritionItems.map((item) => {
                                        return (
                                            <MenuItem value={item}>
                                                {item}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                                :
                                <TextField
                                    name="nutritionValue"
                                    value={newNutrition.value}
                                    onChange={(e) => changeNewNutrition(e)}
                                    style={{ width: "4vw", marginLeft: "1vw" }}
                                />
                                <IconButton
                                    size="small"
                                    onClick={(e) => {
                                        e.persist();
                                        let newObject = {
                                            ...newMeal.nutrition,
                                            [newNutrition.name]:
                                                newNutrition.value,
                                        };
                                        setNewNutrition({
                                            name: "",
                                            value: "",
                                        });
                                        e.target.name = "nutrition";
                                        e.target.value = newObject;
                                        console.log(e.target.value);
                                        handleChange(e);
                                        setNewNutrition({
                                            name: "",
                                            value: "",
                                        });
                                    }}
                                >
                                    <AddIcon />
                                </IconButton>
                            </Box>
                        </FormControl>
                    </form>
                </Box>
            </Grid>
            <Grid item xs={12} className={classes.submit}>
                <Grid item xs={12}>
                    <LinearProgress
                        style={{
                            backgroundColor: "black",
                        }}
                        classes={{
                            barColorPrimary: classes.progressBar,
                        }}
                        variant="determinate"
                        size={40}
                        value={progress}
                    />
                </Grid>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={submit}
                    style={{ margin: "1.5rem 0", backgroundColor: "#b1fcb9" }}
                >
                    Submit
                </Button>
            </Grid>
        </Grid>
    );
};
