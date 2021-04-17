import React, { Component } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import CollapseTable from '../components/CollapseTable';
import RepRequestForm from '../components/RepRequestForm';
import Profile from '../components/Profile';
import met from '../util/met';
import defaultExercises from '../util/DefaultTasks';
//Mui
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

//Redux
import { connect } from 'react-redux';

export class home extends Component {
  constructor() {
    super();
    this.state = {
      defaultUser: {
        username: 'user',
        repXP: 0,
        profileImage:
          'https://firebasestorage.googleapis.com/v0/b/reps-699b0.appspot.com/o/98062229209.jpg/?alt=media',
      },
      defaultExercises: defaultExercises,
    };
  }

  render() {
    const { classes } = this.props;
    const { errors } = this.state;
    return (
      <Grid container spacing={2}>
        
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

export default connect(mapStateToProps)(home);
