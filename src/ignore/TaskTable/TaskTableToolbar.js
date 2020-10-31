import React, { Component } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import { lighten, makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";
import FilterListIcon from "@material-ui/icons/FilterList";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const TaskTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { selected } = props;
  const numSelected = selected.length;
  const handleDone = (event, selected) => {
    selected.forEach((task) => (this.setState.task.complete = true));
  };

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <Grid container>
        <Grid item sm={11}>
          {numSelected > 0 ? (
            <Typography
              className={classes.title}
              color="inherit"
              variant="subtitle1"
              component="div"
            >
              {numSelected} selected
            </Typography>
          ) : (
            <Typography
              className={classes.title}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              Task Table
            </Typography>
          )}
        </Grid>
        <Grid item sm={1}>
          {numSelected > 0 ? (
            <div>
              <Tooltip title="Done">
                <IconButton aria-label="done">
                  <DoneIcon onClick={(event) => handleDone(event, selected)} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </div>
          ) : (
            <Tooltip title="Filter list">
              <IconButton aria-label="filter list">
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          )}
        </Grid>
      </Grid>
    </Toolbar>
  );
};

TaskTableToolbar.propTypes = {
  selected: PropTypes.array.isRequired,
};

export default TaskTableToolbar;
