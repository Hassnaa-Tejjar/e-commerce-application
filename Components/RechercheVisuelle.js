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

function RechercheVisuelle(){
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
            return;
          }
      
          setSelectedImage({ localUri: pickerResult.uri });
        };
        let openImagePickerAsync1 = async () => {
            let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        
            if (permissionResult.granted === false) {
              alert("Permission to access camera roll is required!");
              return;
            }
        
            let pickerResult = await ImagePicker.launchCameraAsync();
            if (pickerResult.cancelled === true) {
                return;
              }
          
              setSelectedImage({ localUri: pickerResult.uri });
            };

        if (selectedImage !== null ) {
          return (
            <View>
              <Image
                source={{ uri: selectedImage.localUri }}
                style={styles.thumbnail}
              />
               <View style={{alignItems: 'flex-start'}}>
           
          </View>
            </View>
          );
      }
return (
  <View>
 
  <View style={{marginTop:70,alignItems:'center',justifyContent:'center'}}>
      <Text style={{fontSize:25,fontStyle:'normal',fontWeight:'bold',fontFamily:'serif'}}>RECHERCHE VISUELLE</Text>
      <Text style={{fontSize:15,marginTop:10, fontStyle:'normal'}}>Prenez une photo ou téléchargez une image pour </Text>
      <Text style={{fontSize:15,marginTop:10, fontStyle:'normal'}}>trouvez des articles similaires</Text>
  </View>
  
  <View style={{marginTop:90, flexDirection:'row',
  alignItems:'center',
  justifyContent:'space-between', }}>
      <View>
        <TouchableOpacity onPress={openImagePickerAsync1}>
      <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
                position:'relative',
                left:40,
               
                backgroundColor: 'rgba(0,0,0,0.2) ',
              
              }}>
              <Icon
                name="camera"
                size={50}
     
              />
            </View>
            </TouchableOpacity>
            <View style={{marginLeft:30,marginTop:10}}>
            <Text>Prendre une photo</Text></View>
        </View>
        <View>
        <TouchableOpacity onPress={openImagePickerAsync}>
            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
                position:'relative',
                right:-20,
               
                backgroundColor: 'rgba(0,0,0,0.2) ',
              
              }}>
              <Icon
                name="photo"
                size={50}
     
              />
            </View>
            </TouchableOpacity>
            <View style={{marginRight:20,marginTop:10}}>
            <Text >Télécharger une photo</Text></View>
            </View>
  </View>
  
  </View>
);

}
export default RechercheVisuelle;

const styles = StyleSheet.create({
    thumbnail: {
        width:350,
        height: 700,
        resizeMode: "contain",
        marginLeft:5,
      }
});



