import React from 'react';
import {View,Image,TouchableOpacity,Text} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CategoriesScreen, HomeScreen, AddScreen, PanierScreen, ProfilScreen,Pad } from '../Screens';
const Tab = createBottomTabNavigator();
const CustomTabBarButton = ({ children,onPress})=>(
<TouchableOpacity
    style={{
        top:-30,
        justifyContent: 'center',
        alignItems :'center',
    }}
    onPress={onPress}>
        <View
        style={{
            width:53,
            height: 53,
            borderRadius:32,
            backgroundColor:'#ac754e'
        }}
        >
{children}
        </View>
</TouchableOpacity>
);
const Tabs = () =>{
    return(
        <Tab.Navigator 
        screenOptions={{
            tabBarShowLabel:false,
            tabBarStyle: { position: 'absolute' ,
            bottom:0,
            height:60,
            elevation: 0,
            borderRadius: 15},
          }}
>
          <Tab.Screen name="Home" component={HomeScreen} options={{ 
              headerShown:false,
              tabBarIcon:({focused})=>(
                  <View>
                  <Image 
                  source={require('../assets/home.png')}
                  resizeMode="contain"
                  style={{
                    width:23,
                    height:23,bottom:3,
                    tintColor: focused ? '#b6825e' : '#000000'}}/>
                    <Text style={{marginBottom:-1, color: focused ? '#b6825e' : '#000000', fontSize :11,}}>Home </Text>
                    </View>
               )  
            }}
           />
            <Tab.Screen name="Neauveau" component={AddScreen} options={{ 
              headerShown:false,
              tabBarIcon:({focused})=>(
                  <View>
                  <Image 
                  source={require('../assets/dress.png')}
                  resizeMode="contain"
                  style={{
                    width:25,
                    height:25,
                    bottom:2,
                    left:15,
                    tintColor: focused ? '#b6825e' : '#000000'}}/>
                    <Text style={{marginBottom:-1, color: focused ? '#b6825e' : '#000000', fontSize :11,marginLeft:3}}>Nouveauté </Text>
                    </View>
               )  
            }}
           />
           <Tab.Screen name="Panier" component={PanierScreen} options={{ 
            headerShown:false,
            tabBarIcon:({focused})=>(
                <View>
                <Image 
                source={require('../assets/cart.png')}
                resizeMode="contain"
                style={{
                  width:32,
                  height:32,
                  right:3,
                  top:-3,
                  alignItems:'center',
                  tintColor: focused ? '#ffffff' : '#000000'}}/>
                  </View>
             ),
             tabBarButton :(props) =>(
                 <CustomTabBarButton {...props}/>
             ) 
          }}
         />
            <Tab.Screen name="Design" component={Pad} options={{ 
              headerShown:false,
              
              tabBarIcon:({focused})=>(
                  <View>
                  <Image 
                  source={require('../assets/dsign.png')}
                  resizeMode="contain"
                  style={{
                    width:25,
                    height:25,
                    tintColor: focused ? '#b6825e' : '#000000'}}/>
                    <Text style={{marginBottom:5, color: focused ? '#b6825e' : '#000000', fontSize :11,}}>Design </Text>
                    </View>
               )  
            }}
           />
            <Tab.Screen name="Moi" component={ProfilScreen} options={{ 
              headerShown:false,
              tabBarIcon:({focused})=>(
                  <View>
                  <Image 
                  source={require('../assets/user.png')}
                  resizeMode="contain"
                  style={{
                      width:28,
                      height:28,
                      bottom:3,
                      tintColor: focused ? '#b6825e' : '#000000'}}/>
                      <Text style={{marginBottom:3, color: focused ? '#b6825e' : '#000000', fontSize :11,marginLeft:3}}>Moi </Text>
                      </View>
               )  
            }}
           />
         
        </Tab.Navigator>
    );
}
export default Tabs;
