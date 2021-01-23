import React, { Component } from 'react';
import '../App.css';
import WebSocketInstance from '../services/WebSocket'
import Chart from "react-google-charts";
import axiosInstance from "../axiosApi";


export default class BarChart extends Component {
    constructor(props) {
        super(props);
        this.state = {}

        this.waitForSocketConnection(() => {
            WebSocketInstance.initConnection(this.props.currentUser);
            WebSocketInstance.addCallbacks(this.setMessages.bind(this), this.addMessage.bind(this))
        });
    }

    waitForSocketConnection(callback) {
        const component = this;
        setTimeout(
            function () {

                if (WebSocketInstance.state() === 1) {
                    console.log("Connection is made")
                    callback();
                    return;
                } else {
                    console.log("wait for connection...")
                    component.waitForSocketConnection(callback);
                }
            }, 100);
    }



    async componentDidMount() {
        this.handleLoginSubmit("martin")
        const response = await axiosInstance.get('core/pizzalovers/')
        this.setState({data: response.data})
    }

    addMessage(message) {
        if(message.content != null){
            const parsedData = JSON.parse(message.content.replace(/'/g, '"'));
            this.setState({data:parsedData})
        }
    }

    setMessages(messages) {
        this.setState({ messages: messages.reverse()});
    }

    messageChangeHandler = (event) =>  {
        this.setState({
            message: event.target.value
        })
    }

    sendMessageHandler = (e, message) => {
        const messageObject = {
            from: this.props.currentUser,
            text: message
        };
        WebSocketInstance.newEventMessage(messageObject);
        this.setState({
            message: ''
        })
        e.preventDefault();
    }

    renderMessages = (messages) => {
        const currentUser = this.props.currentUser;
        return messages.map((message, i) => <li key={message.id} className={message.author === currentUser ? 'me' : 'him'}> <h4 className='author'>{ message.author } </h4><p>{ message.content }</p></li>);
    }

    handleLoginSubmit = (username) => {
        this.setState({ loggedIn: true, username: username });
        WebSocketInstance.connect();

    }

    render() {
        const messages = this.state.messages;
        const currentUser = this.props.currentUser;
        return (
            <div className="BarChart">

                <Chart
                    width='95%'
                    height='500px'
                    chartType="ColumnChart"
                    loader={<div>Loading Chart</div>}
                    data = {this.state.data}
                    options={{
                        title: 'Pizza Lovers top10',
                        chartArea: { width: '50%', height:'50%' },
                        hAxis: {
                            title: 'Username',
                            minValue: 0,
                        },
                        vAxis: {
                            title: 'Votes',
                        },
                    }}
                    legendToggle
                />

            </div>
        );
    }
}
