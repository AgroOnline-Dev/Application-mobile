
import { useState } from 'react';
import { StyleSheet, Text, View,TextInput,ImageBackground, TouchableOpacity,Image} from 'react-native';
import { SimpleLineIcons,FontAwesome,MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import adresseServer from '../Composants/adresseServer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import colors from '../Constantes/constants';

export default function CreerCompte({ navigation }) {

  const [userName,setUserName]=useState('');
  const [email,setEmail]=useState('');
  const [motsPasse,setMotsPasse]=useState('');
  const [region,setRegion]=useState('');
 
  const [registerRes,setRegisterRes]=useState("");
  
  
  const creerCompte= ()=>{
 
    //Etablissement du lien avec mon serveur express
    const url=adresseServer+"register";
    let data = 
      {
        pseudos: userName,
        email: email,
        region: region,
        motsDePasse: motsPasse
    };
 
    //Envoie de la requete vers le serveur express
    axios.post(url,data
    ).then((res)=>{
       setRegisterRes(res.data.message);
       alert(res.data.message)
       if (res.status===200){
        setUserName("")
        setEmail("")
        setRegion("")
        setMotsPasse("")
        //navigation.navigate('Connexion')
      }   
    }).catch((err)=>{
      console.log(err);
    })
  }

  return (
      <ImageBackground style={styles.container} source={require('../assets/background.jpg')}>
        <Image style={styles.logo} source={require('../assets/logo.png')}/>
        <View>
            <Text style={styles.inscriTitre}>S'ENREGISTRER</Text>
            <View>
              <View style={styles.TxtInput}>
                <MaterialIcons name="person-outline" size={28} color={colors.green} style={{marginRight:10}} />
                <TextInput 
                  style={{fontSize:16}} 
                  placeholder="Nom d'utilisateur"
                  placeholderTextColor={colors.greyApp}
                  onChangeText={(userName)=>setUserName(userName)}
                  value={userName}
                />
              </View>
              <View style={styles.TxtInput}>
                <FontAwesome name="envelope-o" size={22} color={colors.green} style={{marginRight:15}} />
                <TextInput 
                  style={{fontSize:16}}  
                  placeholder="Email"
                  placeholderTextColor={colors.greyApp}
                  keyboardType='email-address'
                  onChangeText={(email)=>setEmail(email)}
                  value={email}
                />
              </View>
              <View style={styles.TxtInput}>
                <MaterialIcons name="location-on" size={30} color={colors.green} style={{marginRight:8}} />
                <TextInput 
                  style={{fontSize:16}} 
                  placeholder="Région"
                  placeholderTextColor={colors.greyApp}
                  onChangeText={(region)=>setRegion(region)}
                  value={region}
                />
              </View>
              <View style={styles.TxtInput}>
                <SimpleLineIcons name="lock" size={25} color={colors.green} style={{marginRight:15}}/>
                <TextInput 
                  style={{fontSize:16}}  
                  secureTextEntry={true}
                  placeholder="Mot de Passe "
                  placeholderTextColor={colors.greyApp} 
                  onChangeText={(motsDePasse)=>setMotsPasse(motsDePasse)}
                  value={motsPasse}
                />
              </View>
              <View style={{alignItems:'center'}}>
                <TouchableOpacity style={styles.btnCreerCo} activeOpacity={0.5} onPress={creerCompte}>
                  <Text style={styles.txtCreerCo}>S'enregistrer</Text>
                </TouchableOpacity>
                <Text style={{color:colors.green,fontSize:11}}>
                  Veuillez vous connecter si vous avez déjà un compte.
                </Text>
                <TouchableOpacity style={styles.btnConnect} onPress={() => { navigation.navigate('Connexion')}}>
                  <Text style={styles.txtConnect}>Se connecter</Text>
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
    marginBottom:5,
    marginTop:40,
  },
  inscriTitre:{
    textAlign:"center",
    fontSize:38,
    color:colors.green,
    marginBottom:5,
  },
  TxtInput:{
    flexDirection:'row',
    padding:5,
    paddingLeft:10,
    marginTop:5,
    marginBottom:10,
    borderBottomWidth: 1,
    borderBottomColor:colors.greyApp,
    fontSize:18,
  },
  btnCreerCo:{
    backgroundColor:colors.green,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:20,
    marginTop:10,
    marginBottom:30,
    width:'80%',
    padding:5,
    elevation:5
  },
  txtCreerCo:{
    textAlign:"center",
    fontSize:20,
    padding:7,
    color:colors.white,
    fontWeight:"bold"
  },
  btnConnect:{
    backgroundColor:colors.whiteBlue,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:20,
    marginTop:10,
    width:'70%',
    padding:5,
    elevation:3
  },
  txtConnect:{
    textAlign:"center",
    fontSize:17,
    padding:7,
    color:colors.green,
    fontWeight:'bold'
  }
});
