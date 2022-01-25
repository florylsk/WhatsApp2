import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ChatIcon from "@mui/icons-material/Chat";
import {IconButton, TextField, Tooltip} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import {grey, lightBlue} from "@mui/material/colors";
import {dark} from "@mui/material/styles/createPalette";
import axios from "axios";
import Cookies from "js-cookie";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#30383c',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export default function NewChatModal(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    return (
        <div>
            <Tooltip title="New Chat">
            <IconButton sx={{"&:hover":{backgroundColor: "#323739"}}} onClick={handleOpen}>
                <ChatIcon sx={{color:"#b1b3b5"}}/>
            </IconButton>
            </Tooltip>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} >
                    <Typography id="modal-modal-title" variant="h6" component="h2" align="center" color={grey[300]}>
                        Start a new chat
                    </Typography>
                    <p></p>
                    <Box component="form" onSubmit={props.handleNewChatSubmit}>
                        <TextField id="mailUser" name="mailUser" label="User mail" variant="standard" color="success" />
                        <Button type="submit" variant="outlined" color="success" endIcon={<SendIcon />} sx={{color:"#ffffff",mt:1}}>
                            Send Message
                        </Button>
                    </Box>



                </Box>
            </Modal>
        </div>
    );
}
