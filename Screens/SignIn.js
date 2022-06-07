import React  from 'react';
import { Image, Text, StyleSheet, View, ScrollView, TouchableOpacity, TextInput, ImageBackground,  } from 'react-native';


import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';


import firebase from '../firebase-config';

import { useNavigation } from '@react-navigation/native';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);
LogBox.ignoreLogs(['Warning: Async Storage has been extracted from react-native core and will be removed in a future release']);
function SignUpScreen() {

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [error,setError]=React.useState('')
    const navigation = useNavigation();
   
    const auth = getAuth(firebase);
    const isValide=(error)=>{
      return setError(error);
    }
    const createAccount=()=>{
      navigation.navigate('SignUp');
    }
    const handleSignIn = () => {
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
      
        const user = userCredential.user;
    
        navigation.navigate('home');
       
        isValide('');
      })
      .catch(error => {
        
      
    
        if (error.code === 'auth/invalid-email') {
         
          isValide('Adresse Email invalide!');
        }
        if (error.code === 'auth/user-not-found') {
       
          isValide('Email ou mot de passe Incorrect!');
        }
        if (error.code === 'auth/wrong-password') {
       
          isValide('Mot de passe Incorrect!');
        }
        if (error.code === 'auth/internal-error') {
       
          isValide('Tous les champs doivent être remplis!');
        }
      
        
      })
    }

    
    return (
     
     
         <ScrollView>
            <View style={styles.container}>
        <ImageBackground source={require('../assets/backgroundPic.jpg')} resizeMode='cover' style={styles.backgroundPic} blurRadius={2}>
       
          <View style={styles.signUpView}>
          
             <Text style={styles.shopNowText}>SHOPNOW</Text>
             
             <TextInput onChangeText={(text) => setEmail(text)} style={styles.input} placeholder="E-MAIL" placeholderTextColor="#595260"  />
             <TextInput onChangeText={(text) => setPassword(text)} style={styles.input} placeholder="MOT DE PASSE" placeholderTextColor="#595260" secureTextEntry={true}/>
           
             <Text style={styles.haveAlreadyAccount} onPress={()=>createAccount()}>Vous voulez créer un compte?</Text>
             <Text style={styles.errorStyle}>{error}</Text>
             <TouchableOpacity onPress={handleSignIn} style={styles.button}>
                <Text style={styles.signUp}>S'authentifier</Text>
             </TouchableOpacity>
             <View style={styles.containerJoindreASocialMedia}>
                <View style={styles.containerOuJoindre}>
                     <View style={styles.lines} />
                     <Text style={styles.ouJoindreText}>Ou joindre à</Text>
                     <View style={styles.lines} />
                </View>
                <View style={styles.containerSocialMediaImage}>
                   <Image style={styles.socialMediaImage}  source={require('../assets/google.jpg')}/>
                   <Image  style={styles.socialMediaImage} source={require('../assets/facebook.jpg')}/>
                   <Image style={styles.socialMediaImage} source={require('../assets/twitter.png')}/>
                </View>
              </View>
              
          </View>
          <Text style={styles.textInBottom}>
            En vous enregistrant, vous acceptez notre 
            <Text style={{color:'white'}}> 
            Politique de confidentialité & cookies
            </Text> 
            et nos 
            <Text style={{color:'white'}}>
              Termes et conditions
            </Text>
            .
          </Text>
         
        </ImageBackground> 
        </View>
        </ScrollView>
     
    );
  }

  const styles = StyleSheet.create({
    container: {
     height:750,
      alignItems:'center'
    },
    signUpView: {
     
      flexDirection:'column',
      justifyContent:'center',
      alignItems: 'center',
     
    },
    backgroundPic:{
     
      width:'100%',
      height:'100%',
     
    },
    shopNowText:{
      
      fontSize: 50,
      fontWeight: '100',
      color: 'white',
      fontFamily:'serif',
      position:'relative',
      top:120,
    },
    input: {
      width: 250,
      height: 50,
      color:'#595260',
      borderRadius: 10,
      textShadowColor:'#595260',
      borderColor: '#595260',
      alignItems: 'center',
      justifyContent: 'center',
      position:'relative',
      borderWidth: 2,
      top:190,
      marginTop:10,
      paddingLeft:20
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
     top:250
    },
    signUp:{
      fontSize: 17, 
      fontWeight: '400',
       color: '#595260'
    },
    containerOuJoindre:{
      flexDirection: 'row', 
      alignItems: 'center',
      justifyContent:'center',
      marginRight:10
    },
    ouJoindreText:{
      width: 87,
      fontWeight:'400', 
      textAlign: 'center',
      color:'white',
      fontSize:15,
      position:'relative',
      bottom:20
    },
    lines:{
      width:30,
      height: 1.3, 
      backgroundColor: 'white',
      position:'relative',
      bottom:19
    },
    haveAlreadyAccount:{
      color:'white',
      fontSize:15,
      marginLeft:100,
      position:'relative',
      top:200
    },
    containerSocialMediaImage:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
       
    },
    socialMediaImage:{
      width: 50,
      height: 50,
      borderRadius: 50,
      borderWidth: 1,
      marginRight:20,
      
    },
    containerJoindreASocialMedia:{
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'space-between',
      position:'relative',
      top:350
    },
    textInBottom:{
      
      marginLeft:10,
      fontSize:14,
      position:'absolute',
      bottom:25
    },
    errorStyle:{
      color:'red',
      fontSize:13,
      marginLeft:10,
      position:'relative',
      top:230
    }
  });
export default SignUpScreen;