
import React, {useEffect,useState} from 'react';
import { Image, Text, StyleSheet, View,FlatList, ScrollView, TouchableOpacity,Dimensions, TextInput, Button, Alert,SafeAreaView } from 'react-native';
import { getDatabase, set,ref, onValue, DataSnapshot,orderByChild,equalTo,database,query, limitToLast, orderByKey, orderByValue} from 'firebase/database';
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
import { addFavoris } from '../Components/Addfavoris';
import { AjouterPanier } from '../Components/AjouterPanier';
import { color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
function AddScreen() {
  const navigation = useNavigation();
  const auth = getAuth(firebase);
  var userId=auth.currentUser.uid;
  const [newProduct,setNewProduct]=useState([]);
  const [like,setLike]=useState([]);
  const [Cart,setCart]=useState([]);  
  const [Favorite,setFavorite]=useState([]); 
  useEffect(()=>{
    const dbRef2 = query(
      ref(getDatabase(firebase), 'produits'),
      orderByChild('nouveaute'),
      equalTo(true),
      
      
    );
    onValue(dbRef2,snapshot=>{
      const data=snapshot.val();
      if(data!==null){
        Object.values(data).map((p)=>{
          
          setNewProduct(oldArray=>[...oldArray,p])
        });
      }
    });
  },[]);
  var fav=1;
var panier=1;
 function gettingLastid(){
  const dbRef1 = query(
    ref(getDatabase(firebase), 'favoris'),
    orderByKey(),
    limitToLast(1),
  );
  onValue( dbRef1,snapshot=>{
    
 if(snapshot.exists()){
 fav=parseInt(Object.keys(snapshot.val()))+1;

}
else{
   fav=1;
}
  });
 }
 function gettingLastidPanier(){
  const dbRef2 = query(
    ref(getDatabase(firebase), 'panier'),
    orderByKey(),
    limitToLast(1),
  );
  onValue( dbRef2,snapshot=>{
    
 if(snapshot.exists()){
 panier=parseInt(Object.keys(snapshot.val()))+1;

}
else{
   panier=1;
}
  });
 }
 useEffect(()=>{
  const dbRef2 = query(
    ref(getDatabase(firebase), 'panier'),
    orderByChild('id_user'),
    equalTo(userId),
    
    
  );
  onValue(dbRef2,snapshot=>{
    const data=snapshot.val();
    if(data!==null){
      Object.values(data).map((p)=>{
        
        setCart(oldArray=>[...oldArray,p.id_produit])
      });
    }
  });
},[]);
useEffect(()=>{
  const dbRef2 = query(
    ref(getDatabase(firebase), 'favoris'),
    orderByChild('id_user'),
    equalTo(userId),
  );
  onValue(dbRef2,snapshot=>{
    const data=snapshot.val();
    if(data!==null){
      Object.values(data).map((f)=>{
        
        setFavorite(oldArray=>[...oldArray,f.id_produit])
      });
    }
  });
},[]);
const ajouterProduitAuPanier=(p,id_prod,userId,p1,prix)=>{

if(!Cart.includes(id_prod)){
AjouterPanier(p,id_prod,userId,p1,1,prix);
}
}
const ajouterProduitAuFavoris=(f,id_prod,userId,f1)=>{

if(!Favorite.includes(id_prod)){
 addFavoris(f,id_prod,userId,f1);
}
}
  const NewProducts = ({produit}) => {
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
          <View style={{ flexDirection: 'row',justifyContent: 'space-between',}}>
             <Image style={{ width: 70,height: 70,position:'relative',bottom:117,right:34}} source={require('../assets/new.png')}/>
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
                onPress={() => {gettingLastid();ajouterProduitAuFavoris(fav,produit.id,userId,fav) }}
                color={like.some(item=>item==produit.id) ? "#F52A2A": "#000000"}
              />
               
            </View>
          </View>
         
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: -35,
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
                onPress={()=>{gettingLastidPanier();ajouterProduitAuPanier(panier,produit.id,userId,panier,1,produit.prix)}}
                />
            </View>
          </View>
        </View>
      </TouchableOpacity>

    );
  };
    return (
      <View style={{marginBottom:100}}>
      <FlatList
       columnWrapperStyle={{justifyContent: 'space-between'}}
       showsVerticalScrollIndicator={false}
       contentContainerStyle={{
         marginTop: 30,
         paddingBottom: 250,
        
       }}
       numColumns={2}
       data={newProduct}
       renderItem={({item}) => {
         return <NewProducts produit={item} />;
       }}
       keyExtractor={item=>item.id}
     />
     </View>
    );
  }
  export default AddScreen;
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