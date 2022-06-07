import React, {useEffect,Component,useState} from 'react';
import { Image, Text, StyleSheet, View, ScrollView, TouchableOpacity,Dimensions, TextInput, Button, Alert,SafeAreaView } from 'react-native';
import { getDatabase, set,ref, onValue, DataSnapshot,orderByChild,remove,equalTo,database,query, limitToLast, orderByKey, orderByValue} from 'firebase/database';
import offr from '../assets/offr.png'
import firebase from '../firebase-config'
const width = Dimensions.get('window').width / 2 - 30;
import Userpicture from '../Components/Userpicture';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
function ListeOffre(){

 
   const navigation = useNavigation();
const [produits,setProduits]=useState([]);
const [selectedId, setSelectedId] = useState();

 
  useEffect(()=>{
    const dbRef1 = query(
        ref(getDatabase(firebase), 'produits'),
        orderByChild('offre'),
        equalTo(true)
        
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
                }}
                >
                
                <Image source={offr} style={{
            width: 35, height: 40,
            tintColor:'#008000'
          }}/>
              </View>
            </View>
            
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 5,
              }}>
              <Text style={{fontSize: 14, fontWeight: 'bold',position:'relative',top:45,left:-10}}>
                <Text style={{fontSize: 13}}>MAD </Text>  <View style={{left:20}}><Text style={styles.lines} 
                ></Text></View>{produit.prix}   {produit.prixOffre}   
              </Text>
             
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

export default ListeOffre;

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
  lines:{
    width:30,
    height: 1.3, 
    backgroundColor: '#FF0000',
    position:'absolute',
    bottom:60,
    left:0,
    top:-6,

  },
});



