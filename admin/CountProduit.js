import React, {useEffect,Component,useState} from 'react';
import { Image, Text, StyleSheet, View, ScrollView, TouchableOpacity,Dimensions, TextInput, Button, Alert,SafeAreaView } from 'react-native';
import { getDatabase, set,ref, onValue, DataSnapshot } from 'firebase/database';
import { initializeApp, } from 'firebase/app';
import { firebaseConfig } from '../firebase-config';
import { getAuth, createUserWithEmailAndPassword, } from 'firebase/auth';
import firebase from '../firebase-config'
const width = Dimensions.get('window').width / 2 - 30;
import func from '../Components/Userpicture';
import Userpicture from '../Components/Userpicture';

import Icon from 'react-native-vector-icons/MaterialIcons';



function CountProduit(){
   
    const [users,setUsers]=useState([]);
    useEffect(()=>{
      onValue(ref(getDatabase(),'produits/'),snapshot=>{
        const data=snapshot.val();
         
        if(data!==null){
          Object.values(data).map((user)=>{
            setUsers(oldArray=>[...oldArray,user])
          });
        }
      });
    },[]);
   
    return (
      <View >
            <View >
            <Text style={{ fontSize:20,left:25,top:14,fontWeight:'bold'}}>{users.length}</Text>
            </View>
      </View>
    );
}
export default CountProduit;