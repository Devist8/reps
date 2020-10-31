import React, { useReducer } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import met from '../util/met';

//Redux
import { connect } from 'react-redux';
import { createTask } from '../redux/actions/userActions';

const styles = (theme) => ({
  form: {
    width: '100%',
    direction: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formControl: {
    width: '200px',
  },
  selectEmpty: {},
  button: {
    marginLeft: '55px',
  },
  title: {
    textAlign: 'center',
    marginTop: theme.spacing(2),
  },
});

export class RepRequestForm extends React.Component {
  constructor() {
    super();
    this.state = {
      recipient: '',
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
      sender: this.props.user.info.username,
      recipient: this.state.recipient,
      activity: this.state.activity,
      motion: this.state.motion,
      repXp: this.state.repXp,
      duration: this.state.duration,
      reps: '0 x 0',
      taskType: 'Challenge',
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
    const { classes } = this.props;
    return (
      <Paper>
        <Grid container direction='column' className={classes.form}>
          <Typography variant='h5' className={classes.title}>
            Send Challenge Task
          </Typography>
          <form onSubmit={this.handleSubmit}>
            <Grid item xs={2}>
              <FormControl className={classes.formControl}>
                <TextField
                  id='recipient'
                  name='recipient'
                  label='Send to:'
                  type='text'
                  onChange={this.handleActivity}
                />
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <FormControl className={classes.formControl}>
                <InputLabel id='rr-activity-select-label'>Activity</InputLabel>
                <Select
                  labelId='rr-activity-select-label'
                  id='rr-activity-select'
                  name='activity'
                  value={this.state.activity}
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
            </Grid>

            <Grid item xs={2}>
              <FormControl className={classes.formControl}>
                <InputLabel id='rr-motion-select-label'>
                  Specific Motion
                </InputLabel>
                <Select
                  labelId='rr-motion-select-label'
                  id='rr-motion-select'
                  name='motion'
                  value={this.state.motion}
                  defaultValue=''
                  onChange={this.handleActivity}
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
            </Grid>

            <Grid item xs={2}>
              <FormControl className={classes.formControl}>
                <TextField
                  id='sets-input'
                  name='sets'
                  label='sets'
                  defaultValue='0'
                  type='number'
                  disabled={
                    this.state.motion &&
                    this.state.motion.includes('calisthenics')
                  }
                  onChange={this.handleActivity}
                />
              </FormControl>
            </Grid>

            <Grid item xs={2}>
              <FormControl className={classes.formControl}>
                <TextField
                  id='reps-input'
                  name='reps'
                  label='reps'
                  defaultValue='0'
                  type='number'
                  disabled={this.state.sets}
                  onChange={this.handleActivity}
                />
              </FormControl>
            </Grid>

            <Grid item xs={2}>
              <FormControl className={classes.formControl}>
                <TextField
                  disabled
                  id='rep-xp'
                  label='repXp'
                  value={this.state.repXp}
                  disabled={this.state.motion}
                />
              </FormControl>
            </Grid>

            <Grid item xs={2}>
              <FormControl className={classes.formControl}>
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
            </Grid>
            <br />
            <Grid item xs={2} className={classes.button}>
              <Button
                type='submit'
                color='primary'
                variant='contained'
                aria-label='submit task'
                onClick={this.handleSubmit}
              >
                Submit
              </Button>
            </Grid>
            <br />
          </form>
        </Grid>
      </Paper>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  createTask,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(RepRequestForm));
