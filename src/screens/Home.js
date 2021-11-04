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
        db.collection('posteos').onSnapshot((docs)=>{
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
            <View>
                <FlatList
                data={this.state.posts}
                keyExtractor={(item)=> item.id}
                renderItem={({item})=> <Post infoPosteos={item}></Post>}
                ></FlatList>
            </View>
        )
    }
}
export default Home;
