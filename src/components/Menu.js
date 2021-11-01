import React, { Component } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import {db, auth} from '../firebase/config';
import Home from "../screens/Home";
import Login from "../screens/Login";
import Register from "../screens/Register";

const Drawer = createDrawerNavigator();

class Menu extends Component {
    constructor() {
      super();
      this.state = {
          logueado: false
      };
    }
  
    render() {
      return (
    this.state.logueado === true? 
    <NavigationContainer>
        <Drawer.Navigator>
        <Drawer.Screen name="Inicio" component={() => <Home />} />
        </Drawer.Navigator>
    </ NavigationContainer> : 
    <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Inicio" component={() => <Home />} />
          <Drawer.Screen name="Login" component={() => <Login />} />
          <Drawer.Screen name="Register" component={() => <Register />} />
        </Drawer.Navigator>
    </ NavigationContainer>
    
      );
    }
  }
  
  export default Menu;
  