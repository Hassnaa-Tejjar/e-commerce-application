import React, {useEffect,Component,useState} from 'react';
import { Image, Text, StyleSheet, View,FlatList,TouchableWithoutFeedback, ScrollView, TouchableOpacity,Dimensions, TextInput, Button, Alert,SafeAreaView } from 'react-native';
import { getDatabase, set,ref, onValue, DataSnapshot,orderByChild,equalTo,database,query, limitToLast, orderByKey, orderByValue} from 'firebase/database';
import { initializeApp, } from 'firebase/app';
import { firebaseConfig } from '../firebase-config';
import { getAuth, createUserWithEmailAndPassword, } from 'firebase/auth';
import firebase from '../firebase-config'
const width = Dimensions.get('window').width;
const width1 = Dimensions.get('window').width;
import func from '../Components/Userpicture';
import Userpicture from '../Components/Userpicture';

import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DoubleClick from 'react-native-double-click';

import { color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

const DescriptionU=({navigation,route})=> {
    const p=route.params;
    const [produits,setProduits]=useState([]);
    const [avis,setAvis]=useState([]);
    const [user,setUsers]=useState([]);
    const [text,setText]=useState('');
   
    const [numberOfComments,setnumberOfComments]=useState(0);
    var userAvis=[];
  
    useEffect(()=>{
  
    const dbRef1 = query(
      ref(getDatabase(firebase), 'users'),
      orderByChild('id'),
      equalTo(p.produit.id)
      
    );
 
    onValue( dbRef1,snapshot=>{
      const data=snapshot.val();
      if(data!==null){
        Object.values(data).map((produit)=>{
          
          setProduits(oldArray=>[...oldArray,produit])
        });
      }
    });
  
  },[]); 
 const DescProduct=({prod})=>{
    return (
         
      <ScrollView contentContainerStyle={{flexDirection:'row',width:400,flexWrap:'wrap',height:690,right:-3}} showsVerticalScrollIndicator={false}>
     
  <TouchableOpacity
        activeOpacity={0.8}
        >
             <View style={{flexDirection:"row",width:'50%'}} >
        <View  style={[style.card,]} >

          <View
            style={{
              height: 80,
              alignItems: 'center',
              left:0,
              top:10,
            }}>
            <Image
                source={require('../assets/profil.png')}
                style={{height: 90, width: 90}}
              />
          </View>

          
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              marginTop: 45,
              left:78,
              position:'relative'
            }}>
                <Text style={{fontSize: 18, fontWeight: 'bold',position:'relative',width:180}}>
              {prod.nom} {prod.prenom}
               </Text>
               </View>

               <View style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              marginTop: 8,
              left:35,
              position:'relative'
            }}>
            <Text style={{fontSize: 17, fontWeight: 'bold',position:'relative',width:395}}>
              {prod.email}
            </Text>
            
            
            
          </View>
          <Text style={{top:20,left:-10,fontSize: 16, fontWeight: 'bold',}}>Autres informations</Text>
          <View style={{top:20}}>
          <Icon
              name="info"
              style={{fontSize: 25, color: '#000000', fontWeight: 'bold',marginTop:25,position:'relative',left:-10}}
              
              />
              <Text style={{fontSize: 16, fontWeight: 'bold',position:'relative',left:28,top:-25,fontFamily:'serif'}}>
             ID:
            </Text>
            <Text style={{position:'relative',left:65,marginTop:-19,fontSize: 14, position:'relative',width:230}}>
              {prod.id}
            </Text>
            <Icon
              name="map"
              style={{fontSize: 27, color: '#000000', fontWeight: 'bold',marginTop:20,position:'relative',left:-10}}
              
              />
            <Text style={{fontSize: 16, fontWeight: 'bold',position:'relative',width:395,left:28,top:-27,fontFamily:'serif'}}>
             Adresse:
            </Text>
            <Text style={{position:'relative',left:65,marginTop: -19,fontSize: 14, position:'relative',width:231}}>
              {prod.adresse}
            </Text>
            <Icon
              name="location-pin"
              style={{fontSize: 27, color: '#000000', fontWeight: 'bold',marginTop:20,position:'relative',left:-10}}
              
              />
            <Text style={{fontSize: 16, fontWeight: 'bold',position:'relative',width:395,left:28,top:-26,fontFamily:'serif'}}>
             Ville:
            </Text>
            <Text style={{position:'relative',left:65,marginTop: -19,fontSize: 15,position:'relative',width:395}}>
              {prod.ville}
            </Text>
            <Icon
              name="phone"
              style={{fontSize: 25, color: '#000000', fontWeight: 'bold',marginTop:12,position:'relative',left:-10}}
              
              />
            <Text style={{fontSize: 16, fontWeight: 'bold',position:'relative',width:395,left:28,top:-25,fontFamily:'serif'}}>
             Telephone:
            </Text>
            <Text style={{position:'relative',left:65,marginTop: -19,fontSize: 15, position:'relative',width:395}}>
              {prod.telephone}
            </Text>
            <Icon
              name="info"
              style={{fontSize: 25, color: '#000000', fontWeight: 'bold',marginTop:12,position:'relative',left:-8}}
              
              />
            <Text style={{fontSize: 16, fontWeight: 'bold',position:'relative',width:395,left:28,top:-25,fontFamily:'serif'}}>
             Sexe:
            </Text>
            <Text style={{position:'relative',left:65,marginTop: -19,fontSize: 15, position:'relative',width:395}}>
              {prod.sexe}
            </Text>
            
            </View>
            
        
       
        </View>
</View>
        </TouchableOpacity>  
         </ScrollView>
        
         
      
    ); 
    }
   return(
      <View style={{flex:1}}>
        <View style={{flex:1}}>
        {produits.map((produit,index)=>{
          return(
        <View key={index} >
       <View style={style.imageContainer}>
     
     
       </View>
       
     </View>)})}
     <View style={{marginTop:-35,flex:1}}>
     <FlatList
        showsVerticalScrollIndicator={true}
        style={{marginTop:-10}}
        data={produits}
        
        renderItem={({item}) => {
          return (
        
          <DescProduct prod={item} />);
        }}
        keyExtractor={item=>item.id}
      /></View>
     
       
        
      </View>
    </View>
   )
}
export default DescriptionU;

 const style = StyleSheet.create({
    
    card: {
      marginTop:40,
     height: 650,
     backgroundColor: '#f3ebe5',
     width,
     marginHorizontal: 7,
     marginLeft:0,
     borderRadius: 10,
     padding: 15,
     
   },
   
    
    })