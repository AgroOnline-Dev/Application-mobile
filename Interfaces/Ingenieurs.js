import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, View, FlatList, TextInput , Image, TouchableOpacity, Pressable} from 'react-native'
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import adresseServer from '../Composants/adresseServer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../Constantes/constants';
import { Ionicons,FontAwesome5 } from '@expo/vector-icons';
import HeaderApp from '../Composants/HeaderApp';

export default function Ingenieurs({navigation}) {
  
 //Etablissement du lien avec mon serveur express
  const url=adresseServer+"Ingenieurs";
  
 const [motRech,setMotRech]=useState('') //NOM A RECHERCHER
 const [ingenieurs,setIngenieurs]=useState([]) //ON LE CHARGE DANS UN PREMIER TEMPS
 const [Data, setData]=useState([]) //CONTIENT LES ING FILTRES
 const [user,setUser]=useState('')

 
 const load=async()=>{
  try { 
    //Recuperation de la liste des ingenieurs se trouvant dans la BD
    let result=await axios.get(url)
    //On met la liste des ingenieurs dans la variable ingenieurs du hook state
    //console.log(result.data)
    setIngenieurs(result.data)
    setData(result.data)
    setUser( await AsyncStorage.getItem('email'))
  } catch (error) {
    console.log(error)
  }
}
 useEffect(()=>{
   load();
  },[])
    
  //FONCTION RECHERCHE INGENIEUR PAR SON NOM
  const searchIng=(text)=>{
    if (text){
      const search=Data.filter((item)=>{
        const itemData=item.name ? item.name.toLowerCase():''.toLowerCase()
        const textData=text.toLowerCase()

        return itemData.indexOf(textData) > -1
      })
      setIngenieurs(search)
      setMotRech(text)
    } else{
      setIngenieurs(Data)
      setMotRech(text)
    }
  }
  //FONCTION QUI Ajoute l'identifiant de l'ingenieur choisi dans la table de l'agriculteur
  const AddIngenieur=(item)=>{
    const url2=adresseServer+"login/Ingenieurs";
    let data = 
      {
        email: user,
        id: item.id
      };
    console.log(data);
    axios.post(url2,data
    ).then((res)=>{
      console.log('Bien')
      navigation.navigate('ActTo')
    }).catch((err)=>{
      console.log(err);
    })
  }

  //Fonction renderItem pour charger les ingenieurs de la BD dans le flat list
  const renderItem=({item})=>(
      <Pressable  style={styles.listIng} onPress={()=>AddIngenieur(item)}>
        <View>
          <Image style={styles.photoIng}  source={{uri: adresseServer+item.profile_image}}/>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Ionicons name="md-logo-instagram" size={15} color={colors.greyApp}/>
            <Ionicons name="logo-twitter" size={15} color={colors.greyApp}/>
            <FontAwesome5 name="facebook-f" size={15} color={colors.greyApp} />
          </View>
        </View>
        <View  style={{marginLeft:30,justifyContent:'center'}}>
           <Text style={{color:colors.greyApp,fontWeight: 'bold'}}>{item.name}</Text>
           <Text style={styles.textIng}>{item.email}</Text>
           <Text style={styles.textIng}>Spécialité : {item.speciality}</Text>
           <Text style={styles.textIng}>{item.experience} d'expérience</Text>
        </View>
      </Pressable>
    )

  return (
    <View style={styles.container}>
      <HeaderApp navigation={navigation}/>
      <View style={{alignItems:'center'}}>
        <View style={styles.barRech}>
          <Ionicons name='search' size={25} color={colors.greyS}/>
          <TextInput
            style={styles.inputBarRech}
            placeholder='Recherche...'
            placeholderTextColor={colors.greyS}
            onChangeText={(text)=>searchIng(text)}
            value={motRech}
            
          /> 
        </View>
        <FlatList
          showsVerticalScrollIndicator={false} 
          data={ingenieurs} //Liste des ingenieurs
          renderItem={renderItem} 
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  )
  }

const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding:8,
    backgroundColor:colors.whiteBlue,
  },
  barRech:{
    flexDirection:'row',
    backgroundColor:colors.white,
    padding:8,
    borderRadius:8,
    paddingLeft:20,
    paddingVertical:10,
    marginTop:30,
    elevation:5,
    width:'97%'
  },
  inputBarRech:{
    marginLeft:5,
    color:colors.black,
    fontSize:15,
  },
  listIng:{
    flexDirection:'row',
    backgroundColor:colors.white,
    padding: 12,
    marginTop:30,
    paddingVertical:20,
    paddingLeft:20,
    elevation:5
  },
  photoIng:{
    width:50,
    height:50,
    borderRadius:25,
    marginBottom:5
  },
  textIng:{
    color:colors.black,
    fontSize:12,
    fontWeight: 'bold'
  },
})
