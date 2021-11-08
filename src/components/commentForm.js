import React, {Component} from "react";
import {  Text, View, TouchableOpacity, Modal , StyleSheet, Image, FlatList, ActivityIndicator, TextInput} from 'react-native';
import {db, auth} from '../firebase/config'
import firebase from 'firebase'

class CommentForm extends Component{
    constructor(){
        super()
        this.state={
            comentario:''
        }
    }

    onSubmit(){
        console.log(`El comentario ingresado es: ${this.state.comentario}`);
    }

    render(){
        return(
            <View >
                <Text>Comentarios</Text>
                <View>Campo con los Comentarios</View>
                <TextInput
                    style= {styles.btnadd}
                    onChangeText={(text)=>this.setState({comentario: text})}
                    placeholder='Comentario'
                    keyboardType='default'
                    multiline
                    />
                <TouchableOpacity onPress={()=>this.onSubmit()} style= {styles.btnadd}>
                    <Text >Enviar comentario</Text>    
                </TouchableOpacity>
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