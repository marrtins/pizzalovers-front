import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import LoggedInSide from "./LoggedInSide";
import SignInSide from "./SignInSide";
import SignUpSide from "./SignUpSide";
import Nav from "./Nav";
import BarChart from "./BarChart";


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
        backgroundImage: `url("https://ak.picdn.net/shutterstock/videos/1008692788/thumb/1.jpg")`,
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

export default function DividedStructure(props) {
    const classes = useStyles();
    let form;
    switch (props.displayed_form) {
        case 'login':
            form = <SignInSide handle_login={props.handle_login} />;
            break;
        case 'signup':
            form = <SignUpSide handle_signup={props.handle_signup} />;
            break;
        case 'logged_in':
            form = <LoggedInSide handle_voting={props.handle_voting} chartData={props.chartData} username={props.username} />;
            break;
        default:
            form = null;
    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} component={Paper} square>
                <BarChart handle_login_submit={props.handle_login_submit} chart_data={props.chartData}/>
            </Grid>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Nav
                        logged_in={props.logged_in}
                        display_form={props.display_form}
                        handle_logout={props.handle_logout}
                    />
                    {form}
                </div>
            </Grid>
        </Grid>
    );
}