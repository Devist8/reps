import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';

//Redux
import { connect } from 'react-redux';
import {} from '../redux/actions/userActions';
import TableRows from '../components/TableRows';

const styles = (theme) => ({
  ...theme.spreadStyles,
  container: {},
  goalRow: {},
  tableTitle: {
    marginTop: '20px',
    marginBottom: '20px',
  },
  goalField: {
    marginTop: '50px',
    width: '80%',
  },
});

export class goals extends Component {
  constructor() {
    super();
    this.state = {
      goals: [],
      goal: '',
    };
  }

  handleDelete = (event, index, goals) => {
    const goalsArr = [...goals].slice(0, index);
    goalsArr.concat([...goals].slice(index + 1, goals.length));
    console.log(goalsArr);
    this.setState({
      goals: goalsArr,
      goal: '',
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const userDetails = {
      goals: this.state.goals,
    };
    this.props.addUserDetails(userDetails, this.props.history);
  };

  handleAdd = (event) => {
    const updatedGoals = this.state.goals.concat(this.state.goal);
    console.log(updatedGoals);
    this.setState({
      goals: updatedGoals,
      goal: '',
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.formContainer}>
        <Grid item sm={3} />
        <Grid item sm={6}>
          <Typography variant='h3' className={classes.tableTitle}>
            Lets talk goals!
          </Typography>
          <Table>
            <TableBody>
              {this.state.goals.length > 0 ? (
                this.state.goals.map((goal) => (
                  <TableRow key={this.state.goals.indexOf(goal)}>
                    <TableCell
                      colSpan={12}
                      align='left'
                      className={classes.goalRow}
                      key={this.state.goals.indexOf(goal)}
                    >
                      {goal}
                    </TableCell>
                    <TableCell align='center'>
                      <Tooltip title='Delete'>
                        <IconButton
                          aria-label='delete'
                          onClick={(event) =>
                            this.handleDelete(
                              event,
                              this.state.goals.indexOf(goal),
                              this.state.goals
                            )
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={12}
                    align='left'
                    className={classes.goalRow}
                  >
                    Add some goals!
                  </TableCell>
                </TableRow>
              )}
              <TableRow>
                <TableCell colSpan={12} align='left'>
                  <TextField
                    id='goals-input'
                    label='Goals'
                    name='goal'
                    multiline
                    rowsMax={5}
                    value={this.state.goal}
                    onChange={this.handleChange}
                    fullWidth
                  />
                </TableCell>
                <TableCell align='center'>
                  <IconButton
                    type='submit'
                    aria-label='add goal'
                    size='small'
                    onClick={this.handleAdd}
                  >
                    <AddIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid>
        <Grid item sm={3} />
        <Grid item sm={3} />
        <Grid item sm={6}>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className={classes.button}
            onSubmit={this.handleSubmit}
          >
            Submit
          </Button>
        </Grid>
        <Grid item sm={3} />
      </Grid>
    );
  }
}

export default withStyles(styles)(goals);
