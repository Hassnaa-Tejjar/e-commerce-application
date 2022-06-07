import React, {useEffect,Component,useState} from 'react';
import { Image, Text, StyleSheet, View, ScrollView, TouchableOpacity,Dimensions, TextInput, Button, Alert,SafeAreaView } from 'react-native';
import { getDatabase, set,ref, onValue,} from 'firebase/database';
const width = Dimensions.get('window').width / 2 - 30;
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ajout from './Ajout';
import { useNavigation } from '@react-navigation/native';
import ListeOffre from './ListeOffre';

function OffreA(){

 

  const navigation = useNavigation();
  
  return (
   
    <View>
     <Text style={styles.apercu}>Les Produits avec Réduction</Text>
     
            
            <ListeOffre/> 
             
     </View>
  );
}

export default OffreA;

const styles = StyleSheet.create({
  apercu:{
    fontWeight: 'bold',
    fontSize:17,
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



