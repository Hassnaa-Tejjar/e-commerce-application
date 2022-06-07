import React from 'react';
import { Image,AppRegistry, Text, StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import GetUserPanier from '../Components/GetUserPanier'

 
function FactureScreen() {
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
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {produits.map((p,index)=>{
         return(
             <View key={index}>
              <Text>{p.libelle}</Text>
              <Text>{p.prix}</Text>
             </View>
         )   
        })}

      <Text>{t}</Text>
      <Button title='payer' />
    </View>
  );
}
export default FactureScreen;