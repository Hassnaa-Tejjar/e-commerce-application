import React, {useEffect,Component,useState} from 'react';
import { Image, Text, StyleSheet, View, ScrollView, TouchableOpacity,Dimensions, TextInput, Button, Alert,SafeAreaView } from 'react-native';
import { getDatabase, set,ref, onValue,} from 'firebase/database';
import ProdA from './ProdA';

const width = Dimensions.get('window').width / 2 - 30;
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ajout from './Ajout';
import { useNavigation } from '@react-navigation/native';
function ProduitsA(){

 
  

  const navigation = useNavigation();
  
  
 
  
  return (
   
    <View>
     <Text style={styles.apercu}>Listes Des Produits</Text>
     <TouchableOpacity onPress={() => {navigation.navigate('Ajout') }}  style={styles.ajouter}>
                    
                 <Text style={styles.text} >Ajouter</Text>  
                 
                <Icon
                name="add"
                style={{fontSize: 30, color: 'white', fontWeight: 'bold', left:38,top:-14,}}
                />
              
              </TouchableOpacity>
              <View style={{top:35}}>
            
     <ProdA/></View>
     </View>
  );
}

export default ProduitsA;

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



