import React, {useEffect,Component,useState} from 'react';
import { Image, Text, StyleSheet, View, ScrollView, TouchableOpacity,Dimensions, TextInput, Button, Alert,SafeAreaView } from 'react-native';
import { getDatabase, set,ref, onValue, DataSnapshot,orderByChild,remove,equalTo,database,query, limitToLast, orderByKey, orderByValue} from 'firebase/database';
import { initializeApp, } from 'firebase/app';
import { firebaseConfig } from '../firebase-config';
import { getAuth, createUserWithEmailAndPassword, } from 'firebase/auth';
import firebase from '../firebase-config'
const width = Dimensions.get('window').width / 2 - 30;
import func from '../Components/Userpicture';
import Userpicture from '../Components/Userpicture';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EditP from './EditP';
function ProdA(){

 
   const navigation = useNavigation();
const [produits,setProduits]=useState([]);
const [selectedId, setSelectedId] = useState();

 
  useEffect(()=>{
 
    onValue( ref(getDatabase(),'produits/'),snapshot=>{
      const data=snapshot.val();
      if(data!==null){
        Object.values(data).map((produit)=>{
          
          setProduits(oldArray=>[...oldArray,produit])
        });
      }
    });
  },[]);
 
  

 
  
  
  return (
    
    <ScrollView contentContainerStyle={{flexDirection:'row',width:400,flexWrap:'wrap',height:100000}} showsVerticalScrollIndicator={false}>
     
      {produits.map((produit,index)=>{
         function dele() {
    remove(ref(getDatabase(firebase), 'produits/'+produit.id)) ;
  alert('deleted');
  }
          
        return(
          <View key={index}  >
             
          <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {navigation.navigate('DescriptionP',{produit}) }}>
               <View style={{flexDirection:"row",width:'50%'}} >
          <View  style={[styles.card,]}>
  
            <View
              style={{
                height: 100,
                alignItems: 'center',
              }}>
              <Userpicture ImageFile={produit.image}  style={{flex: 1, resizeMode: 'contain',width:900,height:100}}
              />
            
            </View>

          
            <View style={{alignItems: 'flex-end'}}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                  position:'relative',
                  bottom:110,
                  right:-10,
                  backgroundColor: 'rgba(0,0,0,0.2) ',
                  
                }}
                >
                
                <Icon
                  name="favorite"
                  size={23}
                  
                />
              </View>
            </View>
            
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 5,
              }}>
              <Text style={{fontSize: 14, fontWeight: 'bold',position:'relative',top:45,left:-8}}>
                <Text style={{fontSize: 13}}>MAD </Text>{produit.prix}
              </Text>
              <View
                style={{
                  height: 26,
                  width: 29,
                  backgroundColor: 'black',
                  borderRadius: 5,
                  left:66,
                  flex:1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  position:'absolute',
                  top:45
                }}>
                    
                       
                <Icon
                name="edit"
                style={{fontSize: 26, color: 'white', fontWeight: 'bold',}}
                onPress={() => {navigation.navigate('EditP',{produit}) }}
                />
              
              </View>
              <View
                style={{
                  height: 26,
                  width: 29,
                  backgroundColor: 'black',
                  borderRadius: 5,
                  left:8,
                  justifyContent: 'center',
                  alignItems: 'center',
                  position:'relative',
                  top:45
                }}>
                    
                       
                <Icon
                name="delete"
                style={{fontSize: 26, color: 'white', fontWeight: 'bold',}}
                onPress={() => {dele() }}
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

export default ProdA;

const styles = StyleSheet.create({
  card: {
     marginTop:25,
    height: 225,
    backgroundColor: 'white',
    width,
    marginHorizontal: 7,
    marginLeft:10,
    borderRadius: 10,
    marginBottom: -10,
    padding: 15,
    
  },
});



