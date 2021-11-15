import React, { Component } from "react";
import {  Text, View, TouchableOpacity , StyleSheet, Image, FlatList, ActivityIndicator, TextInput} from 'react-native';
import { auth, db } from "../firebase/config";
import Post from '../components/Post.js'


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }


  componentDidMount(){
    this.showMyPost();
  }
  showMyPost(){
    db.collection('posteos')
    .where("user", "==", auth.currentUser.email)
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

  render() {
    return (
      console.log(auth.currentUser),
      <View>
          <Image 
          style= {styles.profile_img}
          source= {require("../../assets/logousuario.png")}
          resizeMode= "contain"
          />
          <Text>{auth.currentUser.displayName} </Text>
          <Text>{auth.currentUser.email} </Text>
          <Text>Creado el: {auth.currentUser.metadata.creationTime} </Text>
          <Text>Ultima vez: {auth.currentUser.metadata.lastSignInTime} </Text>
          <Text>Posts: {this.state.posts.length} </Text>
          <View style= {styles.MyPost2}>
                <FlatList
                style={styles.MyPost}
                data={this.state.posts}
                keyExtractor={(item)=> item.id}
                renderItem={({item})=> <Post infoPosteos={item}></Post>}
                ></FlatList>
          </View>

          <TouchableOpacity onPress={()=> this.props.logout()}
                            style={styles.touchable} >
            <Text style={styles.touchableText}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  profile_img: {
    height: 193,
    borderRadius: 50
  },
  touchable:{
    backgroundColor: 'red',
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
MyPost:{
  flex: 1,
  flexDirection: "row",
},
MyPost2:{
  flex: 1,
  flexDirection: "column",
}   
});


export default Profile;