import React, {Component} from "react";
import {  Text, View, TouchableOpacity , StyleSheet, Image, FlatList, ActivityIndicator, TextInput} from 'react-native';
import {db, auth} from '../firebase/config'
import MyCamera from '../components/MyCamera'
//import moment from "moment"


class NewPost extends Component{
    constructor(props){
        super(props);
        this.state={
            title: '',
            description:'',
            url:'',
            showCamera: true,
        }

    }
    submitPost (){
        db.collection('posteos').add({
            user: auth.currentUser.email,
            author: auth.currentUser.displayName,
            createdAt: moment().calendar(),
            title: this.state.title,
            description: this.state.description,
            likes: [],
            comments: [],
            photo: this.state.url
        })
        .then(()=> {
            console.log('se posteo')
            this.setState({
                title: '',
                description:'',
                showCamera: true
            }, ()=> {
                this.props.nuevoPostProps.navigation.navigate("Inicio")
            }
            )
        })
        .catch ((e)=> console.log(e))
    }
    onImageUpload(url){
        this.setState({
            url: url,
            showCamera: false
        })
    }

    
    render(){
        return(
            this.state.showCamera ? <MyCamera onImageUpload={(url)=> this.onImageUpload(url)}/> :
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Título'
                    keyboardType= 'default'
                    onChangeText = {text => this.setState({title: text})}
                    value={this.state.title}
                ></TextInput>
                <TextInput
                    style={styles.input}
                    placeholder='Descripción'
                    keyboardType= 'default'
                    onChangeText = {text => this.setState({description: text})}
                    value={this.state.description}
                    multiline={true}
                ></TextInput>
                <TouchableOpacity onPress={()=>this.submitPost()}
                                  
                                    style={styles.button}>
                    <Text>Postear</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
    },
    multilineInput:{
        height:100,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
    },
    button:{
        backgroundColor:'#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#28a745'
    },
    textButton:{
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
    }
})
export default NewPost;
