import { useState,useEffect } from 'react';
import { View, Text ,StyleSheet, Image,TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import {
    DrawerContentScrollView,
    DrawerItemList,
  } from '@react-navigation/drawer';
 
import { Ionicons,MaterialCommunityIcons,FontAwesome5, Entypo } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import adresseServer from './adresseServer';
import colors from '../Constantes/constants';


const CustomDrawer = (props) => {

   //LES INFORMATIONS AGRICULTEUR A AFFICHER DANS LE DRAWER
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [imageSource,setImageSource]=useState(null)
    
    //FONCTION QUI S'EXECUTE AU MONTAGE DU COMPOSANT POUR RECUPERER LES INFOS DU USER ET METTRE AU DRAWER
    const load= async ()=>{
      try {
        let email=  await AsyncStorage.getItem('email')
        if (email !== null){
             
            const url=adresseServer+`Agriculteurs/${email}`
            //STOCKAGE DES INFOS DANS LA VARIABLE response 
            const response =  await axios.get(url); 
            console.log(response.data)
            //URL POUR RECUPERER L'IMAGE CORRESPONDANT AU NOM DE LA PHOTO DU USER DANS LE DOSSIER RESSOURCES DU SERVER
            const url1=adresseServer+response.data.photo
            //RECUPERATION DES INFO POUR LES AFFICHER
            setImageSource(url1)//url1 renvoit directement vers l'image qui est livree par le server
            setName(response.data.pseudos)   
            setEmail(email) 
            
            const agriculteur={
                nom: response.data.pseudos,
                email: email,
                region: response.data.region,
                photo:response.data.photo,
                ingenieur:response.data.idIng
            }

             await AsyncStorage.setItem('user',JSON.stringify(agriculteur))

         }else{
            console.log("Personne n'est connected")
         }
      } catch (error) {
        console.log(error)
      }
    }   
    useEffect(()=>{
     load().then(async()=>{
        const toi= JSON.parse(await AsyncStorage.getItem('user'))
        if (toi !==null){
            console.log(toi)
            console.log("Enregistrer")
        }
     })
    },[load])

     const Deconnexion= async(props)=>{
        try {
            await AsyncStorage.clear().then(()=>{
                props.navigation.navigate('Connexion')
            })
        } catch (error) {
            console.log(error)
        }
        console.log('User Deconnected')
     }
  
  return (
    <View style={{flex:1}}>
        <DrawerContentScrollView {...props} contentContainerStyle={styles.HeadDrawer}>
            <View style={{flex:1,padding:8,alignItems:'center', justifyContent:'center',marginBottom:15}}>
                <Image source={{uri: imageSource}} style={styles.PhotoProfil}/>
                <View style={{flex:1,padding:8,alignItems:'center', justifyContent:'center',marginBottom:5}} >
                    <Text style={styles.txtDrawerProfil}>{name}</Text>
                    <Text style={styles.txtDrawerProfil}>{email}</Text> 
                </View>
            </View>
            
            <View style={{backgroundColor:'white', paddingTop:8}}>
                <DrawerItemList {...props} />

                <View style={{flex:1,borderTopWidth:1,marginTop:200,padding:8,borderTopColor:'#ccc'}}>
                    <TouchableOpacity 
                        style={{flexDirection:'row',paddingVertical:15,alignItems:'center',marginLeft:10}}
                        onPress={()=>Deconnexion(props)}
                    >
                        <Entypo name="log-out" size={24} color={colors.greyS} />
                        <Text style={{marginLeft:5,fontSize:15,fontWeight:'bold',color:colors.greyS}}>Déconnexion</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </DrawerContentScrollView>
    </View>
  )
}

export default CustomDrawer
const styles=StyleSheet.create({
    HeadDrawer:{
        backgroundColor:'#128C7E'
    },
    PhotoProfil:{
        width:110,
        height:110,
        borderRadius:55, 
        marginBottom:10
    },
    txtDrawerProfil:{
        color:'white',
        marginLeft:8,
        fontSize:15,
        fontWeight:'bold'
    }  
})