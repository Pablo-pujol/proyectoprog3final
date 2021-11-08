import React, {Component} from "react";
import {  Text, View, TouchableOpacity, Modal , StyleSheet, Image, FlatList, ActivityIndicator, TextInput} from 'react-native';
import {db, auth} from '../firebase/config'
import firebase from 'firebase'

class CommentForm extends Component{
    constructor(props){
        super(props)
        this.state={
            comentario:''
        }
    }
    showComments(){
        
    }
    comentar(){
        let unComentario = {
            author: auth.currentUser.email,
            text: this.state.comentario
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
        return(
            <View >
                <Text>Comentarios</Text>
                <View>Campo con los Comentarios</View>
                <View>
                <TextInput
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
        marginBottom: 15
    }
});

export default CommentForm;