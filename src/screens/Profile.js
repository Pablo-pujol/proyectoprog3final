import React, { Component } from "react";
import {  Text, View, TouchableOpacity , StyleSheet, Image, FlatList, ActivityIndicator, TextInput} from 'react-native';
import { auth, db } from "../firebase/config";
import Post from '../components/Post.js'
import Icon from "react-native-vector-icons/FontAwesome";



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
      <View style ={ styles.container }>
         <Icon name="user" size={100} color="" style={styles.usericon}/>
          <Text style={styles.username}>{auth.currentUser.displayName} </Text>
          <Text style={styles.usermail}>{auth.currentUser.email} </Text>
          <Text>Creado el: {auth.currentUser.metadata.creationTime} </Text>
          <Text>Ultima vez: {auth.currentUser.metadata.lastSignInTime} </Text>
          <Text>Posts: {this.state.posts.length} </Text>
          <View style= {styles.contenedor}>
                <FlatList
                style={styles.contenedor}
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
  container: {
    padding: '5%',
    margin: '5%',
    border: '2px solid black',
    borderRadius: '2%'
  },
  usericon:{
    textAlign: 'center'
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
username:{
  margin: 'auto'
},
usermail:{
  marginTop: 30

},
contenedor:{
  marginTop: 20
}
  
});


export default Profile;