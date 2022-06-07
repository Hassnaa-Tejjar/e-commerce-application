import React, {useEffect,Component,useState,useRef,useLayoutEffect,} from 'react';
import { Image, Text, StyleSheet, View, ScrollView, TouchableOpacity,Dimensions, TextInput, Button, Alert,SafeAreaView } from 'react-native';
import { getDatabase, set,ref, onValue, DataSnapshot,orderByChild,equalTo,database,query, limitToLast, orderByKey, orderByValue} from 'firebase/database';
import { initializeApp, } from 'firebase/app';
import { firebaseConfig } from '../firebase-config';
import { getAuth, createUserWithEmailAndPassword, } from 'firebase/auth';
import firebase from '../firebase-config'
function GetUserPanier(){
      const [FindPanier,setFindPanier]=useState([]);
      const auth = getAuth(firebase);
      var user=auth.currentUser.uid;
      useEffect(()=>{
      const dbRef1 = query(
        ref(getDatabase(firebase), 'panier'),
        orderByChild("id_user"),
        equalTo(user),
      );
       onValue( dbRef1,snapshot=>{
        const data=snapshot.val();
        if(data!==null){
          Object.values(data).map((p)=>{
            setFindPanier(oldArray=>[...oldArray,parseInt(p.id_produit)])
          });
        }
       
      });
  
     },[]);
    var l=FindPanier;
    return l;
 }      


export default GetUserPanier;