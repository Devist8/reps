import React, { Component } from 'react';
import link from 'react-router-dom/Link';
//MUI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/styles/withStyles';

const styles = {
  navToolbar: {
    margin: 'auto',
  },
};
export class Navbar extends Component {
  render() {
    const classes = this.props;
    return (
      <AppBar>
        <Toolbar className='nav-container'>
          <Button
            color='inherit'
            className={classes.navBtn}
            component={link}
            to='/'
          >
            Home
          </Button>
          <Button
            color='inherit'
            className={classes.navBtn}
            component={link}
            to='/login'
          >
            Login
          </Button>
          <Button
            color='inherit'
            className={classes.navBtn}
            component={link}
            to='/signup'
          >
            Sign up
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(Navbar);
