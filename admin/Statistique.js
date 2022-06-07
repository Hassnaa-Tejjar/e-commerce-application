
import React, {useEffect, useState} from 'react';
import { Image, Text, StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Button, Alert,Dimensions } from 'react-native';
import { getDatabase, set,ref, onValue, DataSnapshot,query, } from 'firebase/database';
import { initializeApp, } from 'firebase/app';
import { firebaseConfig } from '../firebase-config';
import { getAuth, createUserWithEmailAndPassword, } from 'firebase/auth';
import firebase from '../firebase-config'
import CountUsers from './CountUsers';
import CountCommande from './CountCommande';
import CountProduit from './CountProduit';
import {LineChart, } from "react-native-chart-kit";
import TopProd from './TopProd';
function Statistique() {
   
    
   
    return (
        
        <ScrollView contentContainerStyle={{flexDirection:'column',flexWrap:'wrap',height:10000}} showsVerticalScrollIndicator={false}>
     
     <View style={{flexDirection:"row", top:-30, }} >
        <TouchableOpacity  activeOpacity={0.8}>
        <View  style={[styles.card]}>
          <Text style={{textAlign:'right',}} >
                Produits
          </Text >
          <View style={{left:50,}}>
          <CountProduit/>
          </View>
          <Image style={styles.photo}  source={require('../assets/package.png')}/>
          
        </View>
        </TouchableOpacity>  
        <TouchableOpacity style={{}} activeOpacity={0.8}>
        
        <View  style={[styles.card]}>
       
        <Text style={{textAlign:'right'}} >
                Clients
        </Text >
         <View style={{left:50,}}>
          <CountUsers/>
          </View>
        <Image style={styles.photo}  source={require('../assets/customer.png')}/>
        </View>
        </TouchableOpacity> 
        </View>
        <View style={{flexDirection:"row",top:-30 }} >
        <TouchableOpacity style={{}} activeOpacity={0.8}>
        <View style={{flexDirection:"row"}} >
        <View  style={[styles.card]}>
        
        <Text style={{textAlign:'right',fontSize:15,fontWeight: '400',}} >
                Commandes
          </Text >
          <View style={{left:50,}}>
          <CountCommande/>
          </View>
          <Image style={styles.photo}  source={require('../assets/shopping.png')}/>
        </View>
        </View>
        </TouchableOpacity> 
        <TouchableOpacity style={{}} activeOpacity={0.8}>
        <View style={{flexDirection:"row"}} >
        <View  style={[styles.card]}>
        <Text style={{textAlign:'right'}} >
                Ventes
          </Text >
          <View style={{left:50,}}>
          <CountUsers/>
          </View>
          <Image style={styles.photo}  source={require('../assets/money.png')}/>
        </View>
        </View>
        </TouchableOpacity> 
        </View>
           
            <View>
     <Text style={styles.apercu}>APERÇU DES VENTES</Text>
  <LineChart
    data={{
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          data: [2,10,80,40,30,90,100,30 ]
        }
      ]
    }}
    width={Dimensions.get("window").width-30} // from react-native
    height={220}
    yAxisLabel="$"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#000000",
      backgroundGradientFrom: "#FFFFFF",
      backgroundGradientTo: "#FFFFFF",
      color: (opacity = 1) => `#000000`,
      labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
</View>
<Text style={styles.apercu}>TOP PRODUITS VENDUS</Text>

<TopProd/>
        </ScrollView>
    );
  }
  export default Statistique;
  const styles = StyleSheet.create({
    card: {
       marginTop:25,
      height: 100,
      backgroundColor: 'white',
      width:150,
      marginHorizontal: 7,
      left:6,
      borderRadius: 10,
      marginBottom: -10,
      padding: 15,
      elevation:5
      
    },
    
    photo:{
        width:38,
        height:38,
        borderRadius:15,
        tintColor:'#383838',
        top:-20
    },
    apercu:{
        fontWeight: 'bold',
        fontSize:16,
        color:'#b6825e'
    },
  });