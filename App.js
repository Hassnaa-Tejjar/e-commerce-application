import React, {useEffect} from 'react';
import { Image, Text, StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import { BlurView } from 'expo-blur';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase-config';
import { HomeScreen,SignUpScreen,Pad,SignInScreen, FavorisScreen,DescriptionScreen,SearchScreen,FactureScreen, PaymentScreen } from './Screens';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import Tabs from './navigation/tab';
 import StripeApp from './src/StripeApp'
  const Stack = createNativeStackNavigator();
  
  export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignUp" > 
      
      <Stack.Screen name="SignUp" component={SignUpScreen}  options={{headerShown: false}} />
      <Stack.Screen name="SignIn" component={SignInScreen}  options={{headerShown: false}}/>
    
      <Stack.Screen name="home" component={Tabs} options={{headerShown: false}} />
       <Stack.Screen name="Liste d'envies" component={FavorisScreen}  options={{
          title: "       Liste d'envies",}}
       />
      
        <Stack.Screen name="Description" component={DescriptionScreen}  options={{headerShown: false}}
       />
       <Stack.Screen name="Search" component={SearchScreen}  options={{headerShown: false}}
       />
      <Stack.Screen name="Pad" component={Pad}  options={{headerShown: false}}
       />
       <Stack.Screen name="StripeApp" component={StripeApp}  options={{
          title: "       Paiement",}} />
         <Stack.Screen name="facture" component={FactureScreen}  options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


