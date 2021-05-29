import React from "react";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import {
    Grid,
    GridListTile,
    GridListTileBar,
    IconButton,
} from "@material-ui/core";

//Components
import { Difficulty } from "../Difficulty";

const useStyles = makeStyles((theme) => ({
    tile: { borderRadius: "8px" },
    title: { fontSize: "80%", lineHeight: "15px" },
    subtitle: { fontSize: "50%" },
    titleWrap: { margin: "8px" },
}));

export const WorkoutDisplay = (props) => {
    const { workout, addWorkout, selectedWeek } = props;
    const classes = useStyles();

    return (
        <GridListTile
            style={{
                width: "150px",
                height: "100px",
                margin: "1rem",
                borderRadius: "8px",
            }}
            classes={{
                tile: classes.tile,
            }}
        >
            <img src={workout.imageURL} />
            <GridListTileBar
                style={{ height: "40%" }}
                classes={{
                    title: classes.title,
                    subtitle: classes.subtitle,
                    titleWrap: classes.titleWrap,
                }}
                title={workout.title}
                subtitle={<Difficulty difficulty={workout.difficulty} small />}
                actionIcon={
                    <IconButton
                        size="small"
                        style={{
                            height: "20px",
                            width: "20px",
                            textAlign: "center",
                            marginRight: "0.2rem",
                        }}
                        onClick={(e) => {
                            console.log(selectedWeek);
                            console.log(workout);
                            addWorkout(workout, selectedWeek);
                        }}
                    >
                        <AddIcon
                            style={{
                                fill: "black",
                                height: "18px",
                                width: "18px",
                                margin: "auto",
                            }}
                        />
                    </IconButton>
                }
            />
        </GridListTile>
    );
};
