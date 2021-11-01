import React, { Component } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import {db, auth} from '../firebase/config';
import Home from "../screens/Home";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Profile from "../screens/Profile";


const Drawer = createDrawerNavigator();

class Menu extends Component {
    constructor() {
      super();
      this.state = {
          logueado: false
      };
    }
    
    register(email, password) {
      auth.createUserWithEmailAndPassword(email, password)
          .then(() => console.log("Se gegistro Correctamente"))
          .catch((err) => console.log(err));
    }
    login(email, password){
      auth.signInWithEmailAndPassword(email, password)
          .then((userData)=> {this.setState({loggedIn: true})})
          .catch((e)=> console.log(e))
    }

    logout(){
      auth.signOut()
    }

  
    render() {
      return (
    this.state.logueado === true? 
    <NavigationContainer>
        <Drawer.Navigator>
        <Drawer.Screen name="Inicio" component={() => <Home />} />
        <Drawer.Screen name="Profile" component={() => <Profile logout={()=> this.logout()}/>} />
        </Drawer.Navigator>
    </ NavigationContainer> : 
    <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Login" component={() => <Login login={(email, pass)=> this.login(email, pass)}/>} />
          <Drawer.Screen name="Register" component={() => <Register register={(email, pass)=> this.register(email, pass)}/>} />
        </Drawer.Navigator>
    </ NavigationContainer>
    
      );
    }
  }
  
  export default Menu;
  