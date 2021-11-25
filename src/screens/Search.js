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
          posts: [],
          searched: false
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
            this.setState({
                searched: true
            })
            
       })
   }
    
   render(){
    console.log(this.state.posts)
    console.log(this.state.results)
        return(
            <View style={styles.container}>
                <View>
                    
                    <Text style={styles.title}>Search Posts</Text>
                    <TextInput  style={styles.input}
                                keyboardType='default'
                                placeholder='search'
                                onChangeText={text=> this.setState({search: text})}
                    />

                    {this.state.search === '' ?
                    <TouchableOpacity style= { styles.boton }>
                        <Text>Buscar</Text>
                    </TouchableOpacity>   :
                    <TouchableOpacity style= { styles.boton } onPress={()=>this.buscador()}>
                        <Text>Buscar</Text>
                    </TouchableOpacity> 
                    }
                </View>
                <View>
                    {this.state.searched == true ?
                    this.state.posts && !this.state.results  ?

                        <Text>El usuario no existe o aún no tiene publicaciones</Text> :
                        <FlatList
                        data={this.state.posts}
                        keyExtractor={(item)=> item.id}
                        renderItem={({item})=> <Post infoPosteos={item}></Post>}
                        />
                    
                    :
                    <Text></Text>
                
                }
                    
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container:{
      padding: '5%'  
    },
    title:{
        textDecorationLine: 'underline'
    },
    boton:{
        backgroundColor: 'rgba(160, 166, 239, 1)',
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: "center",
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#fff",
        width: '90%',
        marginTop: 20,
    },
    input:{
        alignContent: 'flex-start',
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#fff",
        width: '90%',
        marginTop: 20,
    }
   
})
export default Search;

