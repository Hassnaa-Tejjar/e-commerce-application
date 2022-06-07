import React,{useEffect,Component,useState,useRef,useLayoutEffect} from 'react';
import { Image,RefreshControl, Text, StyleSheet, View,FlatList, ScrollView, TouchableOpacity,Dimensions, TextInput, Button, Alert,SafeAreaView } from 'react-native';
import { getDatabase,remove, set,ref, onValue, DataSnapshot,orderByChild,equalTo,database,query, limitToLast, orderByKey, orderByValue} from 'firebase/database';
import { initializeApp, } from 'firebase/app';
import { firebaseConfig } from '../firebase-config';
import { getAuth, createUserWithEmailAndPassword, } from 'firebase/auth';
import firebase from '../firebase-config'
const width = Dimensions.get('window').width / 2 - 30;
import func from '../Components/Userpicture';
import Userpicture from '../Components/Userpicture';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DoubleClick from 'react-native-double-click';
import { color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

import GetUserFavoris from '../Components/GetUserFavoris'
function FavorisScreen() {
  const navigation = useNavigation();
  const produits=[];
  var f=GetUserFavoris();
  const auth = getAuth(firebase);
      var user=auth.currentUser.uid;
  function deleteFavorite(favoris){
    const dbRef1 = query(
      ref(getDatabase(firebase), 'favoris'),
      orderByChild("id_produit"),
      equalTo(String(favoris))
    );
    onValue(dbRef1,snapshot=>{
      const data=snapshot.val();
      if(data!==null){
        Object.values(data).map((fav)=>{
        if(fav.id_user==user){
          remove(ref(getDatabase(firebase),'favoris/'+fav.id_favoris));
          
        }  
        
        });
      }
    
    });
 
  }
       onValue(ref(getDatabase(firebase), 'produits'),snapshot=>{
          const data=snapshot.val();
          if(data!==null){
            Object.values(data).map((produit)=>{
              
              if(f.includes(parseInt(produit.id))){
                produits.push(produit);
              }
               
            });
            
          }
        
      
        }); 
     

 const WishList = ({produit}) => {
   
          return (
           
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Description', {produit})}>
              <View style={styles.card}>
              <View
                  style={{
                    height: 100,
                    alignItems: 'center',
                  }}>
                 <Userpicture ImageFile={produit.image}  style={{flex: 1, resizeMode: 'contain',width:900,height:100}}/>
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
                bottom:115,
                right:-15,
               
              
              }}>
              <Icon
                name="close"
                size={23}
                color='#000000'
                onPress={()=>{deleteFavorite(String(produit.id)); }}
              />
            </View>
          </View>
      
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 5,
                  }}>
                   <Text style={{fontSize: 17, fontWeight: 'bold',position:'relative',top:45,left:-8}}>
                      <Text style={{fontSize: 15}}>MAD </Text>{produit.prix}
                    </Text>
                  <View
                    style={{
                      height: 25,
                      width: 25,
                      backgroundColor: "#000000",
                      borderRadius: 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                      position:'relative',
                      top:45
                    }}>
                     <Icon
                      name="add"
                      style={{fontSize: 20, color: 'white', fontWeight: 'bold',}}
                      />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
      
          );
        };
    return (
      <View >
    <FlatList
     columnWrapperStyle={{justifyContent: 'space-between'}}
     showsVerticalScrollIndicator={false}
     contentContainerStyle={{
      marginTop: 7,
      paddingBottom: 250,
     
    }}
     numColumns={2}
     data={produits}
     renderItem={({item}) => {
       return <WishList produit={item} />;
     }}
     keyExtractor={item=>item.id}
   />
   </View>
    );
  }
  const styles = StyleSheet.create({

     card: {
      marginTop:25,
     height: 225,
     backgroundColor: 'white',
     width,
     marginHorizontal: 10,
     marginLeft:18,
     borderRadius: 10,
     marginBottom: -10,
     padding: 15,
     
   },
   
 
});
  export default FavorisScreen;