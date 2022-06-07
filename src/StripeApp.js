import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert,TouchableOpacity } from "react-native";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import { getDatabase,remove, set,ref, onValue, DataSnapshot,orderByChild,equalTo,database,query, limitToLast, orderByKey, orderByValue} from 'firebase/database';
import { initializeApp, } from 'firebase/app';
import { firebaseConfig } from '../firebase-config';
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword, } from 'firebase/auth';
import firebase from '../firebase-config'
import { Mail } from "@material-ui/icons";

//ADD localhost address of your server 
const API_URL = "http://10.107.7.40:4242";

const StripeApp = props => {

  
  const auth = getAuth(firebase);
  var user=auth.currentUser.email;
  const [email, setEmail] = useState();
  const [adresse, setAdresse] = useState();
  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment, loading } = useConfirmPayment();

  const fetchPaymentIntentClientSecret = async () => {
    
    const response = await fetch(`${API_URL}/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
       
      },
     
    });
    const { clientSecret, error } = await response.json();
    return { clientSecret, error };
  };

  const handlePayPress = async () => {
    //1.Gather the customer's billing information (e.g., email)
    if (!cardDetails?.complete || !email) {
      Alert.alert("Please enter Complete card details and Email");
     
      return;
    }
    const billingDetails = {
      email: email,
    };
    //2.Fetch the intent client secret from the backend
    try {
      const { clientSecret, error } = await fetchPaymentIntentClientSecret();
      //2. confirm the payment
      if (error) {
        console.log("Unable to process payment");
      } else {
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          type: "Card",
          billingDetails: billingDetails,
        });
        if (error) {
          alert(`Payment Confirmation Error ${error.message}`);
        } else if (paymentIntent) {
          alert("Payment Successful");
          console.log("Payment successful ", paymentIntent);
        }
      }
    } catch (e) {
      console.log(e);
    }
    //3.Confirm the payment with the card details
   
  };

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        placeholder="E-mail"
        keyboardType="email-address"
        onChange={value => setEmail(value.nativeEvent.text)}
        style={styles.input}
        
      />
      
       <TextInput
        autoCapitalize="none"
        placeholder="Adresse"
        keyboardType="email-address"
        onChange={value => setAdresse(value.nativeEvent.text)}
        style={styles.inputt}
       
      />
      <CardField
        postalCodeEnabled={true}
        placeholder={{
          number: "4242 4242 4242 4242",
        }}
        cardStyle={styles.card}
        style={styles.cardContainer}
        onCardChange={cardDetails => {
          setCardDetails(cardDetails);
        }}
      />
       <TouchableOpacity onPress={alert("Payment successful")} style={styles.button} >
                <Text style={styles.pay}>Valider le paiement</Text>
             </TouchableOpacity>
     
    </View>
  );
};
export default StripeApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 20,
    
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
    left:30,
    fontSize: 17, 
    fontWeight: '400',
     color: '#595260',
     paddingLeft:5
  },
  inputt: {
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
    top:20,
    left:30,
    bottom:50,
    fontSize: 17, 
    fontWeight: '400',
     color: '#595260',
     paddingLeft:5
  },
  card: {
    backgroundColor: "#AEAEAE",
    borderRadius:10,
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
    
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
   left:30,
  },
  pay:{
    fontSize: 17, 
    fontWeight: '400',
     color: '#595260'
  },
});