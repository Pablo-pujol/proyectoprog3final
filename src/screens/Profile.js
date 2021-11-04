import React, { Component } from "react";
import {  Text, View, TouchableOpacity , StyleSheet, Image, FlatList, ActivityIndicator, TextInput} from 'react-native';
import { auth } from "../firebase/config";


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
          <Image 
          style= {styles.profile_img}
          source= {require("../../assets/logousuario.png")}
          resizeMode= "contain"
          />
          <Text>Usuario: {auth.currentUser.email} </Text>
          <Text>Creado el: {auth.currentUser.metadata.creationTime} </Text>
          <Text>Ultima vez: {auth.currentUser.metadata.lastSignInTime} </Text>
          <TouchableOpacity onPress={()=> this.props.logout()}>
            <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  profile_img: {
    height: 193,
    borderRadius: 50
  }
   
});


export default Profile;