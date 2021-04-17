import React from 'react';
import Calendar from 'react-calendar';
import './Calendar.css';
import dayjs from 'dayjs';


//MUI
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import AppBar from '@material-ui/core/AppBar'
import { FormatIndentDecreaseTwoTone } from '@material-ui/icons';




const useStyles = makeStyles((theme) => ({
    root: {
  
    },
    calendarContainer: {
        margin: 'auto',
        marginTop: '5rem',
        width: '65%',

    },
    drawerPaper: {
        width: '300px',
        backgroundImage: `url(/right_nav.svg)`
    },
    tile: {
        background: 'none',
        border: 'none'
    }
}))

export const DateHeader = () => {

};



export const CalendarNavBar = () => {
    const classes = useStyles();
    const [selected, setSelected] = React.useState([new Date()]);
    console.log(typeof selected)
    const handleDateClick = (value) => {
        console.log(selected.includes(value));
        const data = []
        selected.includes(value) ? data = selected.splice(selected.indexOf(value), 1) : data.push(value)
        setSelected(selected.concat(data))
        console.log(selected)
     
    }
    return (
        <AppBar style={{zIndex: '1000', }} >
        <Drawer variant='permanent' anchor='right' classes={{paper: classes.drawerPaper}} >
            
            <Grid item xs={12} className={classes.calendarContainer}>
                <Calendar 
                formatShortWeekday={(locale,date) => dayjs(date).format('dd')} 
                tileClassName={classes.tile} 
                prev2Label={null} 
                next2Label={null}
                onClickDay={(value, event) => handleDateClick(value)}  
                className={classes.calendar}
                />
            </Grid>
           
        </Drawer>
        </AppBar>
       
    )
}
