import React, {useEffect,Component,useState} from 'react';
import { Image, Text,FlatList, StyleSheet, View, ScrollView, TouchableOpacity,Dimensions, TextInput, Button, Alert,SafeAreaView } from 'react-native';
import { getDatabase, set,ref, onValue, DataSnapshot,getKey } from 'firebase/database';
import { initializeApp, } from 'firebase/app';
import { firebaseConfig } from '../firebase-config';
import { getAuth, createUserWithEmailAndPassword, } from 'firebase/auth';
import firebase from '../firebase-config'
const width = Dimensions.get('window').width / 2 - 30;
import func from '../Components/Userpicture';
import Userpicture from '../Components/Userpicture';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FilterByCategory from '../Components/FilterByCategory';
import Produit from '../Components/Produit';
const Item  = ({ item, onPress, backgroundColor, textColor,productshown }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]} >{item}</Text>
    </TouchableOpacity>
  );

function SousCategorie(){
const navigation = useNavigation();

const [sousCategorie,setSousCategorie]=useState([]);
useEffect(()=>{
  onValue(ref(getDatabase(),'sous_categorie/'),snapshot=>{
    const data=snapshot.val();
    if(data!==null){
      Object.values(data).map((sousCategorie)=>{
        setSousCategorie(oldArray=>[...oldArray,sousCategorie])
      });
    }
  });
},[]);
const [selectedId, setSelectedId] = useState('1');
const [isProductShown, setProductShown] = useState(true);

const renderItem = ({ item ,index}) => {
const backgroundColor = item.id === selectedId ? "#b6825e" : "#ede0d7";
const color = item.id === selectedId ? 'white' : 'black';


return (
 <View>
 <Item 
 key={index}
 item={item.libelle}
 onPress={() => { setSelectedId(item.id);setProductShown(!isProductShown) }}
 backgroundColor={{ backgroundColor }}
 textColor={{ color }}

/>

 </View>
);
};

return (
    <View  >
     <View>
    <FlatList
      data={sousCategorie}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={renderItem}
      contentContainerStyle={{paddingLeft:30,marginTop:5}}
      keyExtractor={(item,index)=>index.toString()}
      extraData={selectedId}
    />
    </View>
   <View >
 { isProductShown && selectedId==1 ? (<Produit/>):null}
 { !isProductShown && selectedId==1 ? (<Produit/>):null}
{isProductShown && selectedId!=1 ? (<FilterByCategory identifiant={selectedId}/>):null }

{!isProductShown && selectedId!=1 ?(<FilterByCategory identifiant={selectedId}/>):null}
</View>
  </View>
);

}
export default SousCategorie;
const styles = StyleSheet.create({
    container: {
    
       flexDirection:'row',
       alignItems: 'center',

     },
    card: {
      height: 225,
      backgroundColor: '#ede0d7',
      width,
      marginHorizontal: 2,
      borderRadius: 10,
      marginBottom: 20,
      padding: 15,
    },
   item:{
    padding:5,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:15,
    marginRight:6,
    height:46
  },
  wrapper: {
    flex: 1,
    paddingBottom: 22
   },
   loader: {
     position: 'absolute',
     alignItems: 'center',
     justifyContent: 'center',    
     left: 0,
     right: 0,
     top: 0,
     bottom: 0,
   }
 
});