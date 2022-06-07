import React, {useEffect,Component,useState} from 'react';
import { Image, Text, StyleSheet, View, ScrollView, TouchableOpacity,Dimensions,textarea, TextInput, ImageBackground, Button, Alert,SafeAreaView } from 'react-native';
import { getDatabase, set,ref, onValue,} from 'firebase/database';
import ProdA from './ProdA';
import DropDownPicker from 'react-native-dropdown-picker';
import { Addproduit } from '../Components/Addproduit';
import SelectDropdown from 'react-native-select-dropdown'
const width = Dimensions.get('window').width / 2 - 30;
import RadioButtonRN from 'radio-buttons-react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
const data1 = [1,2,3,4,5,6,7,8,9]
function Ajout(){
  const [id, setId] = React.useState('')
  const [libelle, setLibelle] = React.useState('')
  const [prix, setPrix] = React.useState('')
  const [taille, setTaille] = React.useState('')
  const [couleur, setCouleur] = React.useState('')
  const [id_sous_categorie, setId_sous_categorie] = React.useState('')
  const [quantite_disponible, setQuantite_disponible] = React.useState('')
  const [date_ajout, setDate_ajout] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [nouveaute, setNouveaute] = React.useState('')
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [isImageShown, setIsImageShown] =useState(true);
  let openImagePickerAsync = async () => {
      let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
      if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
      }
      let pickerResult = await ImagePicker.launchImageLibraryAsync();
      if (pickerResult.cancelled === true) {
          return;}
        setSelectedImage(pickerResult.uri);
      };
    
  const [items, setItems] = useState([
    {label: '1', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: '3'},
    {label: '4', value: '4'},
    {label: '5', value: '5'},
    {label: '6', value: '6'},
    {label: '7', value: '7'},
    {label: '8', value: '8'},
    {label: '9', value: '9'},
  ]);
  const data = [
    {
      label: 'true' , value:'true'
     },
     {
      label: 'false', value:'false'
     }
    ];
  return (
    <ScrollView  contentContainerStyle={{width:385,right:-3,}} >
    <ScrollView horizontal={true} contentContainerStyle={{height:900,width:383,right:-3,}} showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
    
    
    <View style={{top:-40}}>
    <ImageBackground source={require('../assets/pic1.jpg')} resizeMode='cover' style={styles.backgroundPic} blurRadius={3}>
    
    <View style={styles.tout}>
    <Text style={styles.text}>ID</Text>   
    <TextInput onChangeText={(text) => setId(text)} style={styles.putID}  placeholder="" />
    <SafeAreaView style={styles.putL}>
     <Text style={styles.text}>Libellé</Text>   
    <TextInput onChangeText={(text) => setLibelle(text)} style={styles.put}  placeholder=""  /></SafeAreaView>
    <SafeAreaView style={styles.putP}>
    <Text style={styles.text}>Prix</Text>   
    <TextInput onChangeText={(text) => setPrix(text)} style={styles.putpp}  placeholder="" /></SafeAreaView>

<SafeAreaView  style={styles.putT}>
    <Text  style={styles.text}>Taille</Text>   
    <TextInput onChangeText={(text) => setTaille(text)} style={styles.put}  placeholder=""  /></SafeAreaView>

    <Text  style={styles.textC}>Couleur</Text>   
    <TextInput onChangeText={(text) => setCouleur(text)} style={styles.putC}  placeholder=""  />

    
    <Text style={styles.textQ}>Qt disponible</Text>
    <TextInput onChangeText={(text) => setQuantite_disponible(text)} style={styles.putQ}  placeholder=""  />
    <SafeAreaView style={styles.putD}>
    <Text style={styles.text}>Date d'ajout</Text>
    <TextInput onChangeText={(text) => setDate_ajout(text)} style={styles.put}  /></SafeAreaView>
    <SafeAreaView style={styles.putDes}>
    <Text style={styles.text}>Description</Text>
    <TextInput onChangeText={(text) => setDescription(text)} style={styles.putDp}  placeholder=""  />
    </SafeAreaView>
    <SafeAreaView style={{top:-14}}>
    <Text style={styles.text}>Nouveaute</Text>   
    <RadioButtonRN
  data={data}
  selectedBtn={(e) => setNouveaute(e.value)}
  textStyle={{marginTop:-5,left:5,fontSize:14}}
  boxStyle={{width:90,height:45,left:30,color:'#ac754e',top:10}}
  icon={
    <Icon
      name="check-circle"
      size={25}
      color="#2CBBE1"
    />
  }
/>
    </SafeAreaView>
    <SafeAreaView style={styles.putI}>
    <Text style={styles.text}>id_sous_categorie</Text>
    
    <DropDownPicker
    open={open}
      value={value}
      items={items}
     dropDownStyle={{width:120,top:18,left:30,}}
      containerStyle={{width:116,top:18,left:30,}}
      placeholder="Select id"
      theme="DARK"
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      dropDownDirection='TOP'
      onChangeValue={(value) => {
        setId_sous_categorie(value)
      }}
    />
</SafeAreaView>  
    </View>
    <SafeAreaView style={{marginTop:2,left:40,}}>
    <Text style={styles.text}>Image</Text>
    <TouchableOpacity  onPress={openImagePickerAsync}>
            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
                position:'relative',
                left:140,
                top:-70,
                backgroundColor: 'white',
              }}>
              <Icon name="photo" size={50}/>
              
            </View>
            <Text style={{left:105,marginTop:-65}} >Télécharger une photo</Text>
            </TouchableOpacity>
           
    </SafeAreaView>



    <View style={{top:60,left:0, position:'relative'}} >
    <TouchableOpacity style={styles.button}  onPress={() => { Addproduit(id,couleur,date_ajout,prix,taille,nouveaute,id_sous_categorie,libelle,quantite_disponible,description,selectedImage) }} >
                <Text style={styles.signUp} >Ajouter</Text>
             </TouchableOpacity>
    </View>
    
    </ImageBackground>
    </View>
    </ScrollView>
    </ScrollView>
  );
}

export default Ajout;

const styles = StyleSheet.create({
  
  backgroundPic:{
     
    width:350,
    height:940,
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
   top:0,
   left:40
  },
  signUp:{
    fontSize: 17, 
    fontWeight: '400',
     color: '#595260'
  },
   tout: {
      width:320,
      height:630,
      borderColor:'black',
      borderRadius:15,
      borderWidth:2,
      top:100,
      left:15,
    },
    dropdown: {
      backgroundColor: 'white',
      borderBottomColor: 'gray',
      borderBottomWidth: 0.5,
      marginTop: 20,
      left:60
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
    fontSize:13.5,
    color:'black',
    top:8,
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
     top:8,
     left:8,
     paddingLeft:20,
     alignItems: 'center',
 },
 putL:{
    width:160,
    height:30,
     top:-50,
     left:130,
     
 },
 putI:{
    width:160,
    height:30,
     top:-144,
     left:130,
 },
 putT:{
    width:160,
    height:30,
     top:-50,
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
    fontSize:13.5,
    color:'black',
    top:-10,
    left:20,
 },
 putC:{
    width:110,
    height:30,
    elevation:3,
    borderRadius:9,
    justifyContent: 'center',
     top:-10,
     left:10,
     paddingLeft:20,
     alignItems: 'center',
     color:'white',
      borderRadius: 10,
      textShadowColor:'white',
      borderColor: '#595260',
      borderWidth:2,
    
 },
textQ:{
  fontWeight: 'bold',
  fontSize:13.5,
  color:'black',
  top:0,
  left:20,
},
putQ:{
  width:110,
  height:30,
  elevation:3,
  borderRadius:9,
  justifyContent: 'center',
   top:0,
   left:10,
   paddingLeft:20,
   color:'white',
      borderRadius: 10,
      textShadowColor:'white',
      borderColor: '#595260',
      borderWidth:2,
   alignItems: 'center',
  
},
putD:{
  width:160,
  height:30,
   top:-122,
   left:130,
},
putDes:{
  fontWeight: 'bold',
  fontSize:13.5,
  color:'black',
  top:-30,
  left:4,
},
putDp:{
  width:283,
  height:90,
  elevation:3,
  borderRadius:9,
   top:10,
   left:10,
   color:'white',
      borderRadius: 10,
      textShadowColor:'white',
      borderColor: '#595260',
      borderWidth:2,
   paddingLeft:20,
   alignItems: 'center',
},
});



