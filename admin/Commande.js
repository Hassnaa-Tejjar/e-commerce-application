import React,  {useEffect,Component,useState}  from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text
} from 'react-native'
import { Image, ScrollView, TouchableOpacity,Dimensions, TextInput, Button, Alert,SafeAreaView } from 'react-native';
import { getDatabase, set,ref, onValue, DataSnapshot,orderByChild,remove,equalTo,database,query, limitToLast, orderByKey, orderByValue} from 'firebase/database';
import ListeCo from './ListeCo'
import Table from 'react-native-simple-table'

import { useNavigation } from '@react-navigation/native';


function Commande () {
 
    const navigation = useNavigation();
  
  
 
  
    return (
     
      <View>
       <Text style={styles.apercu}>Listes Des Commandes</Text>
       
                <View style={{top:35}}>
              
       <ListeCo/></View>
       </View>
    );
  }
  
  export default Commande;
  
  const styles = StyleSheet.create({
    apercu:{
      fontWeight: 'bold',
      fontSize:18,
      color:'#000000'
  },
  ajouter:{
    height: 40,
    width: 120,
    backgroundColor: 'black',
    borderRadius: 20,
    left:210,
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    position:'absolute',
    top:34
  },
  text:{
    alignItems:'center',
    borderRadius:35,
    color:'white',
    left:-12,
    top:14,
    fontSize:17,
    fontWeight: 'bold',
  }
  });