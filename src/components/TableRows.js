import React from 'react';
import PropTypes from 'prop-types';
import { lighten, withStyles } from '@material-ui/styles';
import clsx from 'clsx';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import AddIcon from '@material-ui/icons/AddCircle';
import RepRequestForm from './RepRequestForm';
import defaultTasks from '../util/DefaultTasks';

// Redux
import { connect } from 'react-redux';
import {
  setOpen,
  setTasks,
  deleteTask,
  completeTask,
} from '../redux/actions/userActions';

const styles = (theme) => ({
  root: {
    width: '100%',
  },
  detailRow: {},
  button: {
    marginTop: '50px',
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: (theme.palette.secondary.light, 0.55),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
});

class TableRows extends React.Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      open: false,
    };
  }

  handleDone = (event, index, tasks) => {
    const tasksArr = [...tasks];
    let clickedTask = { ...tasksArr[index] };
    clickedTask.complete = !clickedTask.complete;
    tasksArr[index] = clickedTask;
    const id = tasks[index].taskId;
    console.log(id);
    this.props.completeTask(tasksArr, id);
  };

  handleDelete = (event, index, tasks) => {
    const tasksArr = [...tasks]
      .slice(0, index)
      .concat([...tasks].slice(index + 1, tasks.length));
    const id = tasks[index].taskId;
    this.props.deleteTask(tasksArr, id);
  };

  handleOpen = (event) => {
    this.setState({
      open: !this.state.open,
    });
  };

  render() {
    const {
      classes,
      task,
      user: { tasks },
      handleDone,
      handleDelete,
    } = this.props;

    return (
      <React.Fragment>
        <TableRow
          className={clsx(classes.root, {
            [classes.hightlight]: true,
          })}
        >
          <TableCell>
            <IconButton
              aria-label='expand row'
              size='small'
              onClick={this.handleOpen}
            >
              {this.state.open ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </IconButton>
          </TableCell>
          <TableCell component='tr' scope='row'>
            {task.activity}
          </TableCell>
          <TableCell>{task.motion}</TableCell>
          <TableCell>{task.duration}</TableCell>
          <TableCell>{task.reps}</TableCell>
          <TableCell>{task.repXp}</TableCell>
          {task.complete ? (
            <TableCell align='center'>
              <Tooltip title='Delete'>
                <IconButton
                  aria-label='delete'
                  onClick={(event) =>
                    this.handleDelete(event, tasks.indexOf(task), tasks)
                  }
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </TableCell>
          ) : (
            <TableCell align='center'>
              <Tooltip title='Done'>
                <IconButton
                  onClick={(event) =>
                    this.handleDone(event, tasks.indexOf(task), tasks)
                  }
                  aria-label='done'
                >
                  <DoneIcon />
                </IconButton>
              </Tooltip>
            </TableCell>
          )}
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={this.state.open} timeout='auto' unmountOnExit>
              <Box margin={1}>
                <Typography variant='h6' gutterBottom>
                  Extra Details
                </Typography>
                <Table size='small' aria-label='task details'>
                  <TableBody>
                    <Grid container spacing={2}>
                      <Grid item sm={6} xs={12}>
                        <TableRow>
                          <TableCell align='left'>Task Type</TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell align='right'>{task.taskType}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align='left'>Difficulty</TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell align='right'>{task.difficulty}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align='left'>Sent by: </TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell align='right'>{task.sender}</TableCell>
                        </TableRow>
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <TableRow>
                          <TableCell align='left'>Task Type</TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell align='right'>{task.taskType}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align='left'>Difficulty</TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell align='right'>{task.difficulty}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align='left'>Sent by: </TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell align='right'>{task.sender}</TableCell>
                        </TableRow>
                        <TableCell>
                          <IconButton
                            aria-label='submit task'
                            size='large'
                            className={classes.button}
                            onClick={this.handleSubmit}
                          >
                            <AddIcon />
                          </IconButton>
                        </TableCell>
                      </Grid>
                    </Grid>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  UI: state.UI,
  user: state.user,
});

const mapActionsToProps = {
  setOpen,
  setTasks,
  deleteTask,
  completeTask,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(TableRows));
