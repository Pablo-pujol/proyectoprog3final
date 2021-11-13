import React, {Component} from "react";
import {  Text, View, TouchableOpacity , StyleSheet, Image, FlatList, ActivityIndicator, TextInput} from 'react-native';
import { db } from "../firebase/config";
import Post from '../components/Post'



class Search extends Component{
    constructor(){
        super()
        this.state={
          search: '',
          posts:[],
          results: false
        }

    }
   buscador(){
       db.collection('posteos')
       .where('user', '==', this.state.search)
       .orderBy('createdAt', 'asc')
       .onSnapshot(docs => {
           let post = []
           docs.forEach(doc => {
               post.push({
                   id: doc.id,
                   data: doc.data()
               })
           })
           this.setState({
               posts: post,
               results: true           
            })
       })
   }
    
   render(){
        return(
            <>
                <View>
                    <Text>Search Posts</Text>
                    <TextInput 
                                keyboardType='default'
                                placeholder='search'
                                onChangeText={text=> this.setState({search: text})}
                    />
                    {this,state.search === '' ?
                    <TouchableOpacity>
                        <Text>Search</Text>
                    </TouchableOpacity>   :
                    <TouchableOpacity onPress={()=>this.buscador()}>
                        <Text>Search</Text>
                    </TouchableOpacity> 
                }
                </View>
            </>
        )
    }
}
export default Search;


