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
      <View>
          <Image 
          style= {styles.profile_img}
          source= {require("../../assets/logousuario.png")}
          resizeMode= "contain"
          />
          <Text>Usuario: {auth.currentUser.email} </Text>
          <Text>Creado el: {auth.currentUser.metadata.creationTime} </Text>
          <Text>Ultima vez: {auth.currentUser.metadata.lastSignInTime} </Text>
          <Text>
                <FlatList
                data={this.state.posts}
                keyExtractor={(item)=> item.id}
                renderItem={({item})=> <Post infoPosteos={item}></Post>}
                ></FlatList>
          </Text>

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
   
});


export default Profile;