import React from "react";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import {
    Box,
    IconButton,
    Grid,
    Typography,
    TextField,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { useTheme } from "@material-ui/core/styles";
import FormatAlignLeftIcon from "@material-ui/icons/FormatAlignLeft";
import FormatAlignRightIcon from "@material-ui/icons/FormatAlignRight";
import FormatAlignCenterIcon from "@material-ui/icons/FormatAlignCenter";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { CLEAR_FILE, SET_FILE } from "../../../../../redux/types";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        height: "25vh",
        width: "30vw",
        borderRadius: "8px",
        flexWrap: "wrap",
        alignItems: "center",
    },
    overlay: {
        position: "absolute",
        height: "25vh",
        width: "30vw",
        backgroundColor: "rgba(62, 62, 62, 0.6)",
        zIndex: 1000,

        borderRadius: "8px",
    },
    editIcon: {
        position: "absolute",
        display: "flex",
        height: "25vh",
        width: "30vw",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
    },
    whiteInput: { color: "white", fontSize: "1.2rem" },
    whiteTitleInput: { color: "white", fontSize: "2rem" },
}));

export const SectionHeader = (props) => {
    const { edit, setCurrentSection, currentSection } = props;
    const dispatch = useDispatch();
    const [preview, setPreview] = React.useState(null);

    const theme = useTheme();
    const classes = useStyles();

    const handleFileChange = (e) => {
        e.persist();
        const reader = new FileReader();
        let file = e.target.files[0];

        if (file) {
            reader.onload = () => {
                if (reader.readyState === 2) {
                    dispatch({ type: SET_FILE, payload: file });
                    setCurrentSection({
                        ...currentSection,
                        preview: URL.createObjectURL(file),
                    });
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

    const handleSectionChange = (e) => {
        e.persist();
        setCurrentSection({
            ...currentSection,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <Grid
            container
            style={
                currentSection && currentSection.align === "right"
                    ? {
                          display: "flex",
                          justifyContent: "flex-end",
                      }
                    : currentSection.align === "center"
                    ? {
                          display: "flex",
                          justifyContent: "center",
                      }
                    : {
                          display: "flex",
                      }
            }
        >
            <Grid container style={{ width: "30vw" }}>
                <Grid
                    className={classes.root}
                    style={
                        currentSection.imageURL
                            ? {
                                  backgroundImage: `url(${currentSection.imageURL})`,
                                  backgroundSize: "30vw 25vh",
                                  backgroundRepeat: "no-repeat",
                                  borderRadius: "8px",
                              }
                            : currentSection.preview
                            ? {
                                  backgroundImage: `url(${currentSection.preview})`,
                                  backgroundSize: "30vw 25vh",
                                  backgroundRepeat: "no-repeat",
                                  borderRadius: "8px",
                              }
                            : { backgroundColor: "#f5fcff" }
                    }
                >
                    <Grid className={classes.overlay}>
                        {edit && (
                            <Box className={classes.editIcon}>
                                <IconButton
                                    onClick={handleEditPicture}
                                    style={{ zIndex: "1000" }}
                                >
                                    <input
                                        type="file"
                                        id="imageInput"
                                        hidden="hidden"
                                        onChange={handleFileChange}
                                        style={{
                                            height: "30vh",
                                            width: "30vw",
                                        }}
                                    />
                                    <EditIcon style={{ color: "white" }} />
                                </IconButton>
                            </Box>
                        )}
                        <Grid
                            item
                            xs={12}
                            style={
                                currentSection.align === "right"
                                    ? {
                                          display: "flex",
                                          justifyContent: "flex-end",
                                          padding: "10px",
                                          alignItems: "center",
                                      }
                                    : currentSection.align === "center"
                                    ? {
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          padding: "10px",
                                      }
                                    : {
                                          display: "flex",
                                          alignItems: "center",
                                          padding: "10px",
                                      }
                            }
                        >
                            {edit ? (
                                <Box style={{ width: "60%" }}>
                                    <TextField
                                        name="title"
                                        label="Title"
                                        value={currentSection.title}
                                        fullWidth
                                        multiline
                                        InputProps={{
                                            className: classes.whiteTitleInput,
                                        }}
                                        onChange={handleSectionChange}
                                    />
                                </Box>
                            ) : (
                                <Typography
                                    style={{
                                        fontWeight: 700,
                                        color: "white",
                                        fontSize: "3rem",
                                    }}
                                    variant="h4"
                                >
                                    {currentSection.title}
                                </Typography>
                            )}
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            style={
                                currentSection.align === "right"
                                    ? {
                                          display: "flex",
                                          justifyContent: "flex-end",
                                          padding: "10px",
                                          alignItems: "center",
                                      }
                                    : currentSection.align === "center"
                                    ? {
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          padding: "10px",
                                      }
                                    : {
                                          display: "flex",
                                          alignItems: "center",
                                          padding: "10px",
                                      }
                            }
                        >
                            {edit ? (
                                <Box style={{ width: "60%" }}>
                                    <TextField
                                        name="description"
                                        label="Description"
                                        value={currentSection.description}
                                        fullWidth
                                        multiline
                                        onChange={handleSectionChange}
                                        InputProps={{
                                            className: classes.whiteInput,
                                        }}
                                    />
                                </Box>
                            ) : (
                                <Typography
                                    variant="h6"
                                    style={
                                        currentSection.align === "right"
                                            ? {
                                                  fontWeight: 600,
                                                  color: "white",
                                                  textAlign: "right",
                                              }
                                            : {
                                                  fontWeight: 600,
                                                  color: "white",
                                              }
                                    }
                                >
                                    {currentSection.description}
                                </Typography>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
                {edit && (
                    <Grid
                        container
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                        }}
                    >
                        <IconButton
                            name="align"
                            value="left"
                            onClick={(e) => {
                                e.target.name = "align";
                                e.target.value = "left";
                                return handleSectionChange(e);
                            }}
                        >
                            <FormatAlignLeftIcon
                                style={
                                    currentSection.align === "left" ||
                                    !currentSection.align
                                        ? { opacity: 0.5 }
                                        : { opacity: 1 }
                                }
                            />
                        </IconButton>
                        <IconButton
                            name="align"
                            value="center"
                            onClick={(e) => {
                                e.target.name = "align";
                                e.target.value = "center";
                                return handleSectionChange(e);
                            }}
                        >
                            <FormatAlignCenterIcon
                                style={
                                    currentSection.align === "center"
                                        ? { opacity: 0.5 }
                                        : { opacity: 1 }
                                }
                            />
                        </IconButton>
                        <IconButton
                            name="align"
                            value="right"
                            onClick={(e) => {
                                e.target.name = "align";
                                e.target.value = "right";
                                return handleSectionChange(e);
                            }}
                        >
                            <FormatAlignRightIcon
                                style={
                                    currentSection.align === "right"
                                        ? { opacity: 0.5 }
                                        : { opacity: 1 }
                                }
                            />
                        </IconButton>
                    </Grid>
                )}
            </Grid>
        </Grid>
    );
};
