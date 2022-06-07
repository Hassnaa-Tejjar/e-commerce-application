import React, {useEffect,Component,useState} from 'react';
import { Image, Text, StyleSheet, View, ScrollView, TouchableOpacity,Dimensions,textarea, TextInput,onPress, ImageBackground, Button, Alert,SafeAreaView } from 'react-native';
import { getDatabase, set,ref, onValue,} from 'firebase/database';
import ProdA from './ProdA';
import { getAuth, createUserWithEmailAndPassword, } from 'firebase/auth';
import DropDownPicker from 'react-native-dropdown-picker';
import { addUser } from '../Components/User';
import SelectDropdown from 'react-native-select-dropdown'
const width = Dimensions.get('window').width / 2 - 30;
import RadioButtonRN from 'radio-buttons-react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import firebase, { firebaseConfig } from '../firebase-config';
function AjouterU(){
  const [id, setId] = React.useState('')
  const [nom, setnom] = React.useState('')
  const [prenom, setPrenom] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [sexe, setSexe] = React.useState('')
  const [adresse, setAdresse] = React.useState('')
  const [telephone, setTelephone] = React.useState('')
  const [codePostal, setCodePostal] = React.useState('')
  const [numeroCompte, setnumeroCompte] = React.useState('')
  const [ville, setVille] = React.useState('')
  const [pays, setPays] = React.useState('')
  const auth = getAuth(firebase)
  function handleCreateAccount(){
    createUserWithEmailAndPassword(auth, email, password,nom,prenom,sexe,adresse,telephone,codePostal,numeroCompte,ville,pays)
    addUser(id,email,password,nom,prenom,sexe,adresse,telephone,codePostal,numeroCompte,ville,pays);
    alert('Utilisateur ajoutée')
  }
  return (
    
    <View >
    <ImageBackground source={require('../assets/pic1.jpg')} resizeMode='cover' style={styles.backgroundPic} blurRadius={3}>
    
    <View style={{top:40,marginLeft:20}} >
      <SafeAreaView style={{top:-20}}>
         <Text style={styles.text}>ID</Text>
          </SafeAreaView>
    <TextInput onChangeText={(text) => setId(text)} style={styles.putID}  placeholder="" />

    <SafeAreaView style={styles.putL}>
      <Text style={styles.putD}>Nom</Text>   
    <TextInput onChangeText={(text) => setnom(text)} style={styles.put}  placeholder=""  /></SafeAreaView>
    <SafeAreaView style={styles.putP}>

    <Text style={styles.text}>Prenom</Text>   
    <TextInput onChangeText={(text) => setPrenom(text)} style={styles.putpp}  placeholder="" /></SafeAreaView>

<SafeAreaView  style={styles.putT}>
    <Text  style={styles.textC}>mot de passe</Text>    
    <TextInput onChangeText={(text) => setPassword(text)} style={styles.putC}  placeholder=""  /></SafeAreaView>

    </View>

    
    <Text style={styles.textQ}>E-mail</Text>
    <TextInput onChangeText={(text) => setEmail(text)} style={styles.putQ}  placeholder=""  />
    
    <View style={{top:60,left:8, position:'relative'}} >
    <TouchableOpacity style={styles.button}  onPress={() => {handleCreateAccount()}}>
                <Text style={styles.signUp} >Ajouter</Text>
             </TouchableOpacity>
    </View>
    
    </ImageBackground>
    </View>
  );
}

export default AjouterU;

const styles = StyleSheet.create({
  
  backgroundPic:{
     
    width:360,
    height:592,
  },
  button: {
    width: 250,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#595260',
    borderWidth: 2,
   position:'relative',
   top:140,
   left:40
  },
  signUp:{
    fontSize: 17, 
    fontWeight: '400',
     color: '#595260'
  },
  
  apercu:{
    fontWeight: 'bold',
    fontSize:22,
    color:'#000000',
    top:55,
    left:75,
},
text:{
    fontWeight: 'bold',
    fontSize:16,
    color:'black',
    top:85,
    left:20,
},
put:{
   width:160,
   height:30,
   elevation:2,
   justifyContent: 'center',
    top:8,
    left:8,
    color:'white',
      borderRadius: 10,
      textShadowColor:'white',
      borderColor: '#595260',
      borderWidth:2,
    paddingLeft:20,
    alignItems: 'center',
},
putpp:{
    width:110,
    height:30,
    elevation:3,
    borderRadius:9,
    justifyContent: 'center',
     top:100,
     left:8,
     color:'white',
      borderRadius: 10,
      textShadowColor:'white',
      borderColor: '#595260',
      borderWidth:2,
     paddingLeft:20,
     alignItems: 'center',
 },
putID:{
  color:'white',
      borderRadius: 10,
      textShadowColor:'white',
      borderColor: '#595260',
      borderWidth:2,
    width:110,
    height:30,
    elevation:3,
    borderRadius:9,
    justifyContent: 'center',
     top:80,
     left:8,
     paddingLeft:20,
     alignItems: 'center',
 },
 putL:{
    width:160,
    height:30,
     top:19,
     left:130,
     
 },
 
 putT:{
    width:160,
    height:30,
     top:44,
     left:130,
 },
 putP:{
    width:110,
    height:30,
     top:-20,
     left:-20,
     paddingLeft:20,
 },
  textC:{
    fontWeight: 'bold',
    fontSize:16,
    color:'black',
    top:-2,
    left:20,
 },
 putC:{
  width:160,
  height:30,
  elevation:2,
  justifyContent: 'center',
   top:8,
   left:8,
   color:'white',
     borderRadius: 10,
     textShadowColor:'white',
     borderColor: '#595260',
     borderWidth:2,
   paddingLeft:20,
   alignItems: 'center',
    
 },
textQ:{
  fontWeight: 'bold',
  fontSize:16,
  color:'black',
  top:140,
  left:60,
},
putQ:{
  width:240,
  height:30,
  elevation:3,
  borderRadius:9,
  justifyContent: 'center',
   top:150,
   left:50,
   paddingLeft:20,
   color:'white',
      borderRadius: 10,
      textShadowColor:'white',
      borderColor: '#595260',
      borderWidth:2,
   alignItems: 'center',
  
},
putD:{
  fontWeight: 'bold',
    fontSize:16,
    color:'black',
    top:-5,
    left:20,
},

});



