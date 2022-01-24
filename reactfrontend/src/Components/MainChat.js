import * as React from 'react';




class MainChat extends React.Component{
    constructor(props) {
        super(props);
        this.state={messagesSent:[],messagesReceived:[]}
    }


    render(){
        return(
         <div> {this.props.sender == null ? "Select a User to Start Chatting" : "Chatting with "+this.props.sender.name}</div>
        )

    }




}

export default MainChat;
