import React, { Component } from "react";
import {  Text, View, TouchableOpacity , StyleSheet, Image, FlatList, ActivityIndicator, TextInput} from 'react-native';



class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput placeholder='email'
                    keyboardType= 'email-address'
                    style={styles.input}
                    onChangeText={texto => this.setState({email: texto})}/>
        <TextInput placeholder='password'
                    keyboardType= 'default'
                    secureTextEntry={true}
                    style={styles.input}
                    onChangeText={text => this.setState({pass: text})}/>
        <TouchableOpacity style={styles.touchable}
                        onPress={()=> this.props.login(this.state.email, this.state.pass)}>
                <Text style={styles.touchableText} >Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
      paddingHorizontal: 10,
      marginVertical: 20

  },
  touchable:{
      backgroundColor: '#28a745',
      paddingHorizontal: 10,
      paddingVertical: 6,
      textAlign: 'center',
      borderRadius: 4,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#28a745'

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
      paddingHorizontal: 10,
      paddingVertical: 15,
      marginVertical: 10
  }
});


export default Login;
