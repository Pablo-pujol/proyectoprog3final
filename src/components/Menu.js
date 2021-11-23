import React, { Component } from "react";
import { ActivityIndicator} from 'react-native';
import { StyleSheet, View } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";

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
          .catch((error) => {
            console.log(error)
            this.setState({
              errorMessage: error.message,
              errorCode: error.code
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
          .catch((error)=> {
            console.log(error)
            this.setState({
              errorLogin: error.message
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
      <NavigationContainer style={styles.container}>
          <Drawer.Navigator>
          <Drawer.Screen name="Inicio" component={() => <Home />} />
          <Drawer.Screen name="Profile" component={() => <Profile logout={()=> this.logout()}/>} />
          <Drawer.Screen name='Nuevo Post' component={(nuevoPostProps)=> <NewPost nuevoPostProps={nuevoPostProps} />} />
          <Drawer.Screen name='Search' component={()=> <Search/>} />
          </Drawer.Navigator>
      </ NavigationContainer> : 
      this.state.cargando === false ? 
        <p><ActivityIndicator  size="large"  color= "blue" /></p>: 
      <NavigationContainer>
          <Drawer.Navigator style={styles.container}>
            <Drawer.Screen name="Login" component={(screenProps) => <Login screenProps={screenProps} errorLogin = {this.state.errorLogin} login={(email, pass)=> this.login(email, pass)}/>} />
            <Drawer.Screen name="Register" component={(registerProps) => <Register  registerProps = {registerProps} errorRegister = {this.state.errorMessage} register={(email, pass, userName)=> this.register(email, pass, userName)}/>} />
          </Drawer.Navigator>
      </ NavigationContainer>
      );
    }
  }

const styles = StyleSheet.create({
  container:{
    justifyContent: 'space-between',
    alignContent: 'center'
  }
})
  
  export default Menu;
  