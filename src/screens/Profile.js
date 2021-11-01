import React, { Component } from "react";
import {  Text, View, TouchableOpacity , StyleSheet, Image, FlatList, ActivityIndicator, TextInput} from 'react-native';


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
          <TouchableOpacity onPress={()=> this.props.logout()}>
            <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Profile;