import React, {Component} from "react";
import {  Text, View, TouchableOpacity, Modal , StyleSheet, Image, FlatList, ActivityIndicator, TextInput} from 'react-native';
import {db, auth} from '../firebase/config'
import firebase from 'firebase'
import CommentForm from "./commentForm";
import Icon from "react-native-vector-icons/FontAwesome";

class Post extends Component{
    constructor(props){
        super(props);
        this.state={
            likesNum: 0,
            liked: false,
            showModal: false
        }
    }
    componentDidMount(){
        this.estado()
    }
    estado(){
        console.log(this.props.infoPosteos.data.likes.includes(auth.currentUser.email));
        if (this.props.infoPosteos.data.likes) {
            console.log(this.props.infoPosteos.data.likes.length);
            this.setState({
                likesNum: this.props.infoPosteos.data.likes.length,
                //liked: true
            })  
        } if(this.props.infoPosteos.data.likes.includes(auth.currentUser.email)) {
            console.log(this.props.infoPosteos.data.likes.length);
            this.setState({
                //likesNum: this.props.infoPosteos.data.likes.lenght,
                liked: true
            })
        }
        

    }
    like(){
        let likePost = db.collection('posteos').doc(this.props.infoPosteos.id)
        likePost.update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        }).then(()=> {this.setState({
            likesNum: this.state.likesNum + 1 ,
            liked: true
        })})
            .catch((e)=> console.log(e))
        
    }
    unlike(){
        let likePost = db.collection('posteos').doc(this.props.infoPosteos.id)
        likePost.update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        }).then(()=> {this.setState({
            likesNum: this.state.likesNum - 1 ,
            liked: false
        })})
            .catch((e)=> console.log(e))
    }


    openModal() {
        this.setState({
            showModal: true
        })
    }

    closeModal() {
        this.setState({
            showModal: false
        })
    }
  
    render(){
        return(
            <View style={styles.container}>
                <Text>{this.props.infoPosteos.data.user}</Text>
                <Image 
                    style= {styles.img} 
                    source= {this.props.infoPosteos.data.photo}
                    resizeMode= "contain"
                 />
                 <View tyle= {styles.boton}>
                 {this.state.liked === false ?
                
                <TouchableOpacity 
                                    onPress={()=> this.like()}
                >
                <Text><Icon name="heart" size={15}  color="" /></Text>
                </TouchableOpacity> :
                <TouchableOpacity 
                                    onPress={()=>this.unlike()}
                >
                <Text><Icon name="heart" size={15} color="red" /></Text>
                </TouchableOpacity>}
                <TouchableOpacity   
                                    onPress={()=>this.openModal()}
                >
                <Text><Icon name="comment" size={15}  color="" /></Text>
                </TouchableOpacity>
                </View>
                <Text>Likes: {this.state.likesNum}</Text>
                <Text>{this.props.infoPosteos.data.user}: {this.props.infoPosteos.data.description}</Text>
                <Text> {this.props.infoPosteos.data.comments.text}</Text>
                

                {
                    ! this.state.showModal ? 
                        null
                    :
                        <Modal 
                           
                            visible={this.state.showModal}
                            animationType="slide"
                            transparent={false}
                        >
                           
                            <TouchableOpacity onPress={() => this.closeModal()} >
                                <Text>X</Text>
                            </TouchableOpacity>
                            <Text><CommentForm info={this.props.infoPosteos} /></Text>
                        </Modal>
                }
                

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 10,
        marginVertical: 20

    },
    img: {
        height: 193,
        borderRadius: 2
      },
    touchable:{
        backgroundColor: '#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#28a745',
        marginBottom: 5,

    },
    touchablered:{
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
    input: {
        height: 20,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginVertical: 10
    },
    boton: {
        flex: 1,
        flexDirection: "column"
    }
});
export default Post;