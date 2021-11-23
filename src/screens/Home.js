import React, {Component} from "react";
import {  Text, View, TouchableOpacity , StyleSheet, Image, FlatList, ActivityIndicator, TextInput} from 'react-native';
import { db } from "../firebase/config";
import Post from '../components/Post.js'



class Home extends Component{
    constructor(props){
        super(props)
        this.state={
            posts: []
        }

    }
    componentDidMount(){
        this.showPost();
    }
    showPost(){
        db.collection('posteos')
        .orderBy("createdAt", "desc")
        .onSnapshot((docs)=>{
            let posteos = []
            docs.forEach((doc)=>{
                posteos.push({
                    id: doc.id,
                    data: doc.data()
                })
                console.log(posteos)
            })
            this.setState({posts: posteos})
        })
    }
    render(){
        return(
            <View style={styles.container}>
                <FlatList
                style={styles.Post}
                data={this.state.posts}
                keyExtractor={(item)=> item.id}
                renderItem={({item})=> <Post infoPosteos={item}></Post>}
                ></FlatList>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  Post:{
    flex: 1,
    flexDirection: "row",

  },
  container: {
    alignItems: 'center'
    
  }
     
  });
  

export default Home;
