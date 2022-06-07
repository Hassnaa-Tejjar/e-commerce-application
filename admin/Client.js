import React,  {useEffect,Component,useState}  from 'react';
import Table from 'react-native-simple-table';

import AjouterU from './AjouterU';
import ListeClients from './ListeClients';
const width = Dimensions.get('window').width / 2 - 30;
import Icon from 'react-native-vector-icons/MaterialIcons';
import { DescriptionU } from './DescriptionU';
import { useNavigation } from '@react-navigation/native';
import {
  Platform,StyleSheet,View,Text,Dimensions,TouchableOpacity
} from 'react-native'

const Clients= () => {
  const navigation = useNavigation();
    return (
     
      <View >

      <Text style={styles.title}>Listes Des Clients</Text>
      <TouchableOpacity onPress={() => {navigation.navigate('AjouterU') }}  style={styles.ajouter}>
                    
                 <Text style={styles.text} >Ajouter</Text>  
                 
                <Icon
                name="add"
                style={{fontSize: 30, color: 'white', fontWeight: 'bold', left:38,top:-14,}}
                />
              
              </TouchableOpacity>
              <View style={{top:35}}>
      <ListeClients/>
      </View>
    </View>
    );
  };
  export default Clients;
  const styles = StyleSheet.create({
    text:{
  alignItems:'center',
  borderRadius:35,
  color:'white',
  left:-12,
  top:14,
  fontSize:17,
  fontWeight: 'bold',
},
    ajouter:{
      height: 40,
      width: 120,
      backgroundColor: '#b6825e',
      borderRadius: 20,
      left:210,
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      position:'absolute',
      top:34
    },
    title: {
      fontSize: 18,
      padding: 2,
      textAlign: 'center',
      fontWeight: 'bold',
      top:0,
      left:-100,
      color:'#000000'
    },
    apercu:{
      
  },
  });

