import React from "react";
import { storeSections, storeCategories } from "../../util/static-data";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import {
    Grid,
    Typography,
    TextField,
    Button,
    IconButton,
} from "@material-ui/core";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";

//Components
import { BubbleArray } from "../BubbleArray";

//React-redux
import { useDispatch, useSelector } from "react-redux";
import {
    addToStore,
    updateStoreSections,
} from "../../redux/actions/storeActions";

const useStyles = makeStyles((theme) => ({
    buttons: { backgroundColor: theme.palette.primary.main },
}));

export const AddToStoreModal = (props) => {
    const { item, handleChange } = props;
    const classes = useStyles();
    const dispatch = useDispatch();
    const storeInfo = useSelector((state) => state.data.store.info);
    const userInfo = useSelector((state) => state.user.info);
    const workouts = useSelector((state) => state.data.workouts);
    const programs = useSelector((state) => state.data.programs);
    const storeItems = useSelector((state) => state.data.store.inventory);

    const items = workouts.concat(programs);
    const [source, setSource] = React.useState("collection");
    const [selectedItem, setSelectedItem] = React.useState(0);
    const [storeItemInfo, setStoreItemInfo] = React.useState(
        item
            ? { ...item, sections: [], categories: [] }
            : {
                  sections: [],
                  categories: [],
              }
    );

    const handleStoreInfoChange = (e) => {
        e.persist();
        const data = {};
        console.log(storeItemInfo);
        if (e.target.name === "categories" || e.target.name === "sections") {
            data.name = e.target.name;
            console.log(storeItemInfo[e.target.name]);
            data.value = [...storeItemInfo[e.target.name], e.target.value];
            setStoreItemInfo((prevState) => {
                return {
                    ...prevState,
                    [data.name]: data.value,
                };
            });
        } else {
            setStoreItemInfo((prevState) => {
                return {
                    ...prevState,
                    [e.target.name]: e.target.value,
                };
            });
        }
    };

    const handleAddToStore = () => {
        if ((source === "collection") & handleChange) {
            return handleChange((prevState) => ({
                ...prevState,
                items: [
                    ...prevState.items,
                    {
                        title: storeItemInfo.title,
                        imageURL: storeItemInfo.imageURL,
                        description: storeItemInfo.description,
                        price: storeItemInfo.price,
                        type: storeItemInfo.type,
                        exerciseCount: storeItemInfo.exerciseCount,
                        workoutCount:
                            storeItemInfo.workoutCount &&
                            storeItemInfo.workoutCount,
                        itemId: storeItemInfo.id,
                        type: storeItemInfo.workoutCount
                            ? "program"
                            : "workout",
                    },
                ],
            }));
        } else if (source === "store" && handleChange) {
            return handleChange((prevState) => ({
                ...prevState,
                items: [
                    ...prevState.items,
                    {
                        title: storeItemInfo.title,
                        imageURL: storeItemInfo.imageURL,
                        description: storeItemInfo.description,
                        price: storeItemInfo.price,
                        type: storeItemInfo.type,
                        exerciseCount: storeItemInfo.exerciseCount,
                        workoutCount:
                            storeItemInfo.workoutCount &&
                            storeItemInfo.workoutCount,
                        itemId: storeItemInfo.id,
                        type: storeItemInfo.workoutCount
                            ? "program"
                            : "workout",
                    },
                ],
            }));
        }
        const data = {
            title: storeItemInfo && storeItemInfo.title,
            imageURL: storeItemInfo && storeItemInfo.imageURL,
            difficulty: storeItemInfo && storeItemInfo.difficulty,
            exerciseCount: storeItemInfo && storeItemInfo.exerciseCount,
            description: storeItemInfo && storeItemInfo.description,
            equipment: storeItemInfo && storeItemInfo.equipment,
            type: storeItemInfo.workoutCount ? "program" : "workout",
            itemId: storeItemInfo.id,
            ...storeItemInfo,
        };
        if (item.workoutCount) {
            data.workoutCount = item.workoutCount;
        }
        console.log(userInfo.storeId);
        dispatch(addToStore(userInfo.storeId, data));
    };
    ///////////////////////////////////
    //////////RENDER///////////////////
    ////////////METHOD/////////////////
    //////////////////////////JSX//////
    ///////////////////////////////////
    return (
        <Grid
            container
            style={{
                display: "flex",
                justifyContent: "center",
                maxWidth: "60vw",
                backgroundColor: "#f5fcff",
                padding: "50px",
                borderRadius: "8px",
            }}
        >
            <Grid
                item
                xs={12}
                className={classes.buttons}
                style={{ display: "flex", justifyContent: "center" }}
            >
                <Button
                    onClick={() => {
                        setSource("store");
                        setStoreItemInfo({ ...storeItems[selectedItem] });
                    }}
                    disabled={source === "store"}
                >
                    Add From Store
                </Button>
                <Button
                    onClick={() =>
                        source !== "collection"
                            ? setSource("collection")
                            : setSource("")
                    }
                    disabled={source === "collection"}
                >
                    Add From Collection
                </Button>
            </Grid>
            <Grid
                item
                xs={3}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                    padding: "1vh 1vh 1vh 0",
                    paddingLeft: "2vh",
                    flexWrap: "wrap",
                }}
            >
                <Grid
                    item
                    xs={12}
                    style={{ display: "flex", justifyContent: "center" }}
                >
                    <IconButton
                        onClick={() => {
                            if (selectedItem !== 0) {
                                source === "collection"
                                    ? setStoreItemInfo({
                                          ...items[selectedItem - 1],
                                      })
                                    : setStoreItemInfo({
                                          ...storeItems[selectedItem - 1],
                                      });
                                return setSelectedItem(selectedItem - 1);
                            }
                        }}
                        disabled={selectedItem === 0}
                    >
                        <KeyboardArrowUpIcon />
                    </IconButton>
                </Grid>
                <Grid
                    container
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                    }}
                >
                    <img
                        src={
                            item
                                ? item.imageURL
                                : source === "collection"
                                ? items && items[selectedItem].imageURL
                                : storeItems &&
                                  storeItems[selectedItem].imageURL
                        }
                        style={{ objectFit: "fill", height: "15vh" }}
                    />
                    <Typography
                        style={{
                            margin: "5px",
                            width: "100%",
                            textAlign: "center",
                        }}
                    >
                        {item ? item.title : items && items[selectedItem].title}
                    </Typography>
                    <Typography
                        style={{
                            margin: "5px",
                            width: "100%",
                            textAlign: "center",
                        }}
                    >
                        {item
                            ? item.type === "workout"
                                ? "Workout"
                                : "Program"
                            : items && items[selectedItem].type === "workout"
                            ? "Workout"
                            : "Program"}
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                    style={{ display: "flex", justifyContent: "center" }}
                >
                    <IconButton
                        onClick={() => {
                            if (
                                source === "collection"
                                    ? selectedItem !== items.length - 1
                                    : selectedItem !== storeItems.length - 1
                            ) {
                                source === "collection"
                                    ? setStoreItemInfo({
                                          ...items[selectedItem + 1],
                                      })
                                    : setStoreItemInfo({
                                          ...storeItems[selectedItem + 1],
                                      });
                                setSelectedItem(selectedItem + 1);
                            }
                        }}
                        disabled={
                            source === "collection"
                                ? selectedItem === items.length - 1
                                : selectedItem === storeItems.length - 1
                        }
                    >
                        <KeyboardArrowDown />
                    </IconButton>
                </Grid>
            </Grid>
            <Grid
                item
                xs={9}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                    flexWrap: "wrap",
                }}
            >
                <Grid
                    item
                    xs={12}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        alignContent: "center",
                        flexWrap: "wrap",
                        marginBottom: "1vh",
                    }}
                >
                    <Typography
                        variant="overline"
                        style={{ width: "100%", textAlign: "center" }}
                    >
                        Price
                    </Typography>
                    {source === "collection" ? (
                        <TextField
                            name="price"
                            type="number"
                            value={storeItemInfo.price}
                            onChange={(e) => handleStoreInfoChange(e)}
                        />
                    ) : (
                        <Typography>
                            {`$${storeItems[selectedItem].price}`}
                        </Typography>
                    )}
                </Grid>
                <Grid
                    item
                    xs={12}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        alignContent: "center",
                        flexWrap: "wrap",
                        marginBottom: "1vh",
                    }}
                >
                    <Typography variant="overline">Sections</Typography>
                    {source === "collection" ? (
                        <BubbleArray
                            itemType="sections"
                            array={storeSections}
                            selectedArray={storeItemInfo.sections}
                            addHandler={handleStoreInfoChange}
                        />
                    ) : (
                        <BubbleArray
                            itemType="sections"
                            array={storeSections}
                            selectedArray={storeItems[selectedItem].sections}
                        />
                    )}
                </Grid>
                <Grid
                    item
                    xs={12}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        alignContent: "center",
                        flexWrap: "wrap",
                    }}
                >
                    <Typography variant="overline">Categories</Typography>
                    {source === "collection" ? (
                        <BubbleArray
                            itemType="categories"
                            array={storeCategories}
                            selectedArray={storeItemInfo.categories}
                            addHandler={handleStoreInfoChange}
                        />
                    ) : (
                        <BubbleArray
                            itemType="categories"
                            array={storeCategories}
                            selectedArray={storeItems[selectedItem].categories}
                        />
                    )}
                </Grid>
                <Grid
                    item
                    xs={12}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "2.5vh",
                    }}
                >
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleAddToStore}
                    >
                        {source === "collection"
                            ? "Add to store"
                            : "Add to Section"}
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
};
