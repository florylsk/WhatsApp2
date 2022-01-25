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


let senderReading=null;
let allMessages=null;
class SideBar extends React.Component {
    constructor(props){
        super(props);
        this.state={messages:[],_loading:true, sender:null}

    }
    async componentDidMount(){
        const response = await fetch("http://localhost:8082/api/v1/messages/receiver/"+this.props.user.mail);
        const body = await response.json();
        for (let i =0;i<body.length;i++){
            for (let j=0;j<body.length;j++){
                if (i!=j){
                    if (body[j].sender.mail == body[i].sender.mail){
                        body.splice(j,1);
                    }
                }
            }

        }
        this.setState({messages:body,_loading:false,sender:null});
        this.timerID = setInterval(
            ()=> this.checkMessages(),
            100
        )
    }

    async checkMessages(){
        if (senderReading==null){
            const response = await fetch("http://localhost:8082/api/v1/messages/receiver/"+this.props.user.mail);
            const body = await response.json();
            //TODO: properly get the last message of each person instead of randomly deleting duplicated messages
            for (let i =0;i<body.length;i++){
                for (let j=0;j<body.length;j++){
                    if (i!=j){
                        if (body[j].sender.mail == body[i].sender.mail){
                            body.splice(j,1);
                        }
                    }
                }

            }
            this.setState({messages:body,_loading:false,sender:senderReading});
        }
        else{
            const response = await fetch("http://localhost:8082/api/v1/messages/receiver/"+this.props.user.mail);
            const body = await response.json();
            //TODO: properly get the last message of each person instead of randomly deleting duplicated messages
            for (let i =0;i<body.length;i++){
                for (let j=0;j<body.length;j++){
                    if (i!=j){
                        if (body[j].sender.mail == body[i].sender.mail){
                            body.splice(j,1);
                        }
                    }
                }

            }
            this.setState({messages:body,_loading:false,sender:senderReading});
            const response_received = await fetch("http://localhost:8082/api/v1/messages/by/"+senderReading.mail+"/to/"+this.props.user.mail);
            const received = await response_received.json();
            const response_sent = await fetch("http://localhost:8082/api/v1/messages/by/"+this.props.user.mail+"/to/"+senderReading.mail);
            const sent = await response_sent.json();
            let all_messages = received.concat(sent);
            all_messages=all_messages.sort(function(a,b){
                return a.time  - b.time
            })
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


    render(){
        const {messages} = this.state;
        return (
            <Grid container spacing={0}>
                <Grid item xs={3}>

            <div>
                <AppBar position="static" sx={{backgroundColor:"#2a2f32"}}>
                    <Toolbar>
                        <Avatar alt={this.props.user.name+this.props.user.surnames} src="/test/var/123"/>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                        </Typography>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 0, display: { xs: 'none', sm: 'block' } }}
                        >
                            <Tooltip title="New Chat">
                                <IconButton sx={{"&:hover":{backgroundColor: "#323739"}}}>
                                    <ChatIcon sx={{color:"#b1b3b5"}}/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="More...">
                                <IconButton sx={{"&:hover":{backgroundColor: "#323739"}}}>
                                    <MoreVertIcon sx={{color: "#b1b3b5"}}/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Logout">
                                <IconButton onClick={this.handleClickLogout} sx={{color:"#b1b3b5","&:hover":{backgroundColor: "#323739"}}}>
                                    <LogoutIcon/>
                                </IconButton>
                            </Tooltip>
                        </Typography>
                    </Toolbar>

                </AppBar>

                <List sx={{ width: '100%', maxWidth: "100%",backgroundColor:"#131c21" }}>
                    {this.state._loading ? <CircularProgress /> : null}
                    {messages.map((message) => (
                        <div
                            key={message.sender.mail}>
                            <ListItemButton className={this.state.sender != null ? this.state.sender.mail == message.sender.mail ? "selected_chat" : "" : ""} onClick={this.handleClickSetSender.bind(this,message.sender)} sx={{"&:hover":{backgroundColor:"#323739"}}}>
                            <ListItem alignItems="flex-start" sx={{width:"100%",height:"100%"}} >
                                    <ListItemAvatar>
                                        <Avatar alt={message.sender.name+message.sender.surnames} src="/static/images/avatar/1.jpg" />
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
                                    {"17:49"}
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
