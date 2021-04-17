import React from 'react';

//MUI
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';


import {ReactComponent as HomeIcon} from '../../icons/home_icon.svg';
import {ReactComponent as WorkoutsIcon} from '../../icons/workouts_icon.svg';
import {ReactComponent as MealsIcon} from '../../icons/meals_icon.svg';
import {ReactComponent as StoreIcon} from '../../icons/store_icon.svg';

const useStyles=makeStyles((theme) => ({
    button: {
        margin: '0.5rem auto',
        height: '85%',
        width: '85%'
    },
    drawerPaper: {
        backgroundImage: `url(/left_nav.svg)`
    },
    leftDrawer: {
        borderRight: 'none',
    }
    
}))


export const AuthNavbar = () => {
    const classes = useStyles();
    return (
        <AppBar style={{zIndex: '1000'}}>
        <Drawer open={true} variant='permanent' style={{width: '10%'}} classes={{paper: classes.drawerPaper, paperAnchorDockedLeft: classes.leftDrawer}}>
            <Grid container style={{marginTop: '5rem'}}>
            <ToolBar>
                <List>
                <ListItem button className={classes.button}>
                    <HomeIcon/>
                </ListItem>
                <ListItem button className={classes.button}>
                    <WorkoutsIcon/>
                </ListItem>
                <ListItem button className={classes.button}>
                    <MealsIcon/>
                </ListItem>
                <ListItem button className={classes.button}>
                    <StoreIcon/>
                </ListItem>
                </List>
            </ToolBar>
            </Grid>
        </Drawer>
        </AppBar>
    )
}
