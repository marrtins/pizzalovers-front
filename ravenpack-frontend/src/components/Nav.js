import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import './../App.css';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',

        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

export default function Nav(props){
    const classes = useStyles();
    const logged_out_nav = (
        <ButtonGroup color="primary" aria-label="outlined primary button group">
            <Button onClick={() => props.display_form('login')}>Login</Button>
            <Button onClick={() => props.display_form('signup')}>Signup</Button>
        </ButtonGroup>
    );
    const logged_in_nav = (
        <ButtonGroup color="primary" aria-label="outlined primary button group">
            <Button onClick={props.handle_logout}>Logout</Button>
        </ButtonGroup>
    );
    return (
        <div className={classes.root}>{props.logged_in ? logged_in_nav : logged_out_nav}</div>
    );
}


Nav.propTypes = {
    logged_in: PropTypes.bool.isRequired,
    display_form: PropTypes.func.isRequired,
    handle_logout: PropTypes.func.isRequired
};
