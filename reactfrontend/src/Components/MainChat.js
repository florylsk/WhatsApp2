import * as React from 'react';
import {
    AppBar, Card, CardActionArea, CardContent, Chip,
    CircularProgress,
    Container,
    Grid,
    IconButton,
    LinearProgress,
    Paper,
    TextField,
    Toolbar
} from "@mui/material";
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
import TestImage from '../Assets/Images/wsBlack.png';
import axios from "axios";
import Cookies from "js-cookie"; // Import using relative path


const styles = {
    paperContainer: {
        height: 818,
        backgroundImage: `url(${BackgroundImage})`
    }
};
const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let message= data.get('message');
    let sender_name = data.get('sender_name');
    let sender_surnames = data.get('sender_surnames');
    let sender_mail = data.get('sender_mail');
    let receiver_name = data.get("receiver_name");
    let receiver_surnames = data.get("receiver_surnames");
    let receiver_mail = data.get("receiver_mail");
    let dataJSON={
        sender: {name:sender_name,surnames:sender_surnames,mail:sender_mail},
        receiver: {name:receiver_name,surnames:receiver_surnames,mail:receiver_mail},
        timeMessage: Date.now(),
        message:message,
    };
    axios({
        method: "post",
        url: "http://localhost:8082/api/v1/messages",
        data: dataJSON,
        headers: { "Content-Type": "application/json" },
    })
        .then(function (response) {
            Array.from(document.querySelectorAll("input")).forEach(
                input => (input.value = "")
            );
        })
        .catch(function (response) {
                console.log(response);
        });
};

let orderedM=null;

function compare( a, b ) {
    if ( a.timeMessage < b.timeMessage ){
        return -1;
    }
    if ( a.timeMessage > b.timeMessage ){
        return 1;
    }
    return 0;
}

class MainChat extends React.Component{
    constructor(props) {
        super(props);
        this.state={allMessages:props.allMessages}
    }





    render(){
        const orderedMessages = this.props.allMessages!= null ? this.props.allMessages.sort(compare).reverse() : null;
        if (this.props.sender == null){
            return (
                <Grid sx={{backgroundColor:"#262d31", height: "100%"}} container
                      spacing={0}
                      direction="column"
                      alignItems="center"
                      justifyContent="center"
                      style={{ minHeight: '100vh' }}>

                    <img src={TestImage} style={{borderRadius:"50%"}} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 0, display: { xs: 'none', sm: 'block' }, color:"#a9a8a8",mt:6 }}
                    >
                        Welcome to WhatsApp 2, click on someone to start chatting.
                    </Typography>

                </Grid>
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
                                variant="h7"
                                noWrap
                                component="div"
                                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                            >
                                &nbsp; &nbsp; {this.props.sender.name + " "+ this.props.sender.surnames}
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
                        <Paper style={styles.paperContainer} square={true} height="100%" sx={{display:"flex", flexDirection:"column-reverse"}}>
                            {this.props.allMessages ==null ? <LinearProgress color="success" /> : null}
                            {this.props.allMessages != null ? orderedMessages.map((message) => (
                                <div
                                    key={message.timeMessage}>

                                    <Card sx={message.sender.mail == this.props.sender.mail ? { maxWidth: 500, backgroundColor:"#262d31",borderRadius:20, maxHeight:50, float:"left", mb:1 } : { maxWidth: 500, backgroundColor:"#056162",borderRadius:20, maxHeight:50, float:"right",mb:1 }}>
                                        <CardContent>
                                            <Typography variant="body2" sx={{color:"#Ffffff"}}>
                                                {message.message}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </div>

                            )) : null}





                        </Paper>
                    <AppBar position="static" sx={{backgroundColor:"#2a2f32"}}>
                        <Toolbar>
                            <IconButton>
                                <InsertEmoticonIcon sx={{color:"#b1b3b5"}} fontSize="medium"/>
                            </IconButton>
                            <IconButton>
                                <AttachFileIcon sx={{color:"#b1b3b5"}} fontSize="medium"/>
                            </IconButton>
                            <Box component="form" onSubmit={handleSubmit} >
                                <UnstyledInput name="message"/>
                                <input type="hidden" name="sender_name" value={this.props.receiver.name}/>
                                <input type="hidden" name="sender_surnames" value={this.props.receiver.surnames}/>
                                <input type="hidden" name="sender_mail" value={this.props.receiver.mail}/>
                                <input type="hidden" name="receiver_name" value={this.props.sender.name} />
                                <input type="hidden" name="receiver_surnames" value={this.props.sender.surnames} />
                                <input type="hidden" name="receiver_mail" value={this.props.sender.mail} />
                            </Box>

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

