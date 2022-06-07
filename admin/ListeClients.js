import React, {useEffect,Component,useState} from 'react';
import { Image, Text, StyleSheet, View, ScrollView, TouchableOpacity,Dimensions, TextInput, Button, Alert,SafeAreaView } from 'react-native';
import { getDatabase, set,ref, onValue, remove,DataSnapshot } from 'firebase/database';
import { initializeApp, } from 'firebase/app';
import { firebaseConfig } from '../firebase-config';
import { getAuth, createUserWithEmailAndPassword, } from 'firebase/auth';
import firebase from '../firebase-config'
const width = Dimensions.get('window').width / 2 - 20;
import func from '../Components/Userpicture';

import { useNavigation } from '@react-navigation/native';
import Userpicture from '../Components/Userpicture';
import Table from 'react-native-simple-table';
import { DescriptionU } from './DescriptionU';
import { EditU } from './EditU';
import Icon from 'react-native-vector-icons/MaterialIcons';
const DATA = [
    
    {
      title: 'Prenom',
      dataIndex: 'prenom',
      width: 80
    },
    {
      title: 'Nom',
      dataIndex: 'nom',
      width: 80
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
      width: 200
    },
    
          ];

function ListeClients(){
  const navigation = useNavigation();
  const [users,setUsers]=useState([]);
  
  useEffect(()=>{
    onValue(ref(getDatabase(),'users/'),snapshot=>{
      const data=snapshot.val();
       
      if(data!==null){
        Object.values(data).map((user)=>{
          setUsers(oldArray=>[...oldArray,user])
        });
      }
    });
  },[]);
 
  return (
    <ScrollView contentContainerStyle={{flexDirection:'row',width:400,flexWrap:'wrap',height:100000,right:-3}} showsVerticalScrollIndicator={false}>
     
    {users.map((produit,index)=>{
       function dele() {
  remove(ref(getDatabase(firebase), 'users/'+produit.id)) ;
alert('User deleted');
}
        
      return(
        <View key={index}  >
           
        <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => { }}>
             <View style={{flexDirection:"row",width:'50%'}} >
        <View  style={[styles.card,]} >

          <View
            style={{
              height: 100,
              alignItems: 'center',
            }}>
            <Image
                source={require('../assets/profil.png')}
                style={{height: 60, width: 60}}
              />
          </View>

        
          
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              marginTop: 5,
            }}>
                <Text style={{fontSize: 14, fontWeight: 'bold',position:'relative',top:-35,left:8,width:180}}>
              {produit.nom} {produit.prenom}
               </Text>
            <Text style={{fontSize: 14, fontWeight: 'bold',position:'relative',top:-32,marginLeft:-15,width:155}}>
              {produit.email}
            </Text>
            <View
              style={{
                height: 26,
                width: 29,
                backgroundColor: 'black',
                borderRadius: 5,
                left:86,
                flex:1,
                justifyContent: 'center',
                alignItems: 'center',
                position:'absolute',
                top:36
              }}>
              <Icon
              name="edit"
              style={{fontSize: 26, color: 'white', fontWeight: 'bold',}}
              onPress={() => {navigation.navigate('EditU',{produit}) }}
              />
            
            </View>
            <View
              style={{
                height: 26,
                width: 29,
                backgroundColor: 'black',
                borderRadius: 5,
                left:45,
                justifyContent: 'center',
                alignItems: 'center',
                position:'absolute',
                top:36,
              }}>
                  
                     
              <Icon
              name="delete"
              style={{fontSize: 26, color: 'white', fontWeight: 'bold',}}
              onPress={() => {dele() }}
              />
            
            </View>
            <View
              style={{
                height: 26,
                width: 29,
                backgroundColor: 'black',
                borderRadius: 5,
                right:98,
                justifyContent: 'center',
                alignItems: 'center',
                position:'absolute',
                top:36,
              }}>
              <Icon
              name="info"
              style={{fontSize: 26, color: 'white', fontWeight: 'bold',}}
              onPress={() => {navigation.navigate('DescriptionU',{produit}) }}
              />
            
            </View>
          </View>
     
       
        </View>
</View>
        </TouchableOpacity>  
       
        </View>
       
      )
    })}
    

  </ScrollView>
  );

}

export default ListeClients;

const styles = StyleSheet.create({
  
    title: {
        fontSize: 18,
        padding: 2,
        textAlign: 'center',
        fontWeight: 'bold',
        top:50,
        color:'#000000'
      },
      card: {
        marginTop:25,
       height: 190,
       backgroundColor: '#C0C0C0',
       width,
       marginHorizontal: 7,
       marginLeft:0,
       borderRadius: 10,
       marginBottom: -10,
       padding: 15,
       
     },
});



