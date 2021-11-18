import React, { Component } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import {db, auth} from '../firebase/config';
import Home from "../screens/Home";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Profile from "../screens/Profile";
import NewPost from "../screens/NewPost";
import Search from "../screens/Search"

const Drawer = createDrawerNavigator();

class Menu extends Component {
    constructor(props) {
      super(props);
      this.state = {
          loggedIn: false,
          errorMessage: '',
          errorLogin: '',
          errorCode: '',
          registerButton: false,
          logButton: false,
          email: "",
          userName: "",
          password: "",
          cargando: false,
      };
    }
    
    componentDidMount (){
      auth.onAuthStateChanged((user) =>{
        if(user !== null){
          this.setState({
            loggedIn: true,
          })
        } else {
          this.setState({
            loggedIn: false,
          })
        }
      })
    }

    register(email, password, userName) {
      if(email === ""){
        alert("No puede haber campos vacios")
        }
      if(password === ""){
        alert("No puede haber campos vacios")
        }
      if(password.length < 6){
        alert("La contraseña debe contener al menos 6 caracteres")
        }
      if(userName === ""){
        alert("No puede haber campos vacios")
      }else { 
      auth.createUserWithEmailAndPassword(email, password)
          .then( res => {
            res.user.updateProfile({
              displayName: userName
            })
          })
          .then(() => console.log("Se registro Correctamente"))
          .catch((err) => {
            console.log(err)
            this.setState({
              errorMessage: err.message,
              errorCode: err.code
            })
          }
          )
         }
    }
    login(email, password){
      if(email === ""){
        alert("No puede haber campos vacios")
        } 
      if(password === ""){
        alert("No puede haber campos vacios")
      }else { 
      auth.signInWithEmailAndPassword(email, password)
          .then((userData)=> {this.setState({loggedIn: true})})
          .catch((e)=> {
            console.log(e)
            this.setState({
              errorLogin: e.message
            })
          }
          )
       }
    }

    logout(){
      auth.signOut()
    }

  
    render() {
      return (
    this.state.loggedIn === true? 
    <NavigationContainer>
        <Drawer.Navigator>
        <Drawer.Screen name="Inicio" component={() => <Home />} />
        <Drawer.Screen name="Profile" component={() => <Profile logout={()=> this.logout()}/>} />
        <Drawer.Screen name='Nuevo Post' component={(nuevoPostProps)=> <NewPost nuevoPostProps={nuevoPostProps} />} />
        <Drawer.Screen name='Search' component={()=> <Search/>} />
        </Drawer.Navigator>
    </ NavigationContainer> : 
     this.state.cargando === false ? 
      <p>Cargando</p>: 
    <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Login" component={(screenProps) => <Login screenProps={screenProps} login={(email, pass)=> this.login(email, pass)}/>} />
          <Drawer.Screen name="Register" component={(registerProps) => <Register  registerProps = {registerProps} register={(email, pass, userName)=> this.register(email, pass, userName)}/>} />
        </Drawer.Navigator>
    </ NavigationContainer>
    
      );
    }
  }
  
  export default Menu;
  