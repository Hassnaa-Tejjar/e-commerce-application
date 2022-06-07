import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';

import SearchBar from "react-native-dynamic-search-bar";
import { Animated, Image, SafeAreaView, StyleSheet, Text,ScrollView, TouchableOpacity, View } from 'react-native';

import { RNNSearchBar } from "react-native-navigation-search-bar";
import menu from '../assets/menu.png';
import close from '../assets/close.png';
import logout from '../assets/logout.png';
import home from '../assets/home.png';
import profil from '../assets/profil.png';
import produit from '../assets/produit.png'
import settings from '../assets/settings.png'
import remarque from '../assets/remarque.png'
import utilisateur from '../assets/utilisateur.png'
import offre from '../assets/offre.png'
import Statistique from './Statistique';
import Clients from './Client';
import SearchScreen from './SearchScreen'
import { useNavigation } from '@react-navigation/native';
import ProduitsA from './ProduitsA';
import OffreA from './OffreA';
import Commande from './Commande';
const Tabs_admin = () =>{
 
    const [currentTab, setCurrentTab] = useState(Statistique);
    // To get the curretn Status of menu ...
    const [showMenu, setShowMenu] = useState(false);
    // Animated Properties...
    
    const offsetValue = useRef(new Animated.Value(0)).current;
    // Scale Intially must be One...
    const scaleValue = useRef(new Animated.Value(1)).current;
    const closeButtonOffset = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation();
    return (
      <SafeAreaView style={styles.container}>
  
        <View style={{ justifyContent: 'flex-start', padding: 15 }}>
          <Image source={profil} style={styles.profil}></Image>
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: 'white',
            marginTop: 20
          }}>Fadoua Alem</Text>
  
         
  
          <View style={{ flexGrow: 1, marginTop: 40 }}>
            {
              // Tab Bar Buttons....hh
              
            }
  
            {TabButton(currentTab, setCurrentTab, "Home" , home  )}
            {TabButton(currentTab, setCurrentTab, "Clients" , utilisateur)}
            {TabButton(currentTab, setCurrentTab, "Commandes",remarque)}
            {TabButton(currentTab, setCurrentTab, "Produits" , produit)}
            {TabButton(currentTab, setCurrentTab, "Offres" , offre)}
        
          </View>
  
          <View>
          {TabButton(currentTab, setCurrentTab, "LogOut", logout)}
          </View>
  
        </View>
  
        {
          // Over lay View...
        }
  
        <Animated.View style={{
          flexGrow: 1,
          backgroundColor: 'white',
          position: 'absolute',
          top: 0,
          bottom: -20,
          left: 0,
          right: 0,
          paddingHorizontal: 15,
          paddingVertical: 20,
          borderRadius: showMenu ? 20 : 0,
          // Transforming View...
          transform: [
            { scale: scaleValue },
            { translateX: offsetValue }
          ]
        }}>
  
          {
           
          }
  
          <Animated.View style={{
            transform: [{
              translateY: closeButtonOffset
            }]
          }}>
              
            {renderHeader() }
            <TouchableOpacity style={{width:50,top:-39}} onPress={() => {
              
              // Do Actions Here....
              // Scaling the view...entre les deux screens
              Animated.timing(scaleValue, {
                toValue: showMenu ? 1 : 0.88,
                duration: 240,
                useNativeDriver: true
              })
                .start()
                  // la premiere screen espace avec menu
              Animated.timing(offsetValue, {
                toValue: showMenu ? 0 : 210,
                duration: 300,
                useNativeDriver: true
              })
                .start()
                      // la close X das premiere screen 
              Animated.timing(closeButtonOffset, {
                // YOur Random Value...
                toValue: !showMenu ? -30 : 0,
                duration: 300,
                useNativeDriver: true
              })
                .start()
  
              setShowMenu(!showMenu);
            }}>
  
              <Image source={showMenu ? close : menu} style={styles.menu}/>

            </TouchableOpacity>
            <ScrollView contentContainerStyle={{flexWrap:'wrap',height:21000}} showsVerticalScrollIndicator={false}>
     
            <Text style={styles.page}>{currentTab}</Text>
            </ScrollView>
          </Animated.View>
  
        </Animated.View>
  
      </SafeAreaView>
    );
  }
function logOut(){
  const navigation = useNavigation();
  navigation.navigate('SignIn_admin');
} 
  // For multiple Buttons...
  function TabButton (currentTab, setCurrentTab, title, image)  {
    const navigation = useNavigation();
    return (
  
      <TouchableOpacity onPress={() => {
        if (title == "LogOut") {
          setCurrentTab(logOut)
        } else if(title == "Home"){
          setCurrentTab(Statistique)
        }
        else if(title == "Clients"){
          setCurrentTab(Clients)
        }
        else if(title == "Produits"){
          
          setCurrentTab(ProduitsA)
        }
        else if(title == "Offres"){
          
          setCurrentTab(OffreA)
        }
        else if(title == "Commandes"){
          
          setCurrentTab(Commande)
        }
        else{
          setCurrentTab(title)
        }
      }}>
        <View style={{
          flexDirection: "row",
          alignItems: 'center',
          paddingVertical: 8,
          backgroundColor: currentTab == title ? 'white' : 'transparent',
          paddingLeft: 13,
          paddingRight: 35,
          borderRadius: 8,
          marginTop: 15
        }}>
  
          <Image source={image} style={{
            width: 25, height: 25,
            tintColor: currentTab == title ? "#ac754e" : "white"
          }}></Image>
  
          <Text style={{
            fontSize: 15,
            fontWeight: 'bold',
            paddingLeft: 15,
            color: currentTab == title ? "#ac754e" : "white"
          }}>{title}</Text>
  
        </View>
      </TouchableOpacity>
    );
  }
 function renderHeader() {
  const navigation = useNavigation();
    return (
      <TouchableOpacity style={{top:33,left:40,backgroundColor:'white',elevation: 8,borderRadius:30,height:40,width:280}}  >
      <SearchBar
        placeholder="search"
        round
        fontFamily="BurbankBigCondensed-Black"
        onPress={() => {navigation.navigate('SearchScreen')}}/>
      </TouchableOpacity>
    );
  };
 
export default Tabs_admin;  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#b6825e',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    page :{
      fontSize: 30,
      fontWeight: 'bold',
      color: 'black',
      paddingTop: 20,
    },
    search:{
      
    },
    profil:{
      width: 80,
      height: 80,
      borderRadius: 30,
      marginTop: 28,
      left :25
    },
    menu:{  
       width: 23,
       height: 25,
       tintColor: '#b6825e', 
       marginTop: 40,}
  });
  

