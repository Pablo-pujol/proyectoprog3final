import React, { Component } from "react";
import {  Text, View, TouchableOpacity , StyleSheet, Image, FlatList, ActivityIndicator, TextInput} from 'react-native';
import { auth } from "../firebase/config";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      userName: "",
      password: "",
      
    };
  }

  navigateToLogin(){
    this.props.registerProps.navigation.navigate('Login')
}


  render() {
    return (
      <View>
      <TextInput
        onChangeText={(text) => this.setState({ userName: text })}
        placeholder="user name"
        keyboardType="default"
        
      />
      <TextInput
        onChangeText={(text) => this.setState({ email: text })}
        placeholder="email"
        keyboardType="email-address"
      />
      
      <TextInput
        onChangeText={(text) => this.setState({ password: text })}
        placeholder="password"
        keyboardType="email-address"
        secureTextEntry={true}
      />
      <TouchableOpacity
        onPress={() => this.navigateToLogin()}
      >
        <Text >Ya tenes una cuenta? </Text>
      </TouchableOpacity>
      <Text > {this.props.errorMessage} </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => this.props.register(this.state.email, this.state.password, this.state.userName)}
      >
        <Text style={styles.textButton}>Registrar</Text>
      </TouchableOpacity>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#28a745",
    paddingHorizontal: 10,
    paddingVertical: 6,
    textAlign: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#28a745",
  },
  textButton: {
    color: "#fff",
  },
});

export default Register;
