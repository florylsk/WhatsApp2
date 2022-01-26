import axios
    from "axios";
import Typography
    from "@mui/material/Typography";
import Box
    from "@mui/material/Box";
import {
    withStyles
} from "@mui/styles";
import Button
    from "@mui/material/Button";
import * as React
    from "react";
import Cookies from 'js-cookie';
import {Grid, TextField, Alert, Paper, createTheme} from "@mui/material";
import {ThemeProvider} from "@mui/styles"
import BackGround from "../Assets/Images/test.jpg"
import TestImage from "../Assets/Images/wsBlack.png";
import {styled} from "@mui/system";
import LoginRegisterForm from "./LoginRegisterForm";


let errorLogin = false;
let correctRegister = false;
let errorRegister = false;
function ErrorLogin(){
    if (errorLogin){
        return <Alert severity="error">Bad credentials!</Alert>
        errorLogin=false;
    }
    else{
        return null;
    }
}

const WhiteTextTypography = withStyles({
    root: {
        color: "#CDD2D7"
    }
})(Typography);




export default function Login(){
    const handleSubmitLogin = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let mail= data.get('mail');
        let password= data.get('password');
        let user = {
            mail: mail,
            password: password,
        };
        axios({
            method: "post",
            url: "http://localhost:8081/api/v1/login",
            data: user,
            headers: { "Content-Type": "application/json" },
        })
            .then(function (response) {
                let name = response.data.name;
                let surnames = response.data.surnames;
                let mail = response.data.mail;
                let id = response.data.id;
                let token=JSON.stringify({id:id,name:name,surnames:surnames,mail:mail});
                errorLogin=false;
                errorRegister=false;
                Cookies.set('userToken', token);
            })
            .catch(function (response) {
                errorLogin=true;
            });
    };

    const handleSubmitRegister = (event) =>{
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let name= data.get('name');
        let surnames= data.get('surnames');
        let mail= data.get('mail');
        let password= data.get('password');
        let pfp = data.get("pfp");
        var reader = new FileReader();
        reader.readAsDataURL(pfp);
        reader.onloadend = function() {
            var base64data = reader.result;
            let user = {
                name: name,
                surnames: surnames,
                mail: mail,
                password: password,
                pfp: base64data
            };

            axios({
                method: "post",
                url: "http://localhost:8081/api/v1/users",
                data: user,
                headers: { "Content-Type": "application/json" },
            })
                .then(function (response) {
                    correctRegister=true;
                })
                .catch(function (response) {
                    errorRegister=true;
                });
        }





    }

    const [ShowRegister,setShowRegister] = React.useState(false);

    const handleShowRegisterClick = ()=>{
        errorLogin=false;
        errorRegister=false;
        correctRegister=false;
        setShowRegister(true);
    }
    const handleShowLoginClick = () =>{
        errorLogin=false;
        errorRegister=false;
        correctRegister=false;
        setShowRegister(false);
    }


    return (

        <div>
            <Box component="form" noValidate onSubmit={!ShowRegister ? handleSubmitLogin: handleSubmitRegister} display="flex"
                 justifyContent="center"
                 alignItems="center"
                 minHeight="100vh"
                 bgcolor="#111b21">
                <Grid container spacing={2} alignItems="center" justify="center" direction="column">
                    <Grid item xs={3}>
                            <img src={TestImage} style={{borderRadius:"50%"}} />
                        <WhiteTextTypography variant="h3" sx={{mb:5}} color="success">
                            WhatsApp 2
                        </WhiteTextTypography>
                    </Grid>
                    <LoginRegisterForm showRegister={ShowRegister}/>
                    <Grid item xs={3}>
                        <Button
                            type="submit"
                            variant="outlined"
                            color="success"
                            sx={{mt:2}}
                        >
                            {!ShowRegister ? "Login" : "Register"}
                        </Button>
                        <Button onClick={!ShowRegister ? handleShowRegisterClick : handleShowLoginClick} size="small" color="success" sx={{ml:2,mt:2}}>Or {!ShowRegister ? "register" : "login"} here</Button>
                    </Grid>
                    <Grid item xs={3}>
                        <p style={{color:"#66bb6a"}}>

                            {correctRegister ? "User Registered Successfully" : null}

                        </p>
                        <p style={{color:"#e10303"}}>
                            {errorLogin ? "Wrong credentials!" : null }
                            {errorRegister ? "Something went wrong while registering the user" : null}
                        </p>
                    </Grid>
                </Grid>

            </Box>
        </div>
    )

}
