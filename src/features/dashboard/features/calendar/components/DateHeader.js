import React from "react";
import dayjs from "dayjs";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({}));

export const DateHeader = (props) => {
    const { date } = props;
    const dayDate = dayjs(date).format("DD");
    const day = dayjs(date).format("ddd");

    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="h5" style={{ fontWeight: 700 }}>
                    {dayDate}
                </Typography>
                <Typography variant="h5">{day}</Typography>
            </Grid>
        </Grid>
    );
};
