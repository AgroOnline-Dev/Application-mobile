import React, { useEffect } from "react";
import { useState,useContext } from 'react';
import { StyleSheet, Text, View,TextInput,ImageBackground, TouchableOpacity,Image} from 'react-native';
import axios from 'axios';
import { SimpleLineIcons,FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../context/AuthContext';

import adresseServer from "../Composants/adresseServer";
import colors from "../Constantes/constants";

export default function Connexion({ navigation }) {

  //Declaration des variables pour la recuperation du mot de passe et de email
  const [email,setEmail]=useState('');
  const [motsPasse,setMotsPasse]=useState('');
   
 

  //Utilisation du context du fichier AuthContext
  //const {logIn}=useContext(AuthContext);
   
  const seConnecter= ()=>{
   
    //Etablissement du lien avec mon serveur express
    const url= adresseServer+"login";
    let data = 
      {
        email: email,
        motsDePasse: motsPasse
    };
    console.log(data);
 
    axios.post(url,data
    ).then(async(res)=>{
      //Mise a jour de la variable login message
      alert(res.data.message)
      if (res.status===200){
        try {
          //Enregistrement de l'email de l'agriculteur asynctorage
            console.log("Enregistrer "+email)
          
            //URL DU ROUTE POUR RECUPERER LES INFOS DE L'AGRICULTEUR DANS LA BD VIA LE SERVER
            const url1=adresseServer+`Agriculteurs/${email}`
            
            //STOCKAGE DES INFOS DANS LA VARIABLE response 
            const response =  await axios.get(url1); 
            console.log(response.data)
            
           //STOCKAGE DE L'EMAIL USER DANS ASYNCSTORAGE
            await AsyncStorage.setItem('email',email)
        
            navigation.navigate('home')
            
        } catch (error) {
          alert("Erreur survenue")
        }
        setEmail("")
        setMotsPasse("")
      }
    }).catch((err)=>{
      console.log(err);
    })
  }
  
  //Fonction qui verifie si le user etait deja connecté pour le rediriger vers le home
  const load= async()=>{
    try {
      let email= await AsyncStorage.getItem('email')
      if (email !== null){
        navigation.navigate('home')
      }
    } catch (error) {
      alert("Erreur survenue")
    }
  }
  useEffect(()=>{
    load();
  },[])

  return (
      <ImageBackground style={styles.container} source={require('../assets/background.jpg')}>
        <Image style={styles.logo} source={require('../assets/logo.png')}/>
        <View>
            <Text style={styles.inscriTitre}>SE CONNECTER</Text>
            <View style={{width:'90%'}}>
              <View style={ styles.TxtInput}>
                <FontAwesome name="envelope-o" size={22} color={colors.green} style={{marginRight:8}} />
                <TextInput 
                  style={{fontSize:16}} 
                  placeholder="Email"
                  placeholderTextColor={colors.greyApp}
                  keyboardType='email-address'
                  onChangeText={(email)=>setEmail(email)}
                  value={email}
                />
              </View>
              <View style={styles.TxtInput} >
                <SimpleLineIcons name="lock" size={25} color={colors.green} style={{marginRight:8}}/>
                <TextInput 
                  style={{fontSize:16}}
                  secureTextEntry={true}
                  placeholder="Mot de Passe"
                  placeholderTextColor={colors.greyApp} 
                  onChangeText={(motsDePasse)=>setMotsPasse(motsDePasse)}
                  value={motsPasse}
                />
              </View>
              <View style={{alignItems:'center'}}>
                <TouchableOpacity style={styles.btnConnect} activeOpacity={0.5} onPress={seConnecter}>
                  <Text style={styles.txtConnect}>Se connecter</Text>
                </TouchableOpacity>
                <Text style={{color:colors.green,fontSize:11}}>Si vous n'avez pas de compte, veuillez vous enregistrer.</Text>
                <TouchableOpacity style={styles.btnCreerCo} onPress={() => { navigation.navigate('Inscription')}}>
                  <Text style={styles.txtRegister}>S'enregistrer</Text>
                </TouchableOpacity>
              </View>
            </View>
        </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', 
  },
  logo:{
    width:'30%',
    height:'20%',
    marginBottom:15,
    marginTop:40,
  },
  inscriTitre:{
    textAlign:"center",
    fontSize:38,
    color:colors.green,
    marginBottom:15,
  },
  TxtInput:{
    flexDirection:'row',
    padding:5,
    paddingLeft:10,
    marginTop:10,
    marginBottom:25,
    borderBottomWidth: 1,
    borderBottomColor:colors.greyApp,
    fontSize:18,
  },
  btnConnect:{
    backgroundColor:colors.green,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:20,
    marginTop:10,
    marginBottom:40,
    width:'80%',
    padding:5,
    elevation:8
  },
  txtConnect:{
    textAlign:"center",
    fontSize:20,
    padding:7,
    color:colors.white,
    fontWeight:"bold"
  },
  btnCreerCo:{
    backgroundColor:colors.whiteBlue,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:20,
    marginTop:10,
    marginBottom:50,
    width:'70%',
    padding:5,
    elevation:5
  },
  txtRegister:{
    textAlign:"center",
    fontSize:17,
    padding:7,
    color:colors.green,
    fontWeight:'bold'
  }
});
