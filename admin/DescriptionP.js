import React, {useEffect,Component,useState} from 'react';
import { Image, Text, StyleSheet, View,FlatList,TouchableWithoutFeedback, ScrollView, TouchableOpacity,Dimensions, TextInput, Button, Alert,SafeAreaView } from 'react-native';
import { getDatabase, set,ref, onValue, DataSnapshot,orderByChild,equalTo,database,query, limitToLast, orderByKey, orderByValue} from 'firebase/database';
import { initializeApp, } from 'firebase/app';
import { firebaseConfig } from '../firebase-config';
import { getAuth, createUserWithEmailAndPassword, } from 'firebase/auth';
import firebase from '../firebase-config'
const width = Dimensions.get('window').width -30;
const width1 = Dimensions.get('window').width;
import func from '../Components/Userpicture';
import Userpicture from '../Components/Userpicture';
import DescPicture from '../Components/DescPicture';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DoubleClick from 'react-native-double-click';

import { color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

const DescriptionP=({navigation,route})=> {
    const p=route.params;
    const [produits,setProduits]=useState([]);
    const [avis,setAvis]=useState([]);
    const [user,setUsers]=useState([]);
    const [text,setText]=useState('');
    const [numberOfComments,setnumberOfComments]=useState(0);
    var userAvis=[];
  
    useEffect(()=>{
  
    const dbRef1 = query(
      ref(getDatabase(firebase), 'produits'),
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
  useEffect(()=>{
 
 
    onValue( ref(getDatabase(firebase), 'users'),snapshot=>{
      const data=snapshot.val();
      if(data!==null){
        Object.values(data).map((user)=>{
          
          setUsers(oldArray=>[...oldArray,user])
        });
      }
    });
  
  },[]); 
  useEffect(()=>{
  
    const dbRef2 = query(
      ref(getDatabase(firebase), 'avis'),
      orderByChild('id_produit'),
      equalTo(p.produit.id),
      
      
    );
    
    onValue( dbRef2,snapshot=>{
      const data=snapshot.val();
      setnumberOfComments(snapshot.size);
    });
  
  },[]); 
  useEffect(()=>{
  
    const dbRef2 = query(
      ref(getDatabase(firebase), 'avis'),
      orderByChild('id_produit'),
      equalTo(p.produit.id),
      limitToLast(4),
      
    );
    
    onValue( dbRef2,snapshot=>{
      const data=snapshot.val();
    
      
      if(data!==null){
        Object.values(data).map((avis)=>{
          setAvis(oldArray=>[...oldArray,avis])
        });
      }
    });
  
  },[]); 
 
    avis.map((av)=>{
      user.map((u,index)=>{
        if(u.id===av.id_user){
          userAvis.push({"id":u.id,"email":u.email,"comment":av.comment});
        }
       
      })
      
    })
  
 const Comment=({com})=>{
   return(
    <View>
       
       
        <View style={style.commentBorder}>
        <Text
          style={{color: '#000000', fontSize: 18,marginLeft:5}}>
          {com.email}
        </Text>
        <Text
          style={{fontSize:17,color:'rgba(0,0,0,0.5)',marginLeft:10}}>
          {com.comment}
        </Text>
      </View>
    
     
 

 </View>
   )
 }  

const handleText=(text)=>{
setText(text)}

 const DescProduct=({prod})=>{
    return (
          <View >
  
          <View style={style.detailsContainer}>
          <View
              style={{
                marginLeft: 20,
                flexDirection: 'row',
                alignItems: 'flex-end',
              }}>
           <Text style={{fontSize:17,color:'rgba(0,0,0,0.5)'}}>{prod.libelle}</Text>
           </View>
           <View
              style={{
                marginLeft: 20,
                marginTop: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>A propos</Text>
              <View style={style.priceTag}>
                <Text
                  style={{
                    marginLeft: 15,
                    color: '#FFFFFF',
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>
                  MAD{prod.prix}
                </Text>
              </View>
            </View>
            <View
              style={{
                marginLeft: 20,
                flexDirection: 'row',
                alignItems: 'flex-end',
                marginTop:5,
              }}>
           <Text style={{fontSize:15,color:'rgba(0,0,0,0.5)'}}>{prod.description}</Text>
           </View>
           <View
              style={{
                marginLeft: 20,
                marginTop: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>Couleur</Text>
             
            </View>
            <View
              style={{
                marginLeft: 20,
                flexDirection: 'row',
                alignItems: 'flex-end',
                marginTop:5,
              }}>
           <Text style={{fontSize:15,color:'rgba(0,0,0,0.5)'}}>{prod.couleur}</Text>
           </View>
           <View
              style={{
                marginLeft: 20,
                marginTop: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>Taille</Text>
             
            </View>
            <View
              style={{
                marginLeft: 20,
                flexDirection: 'row',
                alignItems: 'flex-end',
                marginTop:5,
              }}>
           <Text style={{fontSize:15,color:'rgba(0,0,0,0.5)'}}>{prod.taille}</Text>
           </View>
           <View
              style={{
                marginLeft: 20,
                marginTop: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>Quantité disponible</Text>
             
            </View>
            <View
              style={{
                marginLeft: 20,
                flexDirection: 'row',
                alignItems: 'flex-end',
                marginTop:5,
              }}>
           <Text style={{fontSize:15,color:'rgba(0,0,0,0.5)'}}>{prod.quantite_disponible}</Text>
           </View>
           <View
              style={{
                marginLeft: 20,
                marginTop: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>Expédition à Morocco</Text>
             
            </View>
            <View
              style={{
                marginLeft: 20,
                flexDirection: 'row',
                alignItems: 'flex-end',
                marginTop:5,
              }}>
           <Text style={{fontSize:15,color:'rgba(0,0,0,0.5)'}}>Livraison à seulement MAD{prod.prix_livraison}</Text>
           </View>
           <View
              style={{
                marginLeft: 20,
                marginTop: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>Commentaires({numberOfComments})</Text>
             
            </View>
            <View style={{flex:1, marginLeft: 20,
            flexDirection: 'row',
          alignItems: 'flex-end',
           marginTop:5,
           }}>
              <View >
            <FlatList
             showsVerticalScrollIndicator={true}
             data={userAvis}
             
             renderItem={({item}) => {
               return (
             
               <Comment com={item} />);
             }}
             keyExtractor={item=>item.id}
             initialNumToRender={4}
             removeClippedSubviews={true}
            
            />
            </View>
            </View>
        
             
             
         
          </View>
         
          </View>
         
         
      
    ); 
    }
   return(
      <View style={{flex:1}}>
        <View style={{flex:1}}>
        {produits.map((produit,index)=>{
          return(
        <View key={index} >
       <View style={style.imageContainer}>
      <DescPicture ImageFile={produit.image}  style={{resizeMode: 'contain', flex: 1}} />
     
       </View>
       <View style={style.header}>
        <Icon name="arrow-back" size={28} onPress={() => navigation.goBack()} />
        
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
export default DescriptionP;
 const style = StyleSheet.create({
    header: {
      paddingHorizontal: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      position:'relative',
      bottom:380,
    },
    imageContainer: {
     
      marginTop: 18,
      justifyContent: 'center',
      alignItems: 'center',
      position:'relative',
    

    },
    detailsContainer: {
      backgroundColor: '#FFFFFF',
      
      
    },
    commentsContainer: {
      backgroundColor: '#ede0d7',
      position:'relative',
      width:335,
    },
    line: {
      width: 25,
      height: 2,
      backgroundColor: '#000CB1',
      marginBottom: 5,
      marginRight: 3,
    },
    borderBtn: {
      borderColor: 'grey',
      borderWidth: 1,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      width: 40,
      height: 30,
    },
    borderBtnText: {fontWeight: 'bold', fontSize: 24},
    buyBtn: {
      width: 200,
      height: 50,
      backgroundColor: '#b6825e',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 30,
      
    },
    commentBorder: {
      width,
      backgroundColor: '#D3D3D3',
     paddingTop:3,
      borderRadius: 15,
      marginBottom:10,
      paddingBottom:3,
    },
    priceTag: {
      backgroundColor:'#b6825e',
      width: 100,
      height: 40,
      justifyContent: 'center',
      }
    })