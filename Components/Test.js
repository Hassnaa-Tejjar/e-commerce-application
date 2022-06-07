import React, {useEffect,Component,useState,useRef,useLayoutEffect,} from 'react';
import { Image, Text, StyleSheet, View, ScrollView, TouchableOpacity,Dimensions, TextInput, Button, Alert,SafeAreaView } from 'react-native';
import { getDatabase, set,ref, onValue, DataSnapshot,orderByChild,equalTo,database,query, limitToLast, orderByKey, orderByValue} from 'firebase/database';
import { initializeApp, } from 'firebase/app';
import { firebaseConfig } from '../firebase-config';
import { getAuth, createUserWithEmailAndPassword, } from 'firebase/auth';
import firebase from '../firebase-config'
function Test(){

    
  const produits=[]
      const auth = getAuth(firebase);
      var user=auth.currentUser.uid;
      useEffect(()=>{

      
        onValue( ref(getDatabase(),'produits/'),snapshot=>{
          const data=snapshot.val();
          if(data!==null){
            Object.values(data).map((produit)=>{
              
              produits.push(produit);
            });
          }
        });
      
     },[produits]);
           
    return produits;
 }      


export default Test;