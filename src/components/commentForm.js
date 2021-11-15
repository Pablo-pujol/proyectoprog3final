import React, {Component} from "react";
import {  Text, View, TouchableOpacity, Modal , StyleSheet, Image, FlatList, ActivityIndicator, TextInput} from 'react-native';
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

    componentDidMount(){
        this.showComments();
    }
   
    showComments(){
        db.collection('posteos')
        .where("comentario", "==", "id")
        .onSnapshot((docs)=>{
            let comentarios = []
            docs.forEach((doc)=>{
                comentarios.push({
                    id: doc.id,
                    data: doc.data()
                })
                console.log(comentarios)
            })
            this.setState({comment: comentarios})
        })
    }
    
    comentar(){
        let unComentario = {
            author: auth.currentUser.email,
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
                    <FlatList
                        data={this.props.info.data.comments}
                        keyExtractor={(item)=> item.createdAt}
                        renderItem={({item})=> <Text>{item.text}</Text>}
                    ></FlatList>
                </View>
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