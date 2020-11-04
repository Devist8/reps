import React, { useReducer } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TableCell from '@material-ui/core/TableCell';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import TableRow from '@material-ui/core/TableRow';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/AddCircle';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import met from '../util/met';

//Redux
import { connect } from 'react-redux';
import { createTask, deleteTask } from '../redux/actions/userActions';

const styles = (theme) => ({
  root: {
    width: '100%',
  },
  select: {
    maxWidth: '150px',
    width: '150px',
  },
  input: {
    width: '50px',
  },

  selectEmpty: {},
  addButton: {
    marginLeft: theme.spacing(4),
  },
});

export class TableForm extends React.Component {
  constructor() {
    super();
    this.state = {
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
  handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      username: this.props.user.info.username,
      activity: this.state.activity,
      motion: this.state.motion,
      repXp: this.state.repXp,
      duration: this.state.duration,
      reps: '0 x 0',
      taskType: 'Task',
    };

    this.props.createTask(data, this.props.history);
    this.setState({
      activity: '',
      motion: '',
      sets: '',
      repXp: 0,
      duration: 0,
      muscles: [],
    });
  };
  render() {
    const {
      classes,
      user: {
        info: { username },
      },
      UI: { loading },
    } = this.props;

    let formMarkup = !loading ? (
      <TableRow component='form' noValidate autoComplete='off'>
        <TableCell scope='row' colSpan={12} justify='flex-start'>
          <Grid container className={classes.form} spacing={0}>
            <form onSubmit={this.handleSubmit} className={classes.form}>
              <TableCell className={classes.formCell} colSpan={2}>
                <FormControl fullWidth>
                  <InputLabel id='rr-activity-select-label'>
                    Activity
                  </InputLabel>
                  <Select
                    labelId='rr-activity-select-label'
                    id='rr-activity-select'
                    name='activity'
                    value={this.state.activity}
                    className={classes.select}
                    onChange={this.handleActivity}
                  >
                    {Object.keys(met).map((activity, index) => {
                      return (
                        <MenuItem value={activity} key={index}>
                          {met[activity][0].activity}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </TableCell>

              <TableCell
                disabled={this.state.activtiy}
                className={classes.formCell}
                colSpan={2}
              >
                <InputLabel id='rr-motion-select-label'>
                  Specific Motion
                </InputLabel>
                <FormControl>
                  <Select
                    labelId='rr-motion-select-label'
                    id='rr-motion-select'
                    name='motion'
                    value={this.state.motion}
                    defaultValue=''
                    onChange={this.handleActivity}
                    className={classes.select}
                  >
                    {this.state.activity &&
                      met[this.state.activity]
                        .map((x) => Object.values(x)[1])
                        .map((specficMotion, index) => {
                          return (
                            <MenuItem
                              value={specficMotion}
                              index-value={index}
                              key={index}
                            >
                              {specficMotion}
                            </MenuItem>
                          );
                        })}
                  </Select>
                </FormControl>
              </TableCell>

              <TableCell
                className={classes.formCell}
                disabled={
                  this.state.motion &&
                  this.state.motion.includes('calisthenics')
                }
              >
                <FormControl>
                  <TextField
                    id='sets-input'
                    name='sets'
                    label='Sets'
                    defaultValue='0'
                    type='number'
                    className={classes.input}
                    disabled={
                      this.state.motion &&
                      this.state.motion.includes('calisthenics')
                    }
                    onChange={this.handleActivity}
                  />
                </FormControl>
              </TableCell>

              <TableCell
                className={classes.formCell}
                colSpan={2}
                disabled={this.state.sets}
              >
                <FormControl>
                  <TextField
                    id='reps-input'
                    name='reps'
                    label='Reps'
                    defaultValue='0'
                    type='number'
                    className={classes.input}
                    disabled={this.state.sets}
                    onChange={this.handleActivity}
                  />
                </FormControl>
              </TableCell>

              <TableCell
                className={classes.formCell}
                colSpan={2}
                disabled={this.state.motion}
              >
                <FormControl>
                  <TextField
                    disabled
                    id='rep-xp'
                    label='repXp'
                    name='repXp'
                    className={classes.input}
                    value={this.state.repXp}
                  />
                </FormControl>
              </TableCell>

              <TableCell className={classes.formCell} colSpan={2}>
                <FormControl>
                  <TextField
                    id='duration'
                    name='duration'
                    label='Duration'
                    type='number'
                    className={classes.input}
                    value={this.state.duration}
                    onChange={this.handleActivity}
                  />
                </FormControl>
              </TableCell>
              <TableCell colSpan={2}>
                <IconButton
                  type='submit'
                  aria-label='submit task'
                  size='medium'
                  className={classes.addButton}
                  onClick={this.handleSubmit}
                >
                  <AddIcon />
                </IconButton>
              </TableCell>
            </form>
          </Grid>
        </TableCell>
      </TableRow>
    ) : (
      <p>...loading</p>
    );
    return formMarkup;
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  createTask,
  deleteTask,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(TableForm));
