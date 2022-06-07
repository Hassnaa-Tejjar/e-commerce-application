import React, {useEffect,Component,useState,useRef,useLayoutEffect,} from 'react';
import { Image, Text, StyleSheet, View,FlatList, ScrollView, TouchableOpacity,Dimensions, TextInput, Button, Alert,SafeAreaView } from 'react-native';
import { getDatabase,remove,update, set,ref, onValue, DataSnapshot,orderByChild,equalTo,database,query, limitToLast, orderByKey, orderByValue, runTransaction} from 'firebase/database';
import { initializeApp, } from 'firebase/app';
import { firebaseConfig } from '../firebase-config';
import { getAuth, createUserWithEmailAndPassword, } from 'firebase/auth';
import firebase from '../firebase-config'
const width = Dimensions.get('window').width -30;
import func from '../Components/Userpicture';
import PanierPictures from '../Components/PanierPictures';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DoubleClick from 'react-native-double-click';
import { color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import GetUserPanier from '../Components/GetUserPanier'
import UpdateCart from '../Components/UpdateCart';
function PanierScreen() {
  const navigation = useNavigation();
  const produits=[];
  const [quantite,setQuantite]=useState(1);
  const [quantitePanier,setQuantitePanier]=useState();
  const [isMount,setIsMount]=useState(false);
  const [total,settotal]=useState(0);
  var t=0;
  var p=GetUserPanier();
  const auth = getAuth(firebase);
  var user=auth.currentUser.uid;

onValue(ref(getDatabase(firebase), 'produits'),snapshot=>{
          const data=snapshot.val();
          if(data!==null){
            Object.values(data).map((produit)=>{
              
              if(p.includes(parseInt(produit.id))){
                produits.push(produit);
                //settotal(total+produit.prix);
                t=t+parseInt(produit.prix);
              }
               
            });
            
          }
        
      
        });
       
     
const ajouterQuantite=(quantiteDispo)=>{
   var quant=parseInt(quantite)+1;
   if(parseInt(quant)<=parseInt(quantiteDispo)){
   setQuantite(quant);
  }
}

const diminuerQuantite=()=>{
  var quant=parseInt(quantite)-1;
  setQuantite(quant);
}

function deletePanier(panier){
  const dbRef1 = query(
    ref(getDatabase(firebase), 'panier'),
    orderByChild("id_produit"),
    equalTo(String(panier))
  );
  onValue(dbRef1,snapshot=>{
    const data=snapshot.val();
    if(data!==null){
      Object.values(data).map((pn)=>{
      if(pn.id_user==user){
        remove(ref(getDatabase(firebase),'panier/'+pn.id_cart));
      }  
      
      });
    }
  
  });

}

 const CartList = ({produit}) => {
          return (
         
              <View style={styles.card}>
              <View style={{flexDirection:'row',}}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{marginTop:15}}
                onPress={() => navigation.navigate('Description', {produit})}>
                 <PanierPictures ImageFile={produit.image}  style={{flex: 1, resizeMode: 'contain'}}/>
                </TouchableOpacity>
                <View style={{position:'relative'}}>
              <Text style={{fontSize:14,fontWeight:'bold',marginStart:3}}>{produit.libelle}</Text>
              <Text style={{fontSize:11,width:200,marginTop:5,marginStart:3}}>{produit.description}</Text>
            </View>
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
                bottom:170,
                right:-10,
                
              
              }}>
              <Icon
                name="close"
                size={23}
                color='#000000'
                onPress={()=>{deletePanier(String(produit.id)); }}
              />
            </View>
        
          </View>
         
          <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    position:'relative',
                    top:-40
                  }}>
                   <Text style={{fontSize: 17, fontWeight: 'bold',position:'relative',left:130, bottom:25,}}>
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
                      bottom:25,
                      left:100,
                    }}>
                     <Icon
                      name="remove"
                      style={{fontSize: 20, color: 'white', fontWeight: 'bold',}}
                      onPress={()=>{diminuerQuantite();}}
                      />
                  </View>
                  <View style={{ position:'relative',
                      bottom:25,left:50,
                      }}>
                  <Text
                    style={{
                      fontSize: 20,
                      marginHorizontal: 10,
                      fontWeight: 'bold',
                    }}>
                    {quantite}
                  </Text></View>
                  <View
                    style={{
                      height: 25,
                      width: 25,
                      backgroundColor: "#000000",
                      borderRadius: 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                      position:'relative',
                      bottom:25,
                    }}>
                     <Icon
                      name="add"
                      style={{fontSize: 20, color: 'white', fontWeight: 'bold',}}
                      onPress={()=>{ajouterQuantite(produit.quantite_disponible);}}
                      />
                  </View>
                </View>
 
              </View>
            
         
      
          );
        };
    return (
     
     <View  style={{flex:1}}>
    <FlatList

     showsVerticalScrollIndicator={false}
     contentContainerStyle={{
      marginTop: 25,
      paddingBottom: 80,
    }}
     data={produits}
     renderItem={({item}) => {
       return <CartList produit={item} />;
     }}
     keyExtractor={item=>item.id}
   />
    <View style={{marginBottom:60, backgroundColor: '#FFFFFF',
                  flexDirection: 'row',
                  justifyContent: 'space-between',}}>
     <View>
     <Text style={{fontSize: 20,fontWeight:'bold',marginTop:10,marginLeft:12}}>TOTAL: {t}</Text>
     </View>
     <TouchableOpacity style={styles.buyBtn} onPress={()=>navigation.navigate("StripeApp")}>
        <Text
           style={{color: '#FFFFFF', fontSize: 18, fontWeight: 'bold'}}>
           Payer
        </Text>
     </TouchableOpacity>
    </View>
    </View>
    );
  }
  const styles = StyleSheet.create({

     card: {
     marginTop:25,
     height: 170,
     backgroundColor: 'white',
     width,
     marginHorizontal: 10,
     marginLeft:18,
     borderRadius: 10,
     marginBottom: -10,
     padding: 15,
     
   },
   buyBtn: {
    width: 150,
    height: 50,
    backgroundColor: '#b6825e',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    
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
 
});
  export default PanierScreen;