import React, {Component} from "react";
import {  Text, View, TouchableOpacity , StyleSheet, Image, FlatList, ActivityIndicator, TextInput} from 'react-native';
import { db } from "../firebase/config";
import Post from '../components/Post'



class Search extends Component{
    constructor(){
        super()
        this.state={
          results: false,
          search: '',
          posts: []
        }

    }
   buscador(){
       
       db.collection('posteos')
       .where('user', '==', this.state.search)
       .onSnapshot(docs => {
           let post = []
           docs.forEach(doc => {
               post.push({
                   id: doc.id,
                   data: doc.data()
               })
           })
           if(post.length != 0) {
            this.setState({
                posts: post, 
                results: true         
             })
            }else{
                this.setState({
                    results: false        
                    })
            }
            
       })
   }
    
   render(){
    console.log(this.state.posts)
    console.log(this.state.results)
        return(
            <>
                <View>
                    <Text>Search Posts</Text>
                    <TextInput 
                                keyboardType='default'
                                placeholder='search'
                                onChangeText={text=> this.setState({search: text})}
                    />
                    {this.state.search === '' ?
                    <TouchableOpacity>
                        <Text>Search</Text>
                    </TouchableOpacity>   :
                    <TouchableOpacity onPress={()=>this.buscador()}>
                        <Text>Search</Text>
                    </TouchableOpacity> 
                    }
                </View>
                <View>

                    {this.state.posts && !this.state.results  ?

                    <Text>El usuario no existe o aún no tiene publicaciones</Text> :
                    <FlatList
                    data={this.state.posts}
                    keyExtractor={(item)=> item.id}
                    renderItem={({item})=> <Post infoPosteos={item}></Post>}
                    />
                    }
                </View>
            </>
        )
    }
}
export default Search;

