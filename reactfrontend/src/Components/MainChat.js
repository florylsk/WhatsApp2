import * as React from 'react';
import {AppBar, Container, IconButton, Paper, TextField, Toolbar} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from '@mui/icons-material/Search';
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import BackgroundImage from '../Assets/Images/background.jpg'; // Import using relative path
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import UnstyledInput from "./UnstyledInput";
import MicIcon from '@mui/icons-material/Mic';

const styles = {
    paperContainer: {
        height: 818,
        backgroundImage: `url(${BackgroundImage})`
    }
};


class MainChat extends React.Component{
    constructor(props) {
        super(props);
        this.state={messagesSent:[],messagesReceived:[]}
    }




    render(){
        if (this.props.sender == null){
            return (
                <div>Select a User to Start Chatting</div>
            )
        }
        else{
            return(
                <div>
                    <Divider orientation="vertical"/>
                    <AppBar position="static" sx={{backgroundColor:"#2a2f32"}}>
                        <Toolbar>
                            <Avatar alt={this.props.sender.name + this.props.sender.surnames} src="/test/var/123"/>
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                            >
                                &nbsp; {this.props.sender.name + " "+ this.props.sender.surnames}
                            </Typography>
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ flexGrow: 0, display: { xs: 'none', sm: 'block' } }}
                            >
                                <IconButton >
                                    <SearchIcon sx={{color:"#b1b3b5"}}/>
                                </IconButton>
                                <IconButton>
                                    <MoreVertIcon sx={{color: "#b1b3b5"}}/>
                                </IconButton>
                            </Typography>
                        </Toolbar>

                    </AppBar>
                        <Paper style={styles.paperContainer} square={true} height="100%">
                        </Paper>
                    <AppBar position="static" sx={{backgroundColor:"#2a2f32"}}>
                        <Toolbar>
                            <IconButton>
                                <InsertEmoticonIcon sx={{color:"#b1b3b5"}} fontSize="medium"/>
                            </IconButton>
                            <IconButton>
                                <AttachFileIcon sx={{color:"#b1b3b5"}} fontSize="medium"/>
                            </IconButton>
                            <UnstyledInput/>
                            <IconButton>
                                <MicIcon sx={{color:"#b1b3b5"}} />
                            </IconButton>
                        </Toolbar>

                    </AppBar>
                </div>
            )
        }

    }




}

export default MainChat;
