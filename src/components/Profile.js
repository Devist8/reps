import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
//MUI
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import FitnessIcon from '@material-ui/icons/FitnessCenter';
import KitchenIcon from '@material-ui/icons/Kitchen';
import TimeIcon from '@material-ui/icons/AccessTime';

//Redux
import { connect } from 'react-redux';
import { ThemeProvider } from '@material-ui/core';

const styles = (theme) => ({
  paper: {
    padding: 20,
  },
  profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',

      '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%',
      },
    },
    '& .profile-image': {
      width: 100,
      height: 100,
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%',
      margin: 'auto',
    },
    '& .profile-details': {
      textAlign: 'center',
      '& span, svg': {
        verticalAlign: 'middle',
      },
      '& a': {
        color: theme.palette.primary.main,
      },
    },
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0',
    },
    '& svg .button': {
      '& hover': {
        cursor: 'pointer',
      },
    },
  },
  buttons: {
    textAlign: 'center',
    '& a': {
      margin: '20px 10px',
    },
  },
});

export class Profile extends Component {
  componentDidUpdate(nextProps) {
    if (nextProps.user !== this.props.user) {
      this.setState({
        user: this.props.user,
      });
    }
  }

  render() {
    const {
      classes,
      user: {
        authenticated,
        info: { username, imageURL, dietType, weight, createdAt },
        tasks,
        completed,
        loading,
      },
    } = this.props;

    let profileMarkup = !loading ? (
      authenticated ? (
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className='profile-image'>
              <img src={imageURL} className='profile-image' alt='profile pic' />
            </div>
            <hr />
            <div className='profile-details'>
              <MuiLink
                component={Link}
                to={'/users/${username}'}
                color='primary'
                variant='h5'
              >
                @{username}
              </MuiLink>
              <hr />
              {dietType && (
                <Fragment>
                  <KitchenIcon color='primary' />
                  <span>{dietType}</span>
                  <hr />
                </Fragment>
              )}
              <hr />
              {weight && (
                <Fragment>
                  <FitnessIcon color='primary' />
                  <span>{weight}</span>
                  <hr />
                </Fragment>
              )}
              <hr />
              {createdAt && (
                <Fragment>
                  <TimeIcon color='primary' />
                  <span>{dayjs(createdAt).format('MMM YYYY')}</span>
                  <hr />
                </Fragment>
              )}
            </div>
          </div>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className='profile-image'>
              <img src={imageURL} alt='profile pic' />
            </div>
            <hr />
            <div className='profile-details'>
              <hr />
              {dietType && (
                <Fragment>
                  <KitchenIcon color='primary' />
                  <span>vegan</span>
                  <hr />
                </Fragment>
              )}
              <hr />
              {weight && (
                <Fragment>
                  <FitnessIcon color='primary' />
                  <span>175</span>
                  <hr />
                </Fragment>
              )}
              <hr />
              {createdAt && (
                <Fragment>
                  <TimeIcon color='primary' />
                  <span>{Date.now()}</span>
                  <hr />
                </Fragment>
              )}
            </div>
          </div>
        </Paper>
      )
    ) : (
      <p>loading...</p>
    );

    return profileMarkup;
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(Profile));
