import React from "react";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Typography } from "@material-ui/core";

//Components
import { Carousel } from "../../../components/Carousel";
import { SectionHeader } from "./SectionHeader";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { updateStoreSections } from "../actions";

const useStyles = makeStyles((theme) => ({
    ...theme.spreadStyles,
}));

export const Section = (props) => {
    const { section, edit, index } = props;
    const dispatch = useDispatch();
    const file = useSelector((state) => state.data.file);
    const storeId = useSelector((state) => state.store.info.storeId);
    const [currentSection, setCurrentSection] = React.useState(
        section ? { ...section } : { items: [], preview: null, align: "" }
    );
    const [errors, setErrors] = React.useState({});
    const classes = useStyles();

    const handleSubmit = () => {
        currentSection.store = storeId;

        dispatch(updateStoreSections(currentSection, file));
    };

    return (
        <Grid container>
            {
                <Grid
                    item
                    xs={12}
                    className={classes.centerX}
                    style={{
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
                        })}
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
                <Grid item xs={12} className={classes.centerXY}>
                    <Button onClick={handleSubmit}>Submit</Button>
                </Grid>
            )}
        </Grid>
    );
};
