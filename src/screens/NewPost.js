import React, { Component } from "react";
import {  Text, View, TouchableOpacity , StyleSheet, Image, FlatList, ActivityIndicator, TextInput} from 'react-native';
import { auth } from "../firebase/config";

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
        title: "",
        description: ""
    };
  }

  render() {
    return (
      <View>
        <TextInput
        onChangeText={(text) => this.setState({ title: text })}
        placeholder="email"
        keyboardType="default"
       />
       <TextInput
        onChangeText={(text) => this.setState({ description: text })}
        placeholder="Description"
        keyboardType="default"
        
       />
       <TouchableOpacity
        style={styles.button}
        onPress={() => (post)}
       >
        <Text style={styles.textButton}>Post</Text>
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

export default NewPost;
