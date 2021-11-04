import React, {Component} from "react";
import {  Text, View, TouchableOpacity , StyleSheet, Image, FlatList, ActivityIndicator, TextInput} from 'react-native';
import { db } from "../firebase/config";
import Post from '../components/Post'



class Search extends Component{
    constructor(){
        super()
        this.state={
          
        }

    }
   
    render(){
        return(
            <View>
                <Text>Search</Text>
            </View>
        )
    }
}
export default Search;