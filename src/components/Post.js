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
            showModal: false,
            modalConfirm: false
        }
    }
    componentDidMount(){
        this.estado()
    }
    estado(){
        //console.log(this.props.infoPosteos.data.likes.includes(auth.currentUser.email));
        if (this.props.infoPosteos.data.likes) {
            //console.log(this.props.infoPosteos.data.likes.length);
            this.setState({
                likesNum: this.props.infoPosteos.data.likes.length,
                //liked: true
            })  
        } if(this.props.infoPosteos.data.likes.includes(auth.currentUser.email)) {
            //console.log(this.props.infoPosteos.data.likes.length);
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
            likesNum: this.props.infoPosteos.data.likes.length ,
            liked: true
        })})
            .catch((e)=> console.log(e))
        
    }
    unlike(){
        let likePost = db.collection('posteos').doc(this.props.infoPosteos.id)
        likePost.update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        }).then(()=> {this.setState({
            likesNum: this.props.infoPosteos.data.likes.length  ,
            liked: false
        })})
            .catch((e)=> console.log(e))
    }
    
    borrarPost () {
        db.collection("posteos").doc(this.props.infoPosteos.id).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }
    
    openModal() {
        this.setState({
            showModal: true
        })
    }

    closeModal() {
        this.setState({
            showModal: false,
            modalConfirm: false
        })
    }
    modalDelete(){
        this.setState({
            modalConfirm: true
        })
    }

  
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.parteArriba}>
                    <Text  style= {styles.title}  >{this.props.infoPosteos.data.user}: {this.props.infoPosteos.data.title}</Text>
                    { this.props.infoPosteos.data.user === auth.currentUser.displayName ?
                    <TouchableOpacity   
                                        onPress={()=> this.modalDelete()}
                    >
                    <Text style= {styles.borrar} ><Icon name="trash" size={20} color="" /></Text>
                    </TouchableOpacity > :

                    <Text> </Text>
                    }
                </View>    

                <Image 
                    style= {styles.img} 
                    source= {this.props.infoPosteos.data.photo}
                    resizeMode= "cover"
                 />
                 <View style= {styles.boton}>
                 {this.state.liked === false ?
                
                <TouchableOpacity   style= {styles.botones}
                                    onPress={()=> this.like()}
                >
                <Text><Icon name="heart" size={20}  color="" /></Text>
                </TouchableOpacity> :
                <TouchableOpacity   style= {styles.botones}
                                    onPress={()=>this.unlike()}
                >
                <Text><Icon name="heart" size={20} color="red" /></Text>
                </TouchableOpacity>}
                <TouchableOpacity   style= {styles.botones}
                                    onPress={()=>this.openModal()}
                >
                <Text><Icon name="comment" size={20}  color="" /></Text>
                </TouchableOpacity>
                </View>
                <View  style = {styles.informacion}>
                    <Text>Likes: {this.state.likesNum}</Text>
                    <Text>{this.props.infoPosteos.data.user}: {this.props.infoPosteos.data.description}</Text>
                    <Text style={styles.cantComentarios}> Cantidad de comentarios: {this.props.infoPosteos.data.comments.length}</Text>
                </View>
               
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
                {
                     this.state.modalConfirm ?
                    <Modal  
                        visible={this.state.modalConfirm}
                        animationType="slide"
                        transparent={false}
                    >
                        <Text>Seguro que desea borrar este posteo?</Text>
                        <TouchableOpacity onPress={()=> this.borrarPost()}>
                            <Text>Confirmar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> this.closeModal()}>
                            <Text>Cancelar</Text>
                        </TouchableOpacity>

                    </Modal>
                    :
                    null
                }
                

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 10,
        marginVertical: 20,
        backgroundColor: 'rgba(125, 146, 107, 0.8)',
        borderRadius: '1%',
        padding: '5%',
        
    },
    parteArriba:{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItemsArr: "flex-start",

    },
    title: {
        fontSize: 15
        
        
    },
    img: {
        height: 200,
        borderRadius: 2,
        resizeMode : "cover",
        marginBottom: 7,
        marginTop: 8,
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
        flexDirection: "row",
        justifyContents: "center",
        alignItemsArr: "flex-start",
        
    },
    botones: {
        paddingRight: 10,
        
    },
    cantComentarios: {
        marginLeft: -4

    },
    informacion: {
       
    }

});
export default Post;