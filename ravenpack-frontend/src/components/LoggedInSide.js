import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';



function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const state = {
    username: '',
    password: ''
};

const handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    state[name] = value;
    return state

};


const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {

        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function LoggedInSide(props) {
    const classes = useStyles();

    return (


        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <AccountCircleIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                You're Logged in
            </Typography>
            <h3>
                Hello, {props.username} ~{"\n"}
                Do you love pizza?
            </h3>

            <Button variant="contained" color="primary" onClick={() => props.handle_voting()}>
                I love Pizza!
            </Button>



        </div>


    );
}