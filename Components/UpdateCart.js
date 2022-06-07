import React, {useEffect,Component,useState,useRef,useLayoutEffect,} from 'react';
import { Image, Text, StyleSheet, View,FlatList, ScrollView, TouchableOpacity,Dimensions, TextInput, Button, Alert,SafeAreaView } from 'react-native';
import { getDatabase,update, set,ref, onValue, DataSnapshot,orderByChild,equalTo,database,query, limitToLast, orderByKey, orderByValue, increment} from 'firebase/database';
import { initializeApp, } from 'firebase/app';
import { firebaseConfig } from '../firebase-config';
import { getAuth, createUserWithEmailAndPassword, } from 'firebase/auth';
import firebase from '../firebase-config'



function UpdateCart(props){

  const add=()=>{

 const dbRef1 = query(
      ref(getDatabase(firebase), 'panier'),
      orderByChild("id_user"),
      equalTo(props.user)
    );
    onValue(dbRef1,snapshot=>{
      const data=snapshot.val();
      if(data!==null){
        Object.values(data).map((p)=>{
        if(p.id_produit==props.id){
          
       update(ref(getDatabase(firebase),'panier/'+p.id_cart),{quantite:p.quantite+1});        
      
      }
        });
      }
    
    });
 
  }
   
    return (
      <View>
        <Button  title='ADD' onPress={()=>{ajouter();add()}} />
     
      </View>
    )
   
  }
  export default UpdateCart;