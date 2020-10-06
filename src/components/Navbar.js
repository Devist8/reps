import React, { Component } from "react";
import link from "react-router-dom/Link";
//MUI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

export class Navbar extends Component {
  render() {
    return (
      <AppBar>
        <Toolbar>
          <Button color="inherit" component={link} to="/">
            Home
          </Button>
          <Button color="inherit" component={link} to="/login">
            Login
          </Button>
          <Button color="inherit" component={link} to="/signup">
            Sign up
          </Button>
          <Button color="inherit" component={link} to="/exercises">
            Exercises
          </Button>
          <Button color="inherit" component={link} to="/meals">
            Meals
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Navbar;
