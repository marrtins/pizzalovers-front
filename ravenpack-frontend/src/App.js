import React, { Component } from 'react';

import './App.css';
import axiosInstance from "./axiosApi";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import DividedStructure from "./components/DividedStructure";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logged_in: localStorage.getItem('token') ? true : false,
            username: '',
            chartData: {},
            displayed_form: 'login',
            messages: []
        };
    }

    async componentDidMount() {
        if (this.state.logged_in) {
            fetch('http://localhost:8000/core/current_user/', {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            })
                .then((response) => {
                    if(!response.ok)
                        throw Error(response.status);
                    else
                        return response.json()
                })
                .then(json => {
                    this.setState({username: json.username});
                    this.setState({'displayed_form':'logged_in'})
                })
                .catch((error)=>{
                    this.handle_logout()
                    this.setState({
                        logged_in:false,
                        displayed_form:'login',
                        username:'',
                    })
                    console.log('error: ' + error)
                });

        }
    }

    handle_login = (e, data) => {
        e.preventDefault();
        fetch('http://localhost:8000/token-auth/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) =>{
            if(!response.ok)
                throw Error(response.status);
            else
                return response.json()})
            .then(json => {
                localStorage.setItem('token', json.token);
                this.setState({
                    logged_in: true,
                    displayed_form: 'logged_in',
                    username: json.user.username
                });
            })
            .catch((error)=>{
                this.setState({
                    logged_in:false,
                    displayed_form:'login',
                    username:'',

                })
                alert("Incorrect signin details - please try again")
                console.log('error: ' + error)
            })
    };

    handle_signup = (e, data) => {
        e.preventDefault();
        fetch('http://localhost:8000/core/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((response) =>{
                if(!response.ok)
                    throw Error(response.status);
                else
                    return response.json()})
            .then(json => {
                localStorage.setItem('token', json.token);
                this.setState({
                    logged_in: true,
                    displayed_form: 'logged_in',
                    username: json.username
                });
            })
            .catch((error)=>{
                alert("Incorrect signup details - please try again")
                console.log('error: ' + error)
            })
    };

    handle_voting = () => {
        //e.preventDefault();
        console.log("asd")
        fetch('http://localhost:8000/core/pizzalovers/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'JWT ' + localStorage.getItem('token')
            },
        })
            .then((response) =>{
                if(!response.ok)
                    throw Error(response.status);
                else
                    return response.json()})
            .catch((error)=>{
                alert("Voting error - expired token")
                window.location.reload(false);
                console.log('error: ' + error)
            })
    };

    /*handle_voting() {
        const data={'22':'22'}
        const options = {
            headers: {
                'Authorizations': 'JWT ' + localStorage.getItem('token')
            }
        }
        try{
            let response = axiosInstance.post('core/pizzalovers/', {}, {headers: {
                    'Authorizations': 'JWT ' + localStorage.getItem('token')
                }})
            console.log(response.headers)
            const msg = response.data
        }catch(error){
            console.log("Error: ", JSON.stringify(error, null, 4));
            throw error;
        }
    };*/

    handle_logout = () => {
        localStorage.removeItem('token');
        this.setState({ logged_in: false, username: '', displayed_form: 'login' });
    };

    display_form = form => {
        this.setState({
            displayed_form: form
        });
    };

    render() {
        return (
            <div className="App">
                <DividedStructure
                    handle_voting={this.handle_voting}
                    handle_login={this.handle_login}
                    handle_signup={this.handle_signup}
                    chartData={this.state.chartData}
                    username={this.state.username}
                    displayed_form={this.state.displayed_form}
                    logged_in={this.state.logged_in}
                    display_form={this.display_form}
                    handle_logout={this.handle_logout}
                    handle_login_submit={this.state.username}
                />
            </div>
        );
    }
}

export default App;