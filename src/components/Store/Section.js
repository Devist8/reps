import React from "react";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Typography } from "@material-ui/core";

//Components
import { Carousel } from "../Carousel";
import { SectionHeader } from "./SectionHeader";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { updateStoreSections } from "../../redux/actions/storeActions";

const useStyles = makeStyles((theme) => ({}));

export const Section = (props) => {
    const { section, edit, index } = props;
    const dispatch = useDispatch();
    const file = useSelector((state) => state.data.file);
    const storeSections = useSelector((state) => state.data.store.sections);
    const storeId = useSelector((state) => state.data.store.info.storeId);
    const [currentSection, setCurrentSection] = React.useState(
        section ? { ...section } : { items: [], preview: null, align: "" }
    );
    const [errors, setErrors] = React.useState({});
    const classes = useStyles();

    const handleSubmit = () => {
        setErrors({});
        !currentSection.preview &&
            setErrors({ imageURL: "Please select an image" });
        !currentSection.title && setErrors({ title: "Please set a title" });
        !currentSection.description &&
            setErrors({ description: "Please add a description" });
        currentSection.items.length < 1 &&
            setErrors({ items: "Please add some items" });
        if (!Object.keys(errors).length === 0) {
            return;
        }
        currentSection.store = storeId;

        dispatch(updateStoreSections(currentSection, file));
    };

    return (
        <Grid container>
            {
                <Grid
                    item
                    xs={12}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "1vh",
                    }}
                >
                    {errors &&
                        Object.values(errors).map((error) => {
                            return (
                                <Typography
                                    style={{
                                        color: "red",
                                        textAlign: "center",
                                    }}
                                >
                                    {error}
                                </Typography>
                            );
                        })}{" "}
                </Grid>
            }
            <Grid item xs={12}>
                <SectionHeader
                    currentSection={currentSection}
                    edit={!section || edit}
                    type="store"
                    setCurrentSection={setCurrentSection}
                />
            </Grid>
            <Grid item xs={12}>
                <Carousel
                    array={currentSection.items}
                    edit={!section || edit}
                    setState={setCurrentSection}
                    type="store"
                    size={3}
                />
            </Grid>
            {edit && (
                <Grid
                    item
                    xs={12}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Button onClick={handleSubmit}>Submit</Button>
                </Grid>
            )}
        </Grid>
    );
};
