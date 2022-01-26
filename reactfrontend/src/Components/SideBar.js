import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {
    alpha,
    AppBar,
    CircularProgress,
    createTheme, Grid,
    IconButton,
    InputBase, ListItemButton, Menu, MenuItem,
    SpeedDial,
    SpeedDialAction,
    Toolbar, Tooltip
} from "@mui/material";
import {styled, ThemeProvider} from "@mui/styles";
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import yellow from '@mui/material/colors/yellow';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LogoutIcon from '@mui/icons-material/Logout';
import {responsiveFontSizes } from '@mui/material/styles';
import Cookies from 'js-cookie';
import Button from "@mui/material/Button";
import MainChat from "./MainChat";
import NewChatModal from "./NewChatModal";
import axios from "axios";

function compare( a, b ) {
    if ( a.timeMessage < b.timeMessage ){
        return -1;
    }
    if ( a.timeMessage > b.timeMessage ){
        return 1;
    }
    return 0;
}

let senderReading=null;
let allMessages=null;
let userDoesntExist=false;
let sameEmail=false;
let mainUserMail=false;
let userImage=null;
class SideBar extends React.Component {
    constructor(props){
        super(props);
        this.state={messages:[],_loading:true, sender:null}

    }
    async componentDidMount(){
        mainUserMail=this.props.user.mail;
        axios({
            method: "get",
            url: "http://localhost:8081/api/v1/users/by-mail/"+mainUserMail,
        })
            .then(function (response) {
                console.log("succesful");
                userImage = response.data.pfp;
            })
            .catch(function (response) {
                userImage=null;
            });

        const response = await fetch("http://localhost:8082/api/v1/messages/receiver/"+this.props.user.mail);
        const body = await response.json();
        let unique_senders = []
        //find unique senders
        body.forEach(element => {
            if (element.sender.mail == this.props.user.mail){
                //sender not already in unique_senders
                if (!unique_senders.some(e=>e.mail === element.receiver.mail)){
                    unique_senders.push(element.receiver);
                }
            }
            else{
                if (!unique_senders.some(e=>e.mail === element.sender.mail)){
                    unique_senders.push(element.sender);
                }

            }
        })
        let unordered_latest_messages=[]
        //find all messages with the unique senders
        body.forEach(message =>{
            unique_senders.forEach(unique_sender =>{
                if (message.sender.mail === unique_sender.mail || message.receiver.mail === unique_sender.mail){
                    let sidebar_struct ={
                        message: message.message,
                        sender: unique_sender,
                        timeMessage: message.timeMessage
                    }
                    unordered_latest_messages.push(sidebar_struct);
                }
            })
        })
        //keep only latest message of each unique sender
        for (let i =0; i< unordered_latest_messages.length;i++){
            for (let j=0;j<unordered_latest_messages.length;j++){
                if (unordered_latest_messages[i].sender === unordered_latest_messages[j].sender){
                    if (unordered_latest_messages[i].timeMessage != unordered_latest_messages[j].timeMessage){
                        if (unordered_latest_messages[i].timeMessage < unordered_latest_messages[j].timeMessage){
                            unordered_latest_messages.splice(i,1);
                            continue;
                        }
                        else{
                            unordered_latest_messages.splice(j,1);
                            break;
                        }
                    }
                }
            }
        }

        this.setState({messages:unordered_latest_messages,_loading:false,sender:null});
        this.timerID = setInterval(
            ()=> this.checkMessages(),
            200
        )
    }

    async checkMessages(){
        if (senderReading==null){
            const response = await fetch("http://localhost:8082/api/v1/messages/receiver/"+this.props.user.mail);
            const _body = await response.json();
            const response2 = await fetch("http://localhost:8082/api/v1/messages/sender/"+this.props.user.mail);
            const __body = await response2.json();
            const body = await _body.concat(__body);
            let unique_senders = []
            //find unique senders
            body.forEach(element => {
                if (element.sender.mail == this.props.user.mail){
                    //sender not already in unique_senders
                    if (!unique_senders.some(e=>e.mail === element.receiver.mail)){
                        unique_senders.push(element.receiver);
                    }
                }
                else{
                    if (!unique_senders.some(e=>e.mail === element.sender.mail)){
                        unique_senders.push(element.sender);
                    }

                }
            })
            let unordered_latest_messages=[]
            //find all messages with the unique senders
            for (const message of body) {
                for (const unique_sender of unique_senders) {
                    if (message.sender.mail === unique_sender.mail || message.receiver.mail === unique_sender.mail){
                        let responsePfp = await fetch("http://localhost:8081/api/v1/users/by-mail/"+unique_sender.mail);
                        let responseBody=await responsePfp.json();
                        unique_sender.pfp = responseBody.pfp;
                        let sidebar_struct ={
                            message: message.message,
                            sender: unique_sender,
                            timeMessage: message.timeMessage,
                        }
                        unordered_latest_messages.push(sidebar_struct);
                    }
                }
            }
            //keep only latest message of each unique sender
            unordered_latest_messages.forEach(message =>{
                unordered_latest_messages.forEach(_message =>{
                    if (message.sender === _message.sender){
                        if (_message.timeMessage<message.timeMessage){
                            unordered_latest_messages.splice(unordered_latest_messages.indexOf(_message),1);
                        }
                    }
                }
                )})
            unordered_latest_messages.forEach(message =>{
                unordered_latest_messages.forEach(_message =>{
                        if (message.sender === _message.sender){
                            if (_message.timeMessage<message.timeMessage){
                                unordered_latest_messages.splice(unordered_latest_messages.indexOf(_message),1);
                            }
                        }
                    }
                )})
            unordered_latest_messages.forEach(message =>{
                unordered_latest_messages.forEach(_message =>{
                        if (message.sender === _message.sender){
                            if (_message.timeMessage<message.timeMessage){
                                unordered_latest_messages.splice(unordered_latest_messages.indexOf(_message),1);
                            }
                        }
                    }
                )})
            unordered_latest_messages.forEach(message =>{
                unordered_latest_messages.forEach(_message =>{
                        if (message.sender === _message.sender){
                            if (_message.timeMessage<message.timeMessage){
                                unordered_latest_messages.splice(unordered_latest_messages.indexOf(_message),1);
                            }
                        }
                    }
                )})


            this.setState({messages:unordered_latest_messages,_loading:false,sender:senderReading});
        }
        else{
            const response = await fetch("http://localhost:8082/api/v1/messages/receiver/"+this.props.user.mail);
            const _body = await response.json();
            const response2 = await fetch("http://localhost:8082/api/v1/messages/sender/"+this.props.user.mail);
            const __body = await response2.json();
            const body = await _body.concat(__body);
            let unique_senders = []
            //find unique senders
            body.forEach(element => {
                if (element.sender.mail == this.props.user.mail){
                    //sender not already in unique_senders
                    if (!unique_senders.some(e=>e.mail === element.receiver.mail)){
                        unique_senders.push(element.receiver);
                    }
                }
                else{
                    if (!unique_senders.some(e=>e.mail === element.sender.mail)){
                        unique_senders.push(element.sender);
                    }

                }
            })
            let unordered_latest_messages=[]
            //find all messages with the unique senders
            for (const message of body) {
                for (const unique_sender of unique_senders) {
                    if (message.sender.mail === unique_sender.mail || message.receiver.mail === unique_sender.mail){
                        let responsePfp = await fetch("http://localhost:8081/api/v1/users/by-mail/"+unique_sender.mail);
                        let responseBody=await responsePfp.json();
                        unique_sender.pfp = responseBody.pfp;
                        let sidebar_struct ={
                            message: message.message,
                            sender: unique_sender,
                            timeMessage: message.timeMessage,
                        }
                        unordered_latest_messages.push(sidebar_struct);
                    }
                }
            }
            //keep only latest message of each unique sender
            unordered_latest_messages.forEach(message =>{
                unordered_latest_messages.forEach(_message =>{
                        if (message.sender === _message.sender){
                            if (_message.timeMessage<message.timeMessage){
                                unordered_latest_messages.splice(unordered_latest_messages.indexOf(_message),1);
                            }
                        }
                    }
                )})
            unordered_latest_messages.forEach(message =>{
                unordered_latest_messages.forEach(_message =>{
                        if (message.sender === _message.sender){
                            if (_message.timeMessage<message.timeMessage){
                                unordered_latest_messages.splice(unordered_latest_messages.indexOf(_message),1);
                            }
                        }
                    }
                )})
            unordered_latest_messages.forEach(message =>{
                unordered_latest_messages.forEach(_message =>{
                        if (message.sender === _message.sender){
                            if (_message.timeMessage<message.timeMessage){
                                unordered_latest_messages.splice(unordered_latest_messages.indexOf(_message),1);
                            }
                        }
                    }
                )})
            unordered_latest_messages.forEach(message =>{
                unordered_latest_messages.forEach(_message =>{
                        if (message.sender === _message.sender){
                            if (_message.timeMessage<message.timeMessage){
                                unordered_latest_messages.splice(unordered_latest_messages.indexOf(_message),1);
                            }
                        }
                    }
                )})


            this.setState({messages:unordered_latest_messages,_loading:false,sender:senderReading});
            const response_received = await fetch("http://localhost:8082/api/v1/messages/by/"+senderReading.mail+"/to/"+this.props.user.mail);
            const received = await response_received.json();
            const response_sent = await fetch("http://localhost:8082/api/v1/messages/by/"+this.props.user.mail+"/to/"+senderReading.mail);
            const sent = await response_sent.json();
            let all_messages = received.concat(sent);
            allMessages=all_messages;

        }


    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    handleClickLogout(){
        Cookies.remove("userToken");
    }
    handleClickSetSender(sender){
        senderReading=sender;

    }

    handleNewMessageClick(){

    }

     async handleNewChatSubmit (event) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let mail = data.get('mailUser');
        if (mail == mainUserMail){
            userDoesntExist=false;
            sameEmail=true;
            return;
        }
        sameEmail=false;
        try{
            let user_response = await fetch("http://localhost:8081/api/v1/users/by-mail/" + mail);
            let user_selected = await user_response.json();
            console.log(user_selected);
            userDoesntExist=false;
            senderReading=user_selected;
        }catch(error){
            userDoesntExist=true;
            console.log("doesnt exist");
        }


    };

    render(){

        const {messages} = this.state;
        return (
            <Grid container spacing={0}>
                <Grid item xs={3}>

            <div>
                <AppBar position="static" sx={{backgroundColor:"#2a2f32"}}>
                    <Toolbar>
                            <Avatar alt={this.props.user.name+this.props.user.surnames} src={userImage} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                        </Typography>
                            <NewChatModal handleNewChatSubmit={this.handleNewChatSubmit} userDoesntExist={userDoesntExist} sameMailAsUser={sameEmail}/>
                        <Tooltip title="Logout">
                            <IconButton onClick={this.handleClickLogout} sx={{color:"#b1b3b5","&:hover":{backgroundColor: "#323739"}}}>
                                <LogoutIcon/>
                            </IconButton>
                        </Tooltip>
                            <Tooltip title="More...">
                                <IconButton sx={{"&:hover":{backgroundColor: "#323739"}}}>
                                    <MoreVertIcon sx={{color: "#b1b3b5"}}/>
                                </IconButton>
                            </Tooltip>

                    </Toolbar>

                </AppBar>

                <List sx={{ width: '100%', maxWidth: "100%",height:866, maxHeight:"100%", backgroundColor:"#131c21" }}>
                    {this.state._loading ? <CircularProgress /> : null}
                    {messages.map((message) => (
                        <div
                            key={message.timeMessage}>
                            <ListItemButton className={this.state.sender != null ? this.state.sender.mail == message.sender.mail ? "selected_chat" : "" : ""} onClick={this.handleClickSetSender.bind(this,message.sender)} sx={{"&:hover":{backgroundColor:"#323739"}}}>
                            <ListItem alignItems="flex-start" sx={{width:"100%",height:"100%"}} >
                                    <ListItemAvatar>
                                        <Avatar sx={{ width: 50, height: 50, mr:1}} alt={message.sender.name+message.sender.surnames} src={message.sender.pfp} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        sx={{color:"#ffffff", pl:1}}
                                        primary={message.sender.name+ " "+message.sender.surnames}
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    sx={{ display: 'inline',color:"#9f9f9f" }}
                                                    component="span"
                                                    variant="body2"
                                                >
                                                    {message.message}
                                                </Typography>
                                            </React.Fragment>
                                        }

                                    /> <Typography
                                    sx={{ display: 'inline',color:"#9f9f9f" }}
                                    component="span"
                                    variant="body2"
                                >
                                    {new Date(message.timeMessage).toUTCString().replace("GMT","").replace("2022","")}
                                </Typography>

                                </ListItem>
                            </ListItemButton>

                        </div>
                    ))}

                </List>
            </div>
                </Grid>
                <Grid item xs={9}>
                    <MainChat receiver={this.props.user} sender={senderReading ==  null ? null : senderReading} allMessages={allMessages == null ? null: allMessages} />
                </Grid>
            </Grid>



    );
}}

export default SideBar;
