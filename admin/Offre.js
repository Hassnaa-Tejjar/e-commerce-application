import React, {useEffect,Component,useState} from 'react';
import { Image, Text, StyleSheet, View, ScrollView, TouchableOpacity,Dimensions, TextInput, Button, Alert,SafeAreaView } from 'react-native';
import { getDatabase, set,ref, onValue, DataSnapshot } from 'firebase/database';
import { initializeApp, } from 'firebase/app';
import { firebaseConfig } from '../firebase-config';
import { getAuth, createUserWithEmailAndPassword, } from 'firebase/auth';
import firebase from '../firebase-config'
const width = Dimensions.get('window').width;
import func from '../Components/Userpicture';
import Userpicture from '../Components/Userpicture';
import Produit from '../Components/Produit';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

function Offre(){
    const navigation = useNavigation();
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [isImageShown, setIsImageShown] =useState(true);
    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("Permission to access camera roll is required!");
          return;
        }
        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        if (pickerResult.cancelled === true) {
            return;}
          setSelectedImage({ localUri: pickerResult.uri });
        };
      
    
return (
    <View style={{marginTop:100,left:40,}} >
    <Text style={styles.text}>Image</Text>
        <TouchableOpacity style={{marginTop:-30,left:80,}} onPress={openImagePickerAsync}>
            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
                position:'relative',
                right:-58,
                top:-20,
                backgroundColor: 'rgba(0,0,0,0.2) ',
              }}>
              <Icon
                name="photo"
                size={50}/>
            </View>
            </TouchableOpacity>
            <View style={{marginRight:20,marginTop:10}}>
            <Text >Télécharger une photo</Text></View>
            
 
  
  </View>
);

}
export default Offre;

const styles = StyleSheet.create({
    thumbnail: {
        width:350,
        height: 700,
        resizeMode: "contain",
        marginLeft:5,
      }
});
