import React from "react";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import PropTypes from "prop-types";

import { lighten, makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TaskTableHead from "../TaskTableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Grid from "@material-ui/core/Grid";
import TaskTableToolbar from "./TaskTableToolbar";

const defaultTasks = [
  {
    activity: "Push-ups",
    repXP: 20,
    reps: "2 x 15",
    duration: 30,
    difficulty: "Beginner",
    musclesTargeted: ["chest", "biceps"],
    repId: "zqtwitxyJ2uczAUAgtU5",
    createdAt: "2020-10-04T01:47:44.816Z",
    complete: false,
  },
  {
    activity: "Sit-ups",
    repXP: 30,
    reps: "5 x 4",
    duration: 20,
    difficulty: "Beginner",
    musclesTargeted: ["abs", "legs"],
    repId: "FWha4HurEhsEdgdKjCZh",
    createdAt: "2020-09-26T17:15:34.980Z",
    complete: false,
  },
  {
    activity: "Squats",
    repXP: 40,
    reps: "10 x 5",
    duration: 40,
    difficulty: "Intermediate",
    musclesTargeted: ["chest", "biceps"],
    repId: "yCZQ4AnUBLZjKyvHeFBH",
    createdAt: "2020-10-03T14:15:44.494Z",
    complete: false,
  },
];

//Styles
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  accordion: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
    textAlign: "center",
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
}));

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);

    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function TaskTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [tasks, setTasks] = React.useState(defaultTasks);
  const [expanded, setExpanded] = React.useState(false);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = tasks.map((n) => n.repId);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, repId) => {
    const selectedIndex = selected.indexOf(repId);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, repId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleDone = (event, index) => {
    const tasksArr = [...tasks];
    let clickedTask = { ...tasksArr[index] };
    clickedTask.complete = !clickedTask.complete;
    tasksArr[index] = clickedTask;
    setTasks(tasksArr);
  };

  const handleDelete = (event, index) => {
    const tasksArr = [...tasks]
      .slice(0, index)
      .concat([...tasks].slice(index + 1, tasks.length));
    setTasks(tasksArr);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleExpanded = (panel) => (event, expanded) => {
    setExpanded(expanded ? panel : false);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, tasks.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <TaskTableToolbar selected={selected} />
      <TableContainer>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          size="medium"
          aria-label="enhanced table"
        >
          <Accordion>
            <TaskTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={tasks.length}
              tasks={tasks}
            />
          </Accordion>
          <TableBody>
            {stableSort(tasks, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((task, index) => {
                const isItemSelected = isSelected(task.repId);
                const labelId = `task-table-checkbox-${index}`;
                return (
                  <Accordion
                    className={classes.accordion}
                    expanded={expanded === `panel${tasks.indexOf(task)}`}
                    onChange={handleExpanded(`panel${tasks.indexOf(task)}`)}
                  >
                    <AccordionSummary>
                      <TableRow
                        hover
                        onClick={(event) => {
                          handleClick(event, task.repId);
                        }}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={task.repId}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        </TableCell>
                        <TableCell
                          align="left"
                          component="th"
                          id={labelId}
                          scope="row"
                        >
                          {task.activity}
                        </TableCell>
                        <TableCell align="center">{task.repXP}</TableCell>
                        <TableCell align="center">{task.reps}</TableCell>
                        <TableCell align="center">{task.duration}</TableCell>
                        <TableCell align="center">
                          {task.musclesTargeted}
                        </TableCell>
                        {task.complete ? (
                          <TableCell align="center">
                            <Tooltip title="Delete">
                              <IconButton
                                aria-label="delete"
                                onClick={(event) =>
                                  handleDelete(event, tasks.indexOf(task))
                                }
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        ) : (
                          <TableCell align="center">
                            <Tooltip title="Done">
                              <IconButton
                                onClick={(event) =>
                                  handleDone(event, tasks.indexOf(task))
                                }
                                aria-label="done"
                              >
                                <DoneIcon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        )}
                      </TableRow>
                    </AccordionSummary>
                    <AccordionDetails></AccordionDetails>
                  </Accordion>
                );
              })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={tasks.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}
