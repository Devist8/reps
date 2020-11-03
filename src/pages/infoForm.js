import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import allergies from '../util/allergies';

//Redux
import { connect } from 'react-redux';
import {} from '../redux/actions/userActions';
const styles = (theme) => ({
  ...theme.spreadStyles,
  subtitle: {
    marginTop: '20px',
    marginBottom: '0px',
  },
  formControl: {
    width: '100%',
  },
  heightField: {
    margin: '10px',
    width: '45%',
  },
});

export class infoForm extends Component {
  constructor() {
    super();
    this.state = {
      dob: '',
      weight: '',
      feet: 0,
      inches: 0,
      height: ``,
      allergies: [],
      diet: '',
      goals: '',
      errors: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const userDetails = {
      dob: this.state.email,
      weight: this.state.password,
      height: `${this.state.feet}'${this.state.inches}"`,
      allergries: this.state.allergries,
      diet: this.state.diet,
    };
    this.props.addUserDetails(userDetails, this.props.history);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors } = this.state;
    return (
      <Grid container className={classes.formContainer}>
        <Grid item sm />
        <Grid item sm>
          <Typography variant='h3' className={classes.title}>
            Additional Information
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id='dob'
              name='dob'
              type='date'
              label='Date of Birth'
              className={classes.textField}
              helperText={errors.dob}
              error={errors.dob ? true : false}
              value={this.state.dob}
              onChange={this.handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
            <br />
            <Typography
              variant='subtitle2'
              align='left'
              className={classes.subtitle}
            >
              Height
            </Typography>
            <TextField
              id='feet'
              name='feet'
              type='number'
              label='Feet'
              className={classes.heightField}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
            />
            <TextField
              id='inches'
              name='inches'
              type='number'
              label='Inches'
              className={classes.heightField}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
            />
            <FormControl className={classes.formControl}>
              <InputLabel id='diet-type'>Diet Type</InputLabel>
              <Select
                id='diet'
                name='diet'
                labelId='diet-type'
                helperText={errors.password}
                error={errors.diet ? true : false}
                value={this.state.diet}
                onChange={this.handleChange}
              >
                <MenuItem value={'vegitarian'}>Vegitarian</MenuItem>
                <MenuItem value={'vegan'}>Vegan</MenuItem>
                <MenuItem value={'pescatarian'}>Pescatarian</MenuItem>
                <MenuItem value={'fruitarian'}>Fruitarian</MenuItem>
                <MenuItem value={'omnivore'}>Omnivore</MenuItem>
                <MenuItem value={'other'}>Other</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id='allergies'>Any allergies?</InputLabel>
              <Select
                id='allergies'
                name='allergies'
                labelId='allergies'
                multiple
                helperText={errors.allergies}
                error={errors.allergies ? true : false}
                value={this.state.allergies}
                onChange={this.handleChange}
              >
                {allergies.map((allergy) => {
                  return (
                    <MenuItem key={allergy} value={allergy}>
                      {allergy}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <TextField
              id='goals-input'
              label='Goals'
              name='goals'
              multiline
              rowsMax={5}
              value={this.state.goals}
              onChange={this.handleChange}
              fullWidth
            />
            <br />
            {errors.general && (
              <Typography variant='body2' className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button
              type='submit'
              variant='contained'
              color='primary'
              className={classes.button}
              onSubmit={this.handleSubmit}
            >
              Submit
            </Button>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

infoForm.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(infoForm));
