import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Collapse from '@material-ui/core/Collapse';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import paper from '@material-ui/core/Paper';

import met from '../util/met';
import TableRows from './TableRows';
import TableForm from './TableForm';
import defaultTasks from '../util/DefaultTasks';

//Redux
import { connect } from 'react-redux';
import {
  createTask,
  setOpen,
  setTasks,
  setAddOpen,
} from '../redux/actions/userActions';

const styles = (theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: '50px',
  },
});

export class CollapseTable extends React.Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      open: false,
      activity: '',
      motion: '',
      sets: '',
      repXp: 0,
      duration: 0,
      muscles: [],
    };
  }

  handleActivity = (event) => {
    if (event.target.name === 'motion') {
      const selectedIndex = event.currentTarget.getAttribute('index-value');
      this.setState({
        motion: event.target.value,
        repXp: met[this.state.activity][selectedIndex].exp * 10,
      });
    } else if (event.target.name === 'muscles') {
      let muscleArray = [];
      event.target.value
        .split(',')
        .forEach((muscle) => muscleArray.push(muscle.trim()));
      this.setState({
        muscles: muscleArray,
      });
    } else {
      this.setState({
        [event.target.name]: event.target.value,
      });
    }
  };

  handleOpen = (event) => {
    this.setState({
      open: !this.state.open,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      activity: this.state.tasks.activity,
      repXp: this.state.tasks.repXp,
      duration: this.state.tasks.duration,
      muscles: this.state.tasks.muscles,
      reps: '0 x 0',
      taskType: 'Personal Challenge',
    };
    this.props.createTask(data, this.props.history);
  };

  render() {
    const {
      classes,
      user: { tasks },
      UI: { loading },
    } = this.props;

    const sortedTasks = tasks.sort(function (x, y) {
      const xStatus = x.complete;
      const yStatus = y.complete;
      return xStatus === yStatus ? 0 : xStatus ? 1 : -1;
    });
    return (
      <TableContainer component={paper}>
        <Table aria-label='collapsible table'>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>ActivityStatus</TableCell>
              <TableCell>Specific Exercise</TableCell>
              <TableCell>Duration (min)</TableCell>
              <TableCell>Reps</TableCell>
              <TableCell>Rep XP</TableCell>
              <TableCell>Complete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedTasks.map((task) => (
              <TableRows
                key={tasks.indexOf(task)}
                task={task}
                handleDelete={this.handleDelete}
                handleDone={this.handleDone}
                classes={classes}
              />
            ))}
            <TableRow>
              <TableCell scope='row' colSpan={10}>
                <TableForm />
              </TableCell>
            </TableRow>
            <Collapse in={this.state.open} timeout='auto' unmountOnExit>
              <Box margin={1}></Box>
            </Collapse>
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  createTask,
  setOpen,
  setTasks,
  setAddOpen,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(CollapseTable));
