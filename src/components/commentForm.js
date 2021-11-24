import React, {Component} from "react";
import {  Text, View, TouchableOpacity, Modal , StyleSheet, Image, FlatList, ActivityIndicator, TextInput, TouchableWithoutFeedbackBase} from 'react-native';
import {db, auth} from '../firebase/config'
import firebase from 'firebase'
import Comment from './Comment'
import Icon from "react-native-vector-icons/FontAwesome";

class CommentForm extends Component{
    constructor(props){
        super(props)
        this.state={
            comentario:'',
            comment: []
        }
    }


    comentar(){
        let unComentario = {
            author: auth.currentUser.displayName,
            text: this.state.comentario,
            createdAt: Date.now()
        }
        let Comment= db.collection('posteos').doc(this.props.info.id)
        Comment.update({
            comments: firebase.firestore.FieldValue.arrayUnion(unComentario)
        })
            .then(()=>{
                this.setState({
                    comentario: ''
                })
            })
    }

    render(){
        console.log(this.props)
        return(
            <View style={styles.conteiner}>
                <View style={styles.head} >
                <TouchableOpacity 
                                style={styles.cerrar}
                                onPress={() => this.props.closeModal()} >
                                <Text><Icon name="times-circle" size={20} color="" /></Text>
                            </TouchableOpacity>
                <Text  style={styles.coment} >Comentarios</Text>
                </View>
                <View style={styles.comentarios}> 
                    { this.props.info.data.comments.length == 0 ?
                    <Text>Se el primero en comentar</Text> :
                    <FlatList
                    
                        data={this.props.info.data.comments}
                        keyExtractor={(item)=> item.createdAt}
                        renderItem={({item})=> <Comment infoComentarios={item}></Comment>}
                       
                    ></FlatList>
                    }
                </View>
                <View style={styles.escribirComent}>                  
                <TextInput
                    style= {styles.comentario}
                    placeholder='Comment'
                    keyboardType='default'
                    multiline
                    onChangeText={text => this.setState({comentario: text})}
                    value={this.state.comentario}
                    />
                {this.state.comentario == '' ?
                <Text></Text>
                 :
                <TouchableOpacity onPress={()=>this.comentar()} style= {styles.btnadd}>
                <Text ><Icon name="share" size={15} color="white" /></Text>    
                </TouchableOpacity>
                }
                
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    conteiner:{
        
    },
    head: {
        flex: 1,
        flexDirection: "row",
        justifyContents: "center",
        alignItemsArr: "flex-start",
        marginBottom: 3,
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        marginTop: 20,
       
        
    },
    cerrar:{
        marginLeft: 15,
        paddingTop: 5,
    },
   
    coment:{
        alignItems: 'center',
        marginLeft: 100,
        marginRight: 139,
        fontSize: 20,
        fontFamily: "Comic Sans MS",
        paddingBottom: 15,
    }, 
    comentarios:{
        marginLeft: 15,
    },  
    btnadd : {
        fontsize: 1.6,
        borderRadius: 8,   
        borderRadius: 40,
        borderWidth: 1,
        backgroundColor: "#3097FF",
        paddingHorizontal: 15,       
        marginLeft: 5
    },
    escribirComent:{
        flexDirection: "row",
        //marginTop: 30,
        paddingRigth: 30,
        paddingTop: 20,
        textAlign: 'center',
        alignItems: "flex-end",
        borderStyle: 'solid',
        borderTopWidth: 1,
        borderColor: '#ccc',
    },  
    comentario: {
        borderRadius: 5,
        height: 20,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#ccc',
        //paddingLeft: 110,
        paddingRigth: 1000,
        marginLeft: 15,
        
    }

});

export default CommentForm;