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
            createdAt: Date.now(),
            //time: moment().calendar(),
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
            <View state={styles.granContenedor}>
            <View style={styles.formContainer}>
                <Text>
                    {auth.currentUser.displayName}:
                    <TextInput
                    style={styles.input}
                    placeholder='Título'
                    keyboardType= 'default'
                    onChangeText = {text => this.setState({title: text})}
                    value={this.state.title}
                ></TextInput> 
                </Text>
                <Image 
                    style= {styles.img} 
                    source= {require("../../assets/Fotografías.webp")}
                    resizeMode= "cover"
                 />
                <TextInput
                    style={styles.input2}
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
            </View>
        )
    }
}
const styles = StyleSheet.create({

    granContenedor:{
        alignItems: 'center',
        backgroundColor: 'white',
        height: '100%',
        flex: 1,
        flexDirection: "row",
    },
    formContainer:{
        paddingHorizontal: 10,
        borderRadius: '1%',
        marginVertical: 20,
        padding: '5%',

        
    },
    multilineInput:{
        height:100,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: "#3097FF",
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
    },
    button:{
        backgroundColor:"#3097FF",
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: "#3097FF"
    },
    textButton:{
        color: '#fff'
    },
    img: {
        height: 200,
        borderRadius: 2,
        resizeMode : "cover",
        marginBottom: 7,
        marginTop: 8,
      },

    input: {
        height: 20,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: "#3097FF",
        borderRadius: 6,
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginVertical: 10,
        marginLeft: 15
    },
    input2: {
        height: 20,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: "#3097FF",
        borderRadius: 6,
        paddingHorizontal: 10,
        paddingTop: 15,
        paddingBottom: 32,
        marginVertical: 10
    },
})
export default NewPost;
