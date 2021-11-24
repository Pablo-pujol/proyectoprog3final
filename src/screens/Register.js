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
      
      <View style={styles.container}> 
        <Text style={styles.logo}>PhotoFactory </Text>
      <TextInput
        onChangeText={(text) => this.setState({ userName: text })}
        placeholder="user name"
        keyboardType="default"
        style={styles.input}
      />
      <TextInput
        onChangeText={(text) => this.setState({ email: text })}
        placeholder="email"
        keyboardType="email-address"
        style={styles.input}
      />
      
      <TextInput
        onChangeText={(text) => this.setState({ password: text })}
        placeholder="password"
        keyboardType="email-address"
        secureTextEntry={true}
        style={styles.input}
      />
      
      <Text > {this.props.errorRegister} </Text>

      {this.state.email && this.state.password && this.state.userName ? 
        <TouchableOpacity
        style={styles.touchable}
        onPress={() => this.props.register(this.state.email, this.state.password, this.state.userName)}
        >
          <Text style={styles.touchableText}>Registrar</Text>
        </TouchableOpacity> :
        <Text></Text>
      }
      </View>
      <View style={styles.container2}>
      <TouchableOpacity
        onPress={() => this.navigateToLogin()}
      >
        <Text >Ya tenes una cuenta? <Text style={styles.blue}>Ingresa aca </Text ></Text>
      </TouchableOpacity>
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    paddingHorizontal: 10,
    marginVertical: 20,
    alignItems: 'center',
    borderRadius: 1,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: "#BFBFBF ",
    marginTop: 50,
    marginHorizontal: 30,
    backgroundColor: "white"
},
container2:{
  paddingHorizontal: 10,
  marginVertical: 20,
  alignItems: 'center',
  borderRadius: 1,
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: "#BFBFBF ",
  marginTop: 10,
  marginHorizontal: 30,
  backgroundColor: "white",
  paddingVertical: 20,
},  

logo:{
    fontSize: 50,
    fontFamily: "Comic Sans MS",
    paddingBottom: 49,
    paddingTop: 39,
},
touchable:{
    backgroundColor: "#3097FF",
    paddingHorizontal: 10,
    paddingVertical: 6,
    textAlign: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: "#3097FF",
    with: 80,
    paddingHorizontal: 40,
    marginBottom: 25,
    marginTop: 17,
},
touchableText:{
    color: '#fff'
},
input: {
    height: 20,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 25,
    paddingVertical: 15,
    marginVertical: 14
},
blue:{
  color: "#0804FC"
}
});

export default Register;
