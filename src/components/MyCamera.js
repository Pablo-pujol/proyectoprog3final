import React, {Component} from "react";
import {  Text, View, TouchableOpacity, Modal , StyleSheet, Image, FlatList, ActivityIndicator, TextInput} from 'react-native';
import {db, auth, storage} from '../firebase/config'
import firebase from 'firebase'
import {Camera } from 'expo-camera'
import Icon from "react-native-vector-icons/FontAwesome";

//

class MyCamera extends Component{
    constructor(props){
        super(props);
        this.state={
            permission: false,
            photo: ''
        }
        this.camera;
    }
    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
            .then(()=> {
                this.setState({
                    permission: true
                })
            })
            .catch((e)=> console.log(e))
        Camera.getAvailableCameraTypesAsync()
            .then((res)=> console.log(res))

    }

    takePicture(){
        this.camera.takePictureAsync()
            .then((photo)=> {
                console.log(photo)
                this.setState({
                    photo: photo.uri,
                })
            })
            .catch((e)=> console.log(e))
    }
    savePhoto(){
        //console.log('guardar en firebase')
        fetch(this.state.photo)
            .then((res)=> res.blob())
                .then((img)=>{
                    const ref = storage.ref(`photos/${Date.now()}.jpg`)

                    ref.put(img)
                        .then(()=>{
                            ref.getDownloadURL()
                                .then((url)=> {
                                    this.props.onImageUpload(url)
                                    this.setState({
                                        photo:''
                                    })})
                        })

                })
            .catch((e)=> console.log(e))
    }
    cancelPhoto(){
        this.setState({
            photo : ''
        })
    }


    render(){
        return(
            <>
                {this.state.photo ? (
                <>
                    <Image 
                            style={{flex:1, width:'100%'}}
                            source={{uri: this.state.photo}}
                            />
                    <View style={styles.container}>
                        <TouchableOpacity 
                            style={styles.botones}
                            onPress={()=> this.savePhoto()}>
                            <Text>Aceptar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.botones}
                            onPress={()=> this.cancelPhoto()}>
                            <Text>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </>) : (
                <>
                    <Camera 
                    style={{flex:1, width:'100%'}}
                    type={Camera.Constants.Type.front}
                    ref={(cam) => (this.camera = cam)}
                    />
                    <TouchableOpacity  
                        style={styles.container2}
                        onPress={()=> this.takePicture()}>
                        <Text><Icon name="camera" size={30}  color="" /></Text>
                    </TouchableOpacity>
                </>
                )}
                
            </>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        marginVertical: 30,
        flexDirection: "row",
        textAlign: 'center',
        marginLeft: 70
    },
    container2:{
        border: 1,
        borderColor: "black",
        borderRadius: 20,
        textAlign: 'center',
        margin: 30,
       
    },
    botones:{
        borderRadius: 5,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: "#000000",
        marginLeft: 28,
        //padding: 10
        paddingHorizontal: 15,
        paddingVertical:7
    },
    
});

export default MyCamera;