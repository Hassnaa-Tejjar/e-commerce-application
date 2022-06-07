import React,  {useEffect,Component,useState}  from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text
} from 'react-native'
import { Image, ScrollView, TouchableOpacity,Dimensions, TextInput, Button, Alert,SafeAreaView } from 'react-native';
import { getDatabase, set,ref, onValue, DataSnapshot,orderByChild,remove,equalTo,database,query, limitToLast, orderByKey, orderByValue} from 'firebase/database';

import Table from 'react-native-simple-table'

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 60,
    value:'id'
  },
  {
    title: 'Date',
    dataIndex: 'date_commande',
    width: 85,
    value:'date_commande'
  },
  {
    title: 'Montant',
    dataIndex: 'montant',
    value:'montant',
    width: 80,
  },
  {
    title: 'Prix_Livraison',
    dataIndex: 'prix_total_liv',
    value:'prix_total_liv',
    width: 108,
  },
];

function ListeCo () {
  
const [produits,setProduits]=useState([]);

    useEffect(()=>{
 
        onValue( ref(getDatabase(),'commande/'),snapshot=>{
          const data=snapshot.val();
          if(data!==null){
            Object.values(data).map((produit)=>{
              
              setProduits(oldArray=>[...oldArray,produit])
            });
          }
        });
      },[]);
      const Data=[produits.values()];
    return (
      <View style={styles.container}>
        
        <Table height={320} columns={columns} 
        dataSource={produits} />
      </View>
    )
  
}

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        paddingTop: 10
      },
      android: {}
    }),
  },
  title: {
    fontSize: 18,
    padding: 10,
    textAlign: 'center'
  }
});

export default ListeCo;