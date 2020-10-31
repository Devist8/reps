import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/styles/withStyles";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import Checkbox from "@material-ui/core/Checkbox";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import makeStyles from "@material-ui/styles/makeStyles";
import Grid from "@material-ui/core/Grid";

const headCells = [
  { id: "activity", numeric: false, disablePadding: true, label: "Task" },

  { id: "repXP", numeric: true, disablePadding: false, label: "RepXP" },
  { id: "reps", numeric: true, disablePadding: false, label: "Reps" },
  {
    id: "duration",
    numeric: true,
    disablePadding: false,
    label: "Duration (min)",
  },

  {
    id: "musclesTargeted",
    numeric: true,
    disablePadding: false,
    label: "Muscles Targeted",
  },
];

function TaskTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  //Render TableHead
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCells.indexOf(headCell) === 0 ? "left" : "center"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell key="complete" align="center">
          Complete
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

TaskTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default TaskTableHead;
/*import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/styles/withStyles";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import Checkbox from "@material-ui/core/Checkbox";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import makeStyles from "@material-ui/styles/makeStyles";
import Grid from "@material-ui/core/Grid";

const styles = () => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
});

const headCells = [
  { id: "exercise", numeric: false, disablePadding: true, label: "Task" },
  {
    id: "difficulty",
    numeric: true,
    disablePadding: false,
    label: "Difficulty",
  },
  { id: "repXP", numeric: true, disablePadding: false, label: "RepXP" },
  { id: "reps", numeric: true, disablePadding: false, label: "Reps" },
  {
    id: "duration",
    numeric: true,
    disablePadding: false,
    label: "Duration (min)",
  },

  {
    id: "musclesTargeted",
    numeric: true,
    disablePadding: false,
    label: "Muscles Targeted",
  },
];

const TaskTableHead = (props) => {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowcount,
    onRequestSort,
  } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell paddding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowcount}
            checked={rowcount > 0 && numSelected === rowcount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all tasks" }}
          />
        </TableCell>
        {headCells.map((cell) => (
          <TableCell
            key={cell.id}
            align="center"
            padding={cell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === cell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === cell.id}
              direction={orderBy === cell.id ? order : "asc"}
              onClick={createSortHandler(cell.id)}
            >
              {cell.label}
              {orderBy === cell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "" : ""}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

TaskTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowcount: PropTypes.number.isRequired,
};

export default withStyles(styles)(TaskTableHead);*/
