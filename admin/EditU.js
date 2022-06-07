import React, {useEffect,Component,useState} from 'react';
import { Image, Text, StyleSheet, View,FlatList,TouchableWithoutFeedback, ScrollView,input, TouchableOpacity,Dimensions, TextInput, Button, Alert,SafeAreaView } from 'react-native';
import { getDatabase, set,ref, onValue,update, DataSnapshot,orderByChild,equalTo,database,query, limitToLast, orderByKey, orderByValue} from 'firebase/database';
import { getAuth, createUserWithEmailAndPassword, } from 'firebase/auth';
import firebase from '../firebase-config'
const width = Dimensions.get('window').width;
const width1 = Dimensions.get('window').width;
import Icon from 'react-native-vector-icons/MaterialIcons';



const EditU=({navigation,route})=> {
    const p=route.params;
    const [produits,setProduits]=useState([]);
    const [email,setEmail]=useState(p.produit.email);
    const [id, setId] = React.useState(p.produit.id)
  const [nom, setnom] = React.useState(p.produit.nom)
  const [prenom, setPrenom] = React.useState(p.produit.prenom)
  const [sexe, setSexe] = React.useState(p.produit.sexe)
  const [adresse, setAdresse] = React.useState(p.produit.adresse)
  const [telephone, setTelephone] = React.useState(p.produit.telephone)
  const [ville, setVille] = React.useState(p.produit.ville)
  const [pays, setPays] = React.useState(p.produit.pays)
    const [user,setUsers]=useState([]);
    const [text,setText]=useState('');
   
    const [numberOfComments,setnumberOfComments]=useState(0);
    var userAvis=[];
    function check(){
    const dbRef1 = query(
        ref(getDatabase(firebase), 'users'),
        orderByChild("id"),
        equalTo(p.produit.id)
      );
      onValue(dbRef1,snapshot=>{
        const data=snapshot.val();
        if(data!==null){
            Object.values(data).map((p)=>{
         update(ref(getDatabase(firebase),'users/'+p.id),{ville,adresse,id,sexe,email,prenom,nom,telephone});        
        
       
        }) 
        }
      
      });
    }
    useEffect(()=>{
  
    const dbRef = query(
      ref(getDatabase(firebase), 'users'),
      orderByChild('id'),
      equalTo(p.produit.id)
      
    );
 
    onValue( dbRef,snapshot=>{
      const data=snapshot.val();
      if(data!==null){
        Object.values(data).map((produit)=>{
          
          setProduits(oldArray=>[...oldArray,produit])
        });
      }
    });
  
  },[]); 
 const DescProduct=({prod})=>{
    return (
         
      <ScrollView contentContainerStyle={{flexDirection:'row',width:400,flexWrap:'wrap',height:780,right:-3}} showsVerticalScrollIndicator={false}>
     
  <View>
             <View style={{flexDirection:"row",width:'50%'}} >
        <View  style={[style.card,]} >

          <View
            style={{
              height: 80,
              alignItems: 'center',
              left:0,
              top:10,
            }}>
            <Image
                source={require('../assets/profil.png')}
                style={{height: 90, width: 90}}
              />
          </View>

          
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              marginTop: 45,
              left:78,
              position:'relative'
            }}>
                <TextInput onChangeText={(text) => setnom(text)} style={{fontSize: 18, fontWeight: 'bold',left:30,position:'relative',width:180}}>
              {nom} </TextInput> 
              <View>
              <TextInput onChangeText={(text) => setPrenom(text)} style={{fontSize: 18, fontWeight: 'bold',left:90,top:-28,position:'relative',width:180}}>
             {prenom}</TextInput></View>
               
               </View>

               <View style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              marginTop: -20,
              left:55,
              position:'relative'
            }}>
            <TextInput onChangeText={(text) => setEmail(text)} style={{fontSize: 17, fontWeight: 'bold',position:'relative',width:395}}>
            {email}
            </TextInput>
            
            
            
          </View>
          <Text style={{top:20,left:-10,fontSize: 16, fontWeight: 'bold',}}>Autres informations</Text>
          <View style={{top:20}}>
          <Icon
              name="info"
              style={{fontSize: 25, color: '#000000', fontWeight: 'bold',marginTop:25,position:'relative',left:-10}}
              
              />
              <Text style={{fontSize: 16, fontWeight: 'bold',position:'relative',left:28,top:-25,fontFamily:'serif'}}>
             ID:
            </Text>
            <TextInput onChangeText={(text) => setId(text)} style={{position:'relative',left:65,marginTop:-19,fontSize: 14, position:'relative',width:230}}>
              {id}
            </TextInput>
            <Icon
              name="map"
              style={{fontSize: 27, color: '#000000', fontWeight: 'bold',marginTop:20,position:'relative',left:-10}}
              
              />
            <Text style={{fontSize: 16, fontWeight: 'bold',position:'relative',width:395,left:28,top:-27,fontFamily:'serif'}}>
             Adresse:
            </Text>
            <TextInput onChangeText={(text) => setAdresse(text)} style={{position:'relative',left:65,marginTop: -19,fontSize: 14, position:'relative',width:231}}>
              {adresse}
            </TextInput>
            <Icon
              name="location-pin"
              style={{fontSize: 27, color: '#000000', fontWeight: 'bold',marginTop:20,position:'relative',left:-10}}
              
              />
            <Text style={{fontSize: 16, fontWeight: 'bold',position:'relative',width:395,left:28,top:-26,fontFamily:'serif'}}>
             Ville:
            </Text>
            <TextInput onChangeText={(text) => setVille(text)} style={{position:'relative',left:65,marginTop: -19,fontSize: 15,position:'relative',width:395}}>
              {ville}
            </TextInput>
            <Icon
              name="phone"
              style={{fontSize: 25, color: '#000000', fontWeight: 'bold',marginTop:12,position:'relative',left:-10}}
              
              />
            <Text style={{fontSize: 16, fontWeight: 'bold',position:'relative',width:395,left:28,top:-25,fontFamily:'serif'}}>
             Telephone:
            </Text>
            <TextInput onChangeText={(text) => setTelephone(text)} style={{position:'relative',left:65,marginTop: -19,fontSize: 15, position:'relative',width:395}}>
              {telephone}
            </TextInput>
            <Icon
              name="info"
              style={{fontSize: 25, color: '#000000', fontWeight: 'bold',marginTop:12,position:'relative',left:-8}}
              
              />
            <Text style={{fontSize: 16, fontWeight: 'bold',position:'relative',width:395,left:28,top:-25,fontFamily:'serif'}}>
             Sexe:
            </Text>
            <Text style={{position:'relative',left:65,marginTop: -19,fontSize: 15, position:'relative',width:395}}>
              {sexe}
            </Text>
            
            </View>
            
        
       <TouchableOpacity onPress={() => {check(),alert('updated')}} style={{position:'relative',borderRadius:15,left:108,top:45,elevation:3,borderWidth:2,width:120,height:40}} >
           <Text style={{fontSize: 16, fontWeight: 'bold',position:'relative',left:19,top:5,fontFamily:'serif'}}>Modifier</Text>
       </TouchableOpacity>
        </View>
</View>
        </View>  

         </ScrollView>
        
         
      
    ); 
    }
   return(
      <View style={{flex:1}}>
        <View style={{flex:1}}>
        {produits.map((produit,index)=>{
          return(
        <View key={index} >
       <View style={style.imageContainer}>
     
     
       </View>
       
     </View>)})}
     <View style={{marginTop:-35,flex:1}}>
     <FlatList
        showsVerticalScrollIndicator={true}
        style={{marginTop:-10}}
        data={produits}
        
        renderItem={({item}) => {
          return (
        
          <DescProduct prod={item} />);
        }}
        keyExtractor={item=>item.id}
      /></View>
     
       
        
      </View>
    </View>
   )
}
export default EditU;

 const style = StyleSheet.create({
    
    card: {
      marginTop:40,
     height: 765,
     backgroundColor: '#f3ebe5',
     width,
     marginHorizontal: 7,
     marginLeft:0,
     borderRadius: 10,
     padding: 15,
     
   },
   
    
    })