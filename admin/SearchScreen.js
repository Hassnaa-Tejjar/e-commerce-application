import SearchBar from 'react-native-dynamic-search-bar';
import Userpicture from '../Components/Userpicture';
import { useNavigation } from '@react-navigation/native';
import React, {useEffect,Component,useState} from 'react';
import { Image, Text, StyleSheet, View, ScrollView, TouchableOpacity,Dimensions,FlatList,TextInput, Button, Alert,SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getDatabase, set,ref, onValue, DataSnapshot,orderByChild,equalTo,database,query, limitToLast, orderByKey, orderByValue} from 'firebase/database';
import { initializeApp, } from 'firebase/app';
const width = Dimensions.get('window').width/2 -30 ;
import { firebaseConfig } from '../firebase-config';
import { getAuth, createUserWithEmailAndPassword, } from 'firebase/auth';
import firebase from '../firebase-config'
function SearchScreen() {
  const navigation = useNavigation();
  const [produits,setProduits]=useState([]);
  const [productFiltred,setProductFiltred]=useState([]);
  const [isSearchShown,setIsSearchShown]=useState(true);
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
 
 
 const searchProduct=(textToSearch)=>{
   setIsSearchShown(false);
  setProductFiltred(produits.filter(p=>{
    return (String(p.libelle).toUpperCase().includes(String(textToSearch).toUpperCase()))||(String(p.prix).toUpperCase().includes(String(textToSearch).toUpperCase()));
    }))
   if(String(textToSearch)===""){
     setProductFiltred([]);
     setIsSearchShown(true);
   }
  }
  const Products = ({produit}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}>
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
                bottom:110,
                right:-10,
                backgroundColor: 'rgba(0,0,0,0.2) ',
              
              }}>
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
      <View style={{ flex: 1 }}>
       <View style={styles.searchheader}>
        <SearchBar placeholder='Rechercher un produit' round onChangeText={(text)=>searchProduct(text)}
        />
       </View>
       
       <FlatList
        columnWrapperStyle={{justifyContent: 'space-between'}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 10,
          paddingBottom: 50,
        }}
        numColumns={2}
        data={productFiltred}
        renderItem={({item}) => {
          return <Products produit={item} />;
        }}
        keyExtractor={item=>item.id}
      />
      
      </View>
    );
  }
  const styles = StyleSheet.create({
    card: {
     height: 225,
     backgroundColor: 'white',
     width,
     marginHorizontal: 14 ,
     borderRadius: 10,
     marginBottom: 20,
     padding: 15,
     
   },
    searchheader: {
     backgroundColor:'#D3D3D3',
     borderRadius: 15,
     marginTop:60,
     elevation:8,
     borderRadius:30,
     height:40,
     width:380,
     right:9,
     
    }
  });
  export default SearchScreen;