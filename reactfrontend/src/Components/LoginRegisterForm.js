import {Container, Grid, TextField} from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";


export default function LoginRegisterForm(props){

    if (!props.showRegister){
        return(
            <Grid item xs={3}>
                <TextField
                    required
                    fullWidth
                    id="mail"
                    label="Mail"
                    name="mail"
                    variant="standard"
                    color="success"
                />
                <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    variant="standard"
                    color="success"
                    sx={{mt:2}}
                />

            </Grid>


        )
    }
    else{
        return(
            <Grid item xs={3}>
                <TextField
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    variant="standard"
                    color="success"
                />
                <TextField
                    required
                    fullWidth
                    name="surnames"
                    label="Surnames"
                    type="text"
                    id="surnames"
                    variant="standard"
                    color="success"
                    sx={{mt:2}}
                />
                <TextField
                    required
                    fullWidth
                    name="mail"
                    label="Mail"
                    type="email"
                    id="mail"
                    variant="standard"
                    color="success"
                    sx={{mt:2}}
                />
                <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    variant="standard"
                    color="success"
                    sx={{mt:2}}
                />

            </Grid>
            )

    }


}
