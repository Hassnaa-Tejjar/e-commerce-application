import React, {useEffect,Component,useState} from 'react';
import { Image, Text, StyleSheet, View,FlatList,TouchableWithoutFeedback, ScrollView, TouchableOpacity,Dimensions, TextInput, Button, Alert,SafeAreaView } from 'react-native';
import { getDatabase, set,ref, onValue, DataSnapshot,orderByChild,equalTo,database,query,update,limitToLast, orderByKey, orderByValue} from 'firebase/database';
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

const EditP=({navigation,route})=> {
    const p=route.params;
    const [produits,setProduits]=useState([]);
    const [text,setText]=useState('');
    const [libelle, setLibelle] = React.useState(p.produit.libelle)
  const [prix, setPrix] = React.useState(p.produit.prix)
  const [taille, setTaille] = React.useState(p.produit.taille)
  const [couleur, setCouleur] = React.useState(p.produit.couleur)
  const [description, setDescription] = React.useState(p.produit.description)
  const [quantite_disponible, setQuantite_disponible] = React.useState(p.produit.quantite_disponible)
  const [prix_livraison, setPrix_livraison] = React.useState(p.produit.prix_livraison)
  
  
  const [id_sous_categorie, setId_sous_categorie] = React.useState()
  const [date_ajout, setDate_ajout] = React.useState('')
  const [nouveaute, setNouveaute] = React.useState('')
    var userAvis=[];
    function check(){
        const dbRef1 = query(
            ref(getDatabase(firebase), 'produits'),
            orderByChild("id"),
            equalTo(p.produit.id)
          );
          onValue(dbRef1,snapshot=>{
            const data=snapshot.val();
            if(data!==null){
                Object.values(data).map((p)=>{
             update(ref(getDatabase(firebase),'produits/'+p.id),{libelle,taille,couleur,description});        
            
           
            }) 
            }
          
          });
        }
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
           <TextInput onChangeText={(text) => setLibelle(text)} style={{fontSize:17,color:'rgba(0,0,0,0.5)'}}>{libelle}</TextInput>
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
                <TextInput onChangeText={(text) => setPrix(text)}
                  style={{
                    marginLeft: 15,
                    color: '#FFFFFF',
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>
                  MAD{prix}
                </TextInput>
              </View>
            </View>
            <View
              style={{
                marginLeft: 20,
                flexDirection: 'row',
                alignItems: 'flex-end',
                marginTop:5,
              }}>
           <TextInput onChangeText={(text) => setDescription(text)} style={{fontSize:15,color:'rgba(0,0,0,0.5)'}}>{description}</TextInput>
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
           <TextInput onChangeText={(text) => setCouleur(text)} style={{fontSize:15,color:'rgba(0,0,0,0.5)'}}>{couleur}</TextInput>
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
           <TextInput onChangeText={(text) => setTaille(text)} style={{fontSize:15,color:'rgba(0,0,0,0.5)'}}>{taille}</TextInput>
           </View>
           
            <View
              style={{
                marginLeft: 20,
                flexDirection: 'row',
                alignItems: 'flex-end',
                marginTop:5,
              }}>
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
           <TextInput onChangeText={(text) => setPrix_livraison(text)} style={{fontSize:15,color:'rgba(0,0,0,0.5)'}}>Livraison  seulement à {prix_livraison} MAD</TextInput>
 </View>
           <TouchableOpacity onPress={() => {check(),alert('updated')}} style={{position:'relative',borderRadius:35,left:108,top:13,elevation:3,borderWidth:2,width:120,height:40}} >
           <Text style={{fontSize: 16, fontWeight: 'bold',position:'relative',left:19,top:4,fontFamily:'serif'}}>Modifier</Text>
       </TouchableOpacity>
      
           
            <View style={{flex:1, marginLeft: 20,
            flexDirection: 'row',
          alignItems: 'flex-end',
           marginTop:5,
           }}>
              
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
export default EditP;
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