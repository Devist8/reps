import React, { Component } from 'react';
import link from 'react-router-dom/Link';
//MUI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/styles/withStyles';

const styles = {
  root: {
    backgroundImage: `url(/top_nav.svg)`,
  },
  navToolbar: {
    margin: 'auto',
  },
  appBarPaper: {
    backgroundImage: `url(/top_nav.svg)`,
  }

};
export class Navbar extends Component {
  render() {
    const classes = this.props;
    return (
      <AppBar elevation={0} className={classes.root} color='default' classes={{paper: classes.appBarPaper}}>
        <Toolbar className='nav-container' style={{backgroundImage: `url(/top_nav.svg)`,}}>
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
