import React, {Component} from "react";
import {  Text, View, TouchableOpacity , StyleSheet, Image, FlatList, ActivityIndicator, TextInput} from 'react-native';
import { db } from "../firebase/config";

class Comment extends Component{
    constructor(props){
        super(props)
        this.state={
          
        }

    }
 
    render(){
        return(
            <View style={styles.container}>
                <Text>{this.props.infoComentarios.author}: {this.props.infoComentarios.text}</Text>
            </View>
        )
    }


}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 10,
        marginVertical: 13

    },

});


export default Comment;
