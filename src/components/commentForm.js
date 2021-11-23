import React, {Component} from "react";
import {  Text, View, TouchableOpacity, Modal , StyleSheet, Image, FlatList, ActivityIndicator, TextInput, TouchableWithoutFeedbackBase} from 'react-native';
import {db, auth} from '../firebase/config'
import firebase from 'firebase'
import Comment from './Comment'

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
            <View >
                <Text>Comentarios</Text>
                <View> 
                    { this.props.info.data.comments.length == 0 ?
                    <Text>Se el primero en comentar</Text> :
                    <FlatList
                    
                        data={this.props.info.data.comments}
                        keyExtractor={(item)=> item.createdAt}
                        renderItem={({item})=> <Comment infoComentarios={item}></Comment>}
                       
                    ></FlatList>
                    }
                </View>
                <View>
                <TextInput
                    style= {styles.comentario}
                    placeholder='Comment'
                    keyboardType='default'
                    multiline
                    onChangeText={text => this.setState({comentario: text})}
                    value={this.state.comentario}
                    />
                <TouchableOpacity onPress={()=>this.comentar()} style= {styles.btnadd}>
                    <Text >Enviar comentario</Text>    
                </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    btnadd : {
        fontsize: 1.6,
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
    },
    comentario: {
        marginTop: 5,
        borderRadius: 5,
        height: 20,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#ccc',
    }
});

export default CommentForm;