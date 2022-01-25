import logo from './logo.svg';
import './App.css';
import {createTheme, CssBaseline, Grid} from "@mui/material";
import Cookies from 'js-cookie';
import {Component} from "react";
import Login from "./Components/Login";
import SideBar from "./Components/SideBar";
import MainChat from "./Components/MainChat";
import {ThemeProvider} from "@mui/styles";






class App extends Component{
    constructor(props) {
        super(props);
        let encodedUser = Cookies.get("userToken");
        if (encodedUser != null) {
            let userDecoded = JSON.parse(decodeURI(encodedUser));
            this.state = {user: userDecoded}
        } else {
            this.state = {user: ""}
        }
    }
    async componentDidMount() {
        this.timerID = setInterval(
            () => this.checkUserLogged(),
            300
        );
    }
    async checkUserLogged(){
        if (Cookies.get('userToken') != null){
            this.setState({user:JSON.parse(decodeURI(Cookies.get('userToken')))})
        }
        else{
            this.setState({user:""});
        }
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    handleClick = () => {
        Cookies.remove("userToken");
    }

    render(){
        const {user} = this.state;
        if (user == ""){
            return (
                <Login />
            )
        }
        else{
            return (
                <SideBar user={this.state.user} />

            )
        }
    }



}

export default App;
