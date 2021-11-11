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
                        <TouchableOpacity onPress={()=> this.savePhoto()}>
                            <Text>Aceptar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
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
                        style={styles.container}
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
        border: 1,
        borderColor: "black",
        borderRadius: 20,
        textAlign: 'center',
        margin: 30
    },
    
});

export default MyCamera;