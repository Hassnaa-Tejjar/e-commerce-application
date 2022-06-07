import React, {useEffect,Component,useState} from 'react';
import { Image, Text, StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import { initializeApp, } from 'firebase/app';
import { firebaseConfig } from '../firebase-config';
import { getAuth, createUserWithEmailAndPassword, } from 'firebase/auth';
import firebase from '../firebase-config'

import { getStorage,ref, getDownloadURL } from 'firebase/storage';

function PanierPictures(props){
 
     const [url, setUrl] = useState();

     useEffect(() => {
       const func = async () => {
         const storage = getStorage();
         const reference = ref(storage,props.ImageFile);
         await getDownloadURL(reference).then((x) => {
           setUrl(x);
         })
       }
   
       if (url == undefined) {func()};
     }, []);
    return (
       
        <Image
          style={{width:120, height: 140,borderRadius:5,position:'relative',bottom:15}}
          source={{ uri: url }}
        />
     
       );
   
   }
   export default PanierPictures;