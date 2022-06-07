import React, { useState } from "react";
import { Component } from 'react';
import { Image, Text, StyleSheet, View, ScrollView,Dimensions, TouchableOpacity,TextInput, Button, Alert, ActivityIndicator, FlatList} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import RNMasonryScroll from "react-native-masonry-scrollview";
import Produit from "../Components/Produit";
import FavorisScreen from "./Favoris";
import SousCategorie from "../Components/SousCategorie";
import FilterByCategory from "../Components/FilterByCategory";
import GetUserFavoris from '../Components/GetUserFavoris'
const width = Dimensions.get('window').width / 2 - 30;

const HomeScreen = () =>{
  const navigation = useNavigation();
function renderHeader() {
    return (
    <View style={{flexDirection: 'row',height:60,top:8}}>
      <TouchableOpacity
      style={{width:50,paddingLeft:26,justifyContent: 'center'}}
      onPress={() => {navigation.navigate("Liste d'envies")}}>
     <View>
     
    <Image
    source={require('../assets/heart.png')}
    resizeMode="contain"
    style={{width:28,height:28}}>
    </Image> 
     </View>
      </TouchableOpacity>
     <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
       <Text  style={{left:-8,fontSize:22,fontWeight: '700'}} >
       SHOPNOW
       </Text> 
       </View>
       <TouchableOpacity
      style={{width:50,paddingRight:10,justifyContent: 'center'}}
      onPress={() => {navigation.navigate("Search")}}>
    <Image
    source={require('../assets/loupe.png')}
    resizeMode="contain"
    style={{width:23,height:23,right:11}}>

    </Image>
    </TouchableOpacity>
    </View>
    )
  }

 function ListProducts(){
   return(
    <Produit/>
    );
  }
  function ListSousCategorie(){

    return(
         <SousCategorie/>
    );
   }
   function Listfilter(){

    return(
         <FilterByCategory  />
    );
   }
  return(
    <SafeAreaView>
  {renderHeader()}
  {ListSousCategorie()}


    </SafeAreaView>
  )
  
}

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
  export default HomeScreen;