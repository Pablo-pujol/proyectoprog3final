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
    constructor() {
      super();
      this.state = {
          loggedIn: false,
          errorMessage: '',
          registerButton: false,
          logButton: false,
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

    register(email, password) {
      auth.createUserWithEmailAndPassword(email, password)
          .then(() => console.log("Se registro Correctamente"))
          .catch((err) => this.setState({
                    errorMessage: err.message
          }));
    }
    login(email, password){
      auth.signInWithEmailAndPassword(email, password)
          .then((userData)=> {this.setState({loggedIn: true})})
          .catch((e)=> this.setState({
                    errorMessage: e.message
          }))
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
        <Drawer.Screen name='Nuevo Post' component={()=> <NewPost/>} />
        <Drawer.Screen name='Search' component={()=> <Search/>} />
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
  