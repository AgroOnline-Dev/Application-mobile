import { TouchableOpacity, StyleSheet, Text, View,Image, TextInput, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import adresseServer from '../Composants/adresseServer'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import { AntDesign,MaterialIcons,Ionicons,MaterialCommunityIcons} from '@expo/vector-icons';
import axios from 'axios';
import HeaderApp from '../Composants/HeaderApp';
import colors from '../Constantes/constants';

 const Profil = ({navigation}) => {

  const [img,setImg]=useState()
  const [defaultImg,setDefaultImg]=useState()
  const [userEmail,setUserEmail]=useState('')
  const [newEmail,setNewEmail]=useState('')
  const [mdp,setMdp]=useState('')
  const [nom,setNom]=useState('')

  //FONCTION LOAD S'EXECUTE AU MOMENT DU NONTAGE DU COMPOSANT DANS USEEFFECT
  const load=async()=>{
    try { 
      let user =JSON.parse( await AsyncStorage.getItem('user'))
      if (user!==null){
        setDefaultImg(adresseServer+user.photo)
        setUserEmail(user.email)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect( ()=>{
    load();
  },[])

  //FONCTION MODIFIE LE USER PROFILE
  const UploadImage= async()=>{
    let result= await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    setImg(result.assets) // CHARGEMENT POUR L'AFFICHAGE
    console.log(result.assets)
    
    //RECUPERATION DU NOM DU FICHIER
    const fileInfo = await FileSystem.getInfoAsync(result.assets[0].uri);
    const fileName = fileInfo.uri.split("/").pop();
    console.log("FileName :"+fileName);

    console.log(result.assets[0].type);

    //RECUPERATION DE L'EXTENSION
    let uriParts = result.assets[0].uri.split('.');
    let fileExtension = uriParts[uriParts.length - 1];
    console.log(fileExtension)

    const type=`${result.assets[0].type}/${fileExtension}`
    ///
    let formData = new FormData();
      formData.append('img', {
        uri: result.assets[0].uri,
        name: fileName,
        type: type
      });
      
    const url=adresseServer+`upload/${userEmail}`
    await axios.post(url,formData,{headers:{'Content-Type': 'multipart/form-data'}})
    
  }

  //FONCTION POUR MODIFIER LES INFOS DU USER
  const modifyInfo= async()=>{
    const url=adresseServer+'modifyInfos'
    const data={
      nom:nom,
      mdp:mdp,
      newEmail:newEmail,
      email: userEmail,
    }
    console.log(data)
    await axios.post(url,data).then((res)=>{
      alert(res.data.message)
      setNom('')
    })
  }

   return (
     <View style={styles.container}>
      <HeaderApp navigation={navigation}/>
      <View style={styles.container2} >
        <View style={styles.container3}>
          { img ?  <Image source={{ uri: img[0].uri }} style={styles.photo} />
                                              : 
                    <Image source={{ uri: defaultImg }} style={styles.photo} />                           
          }
          <Pressable style={styles.configPhoto} onPress={UploadImage}>
            <AntDesign name="camera" size={18} color={colors.black  }  />
          </Pressable>
          <View style={{width:'90%'}}>
            <View style={ styles.TxtInput}>
              <Ionicons name="person" size={25} color={colors.black} style={{marginRight:8}}/>
              <View style={{width:'80%',alignItems:'center'}}>
                <TextInput 
                  style={{fontSize:16,color:colors.green}} 
                  placeholder="Nom d'utilisateur"
                  placeholderTextColor={colors.green}
                  onChangeText={(nom)=>setNom(nom)}
                  value={nom}
                />
              </View>
              <MaterialIcons name="edit" size={24} color="black" style={{marginLeft:5}}/>
            </View>
          </View>

          <View style={{width:'90%'}}>
            <View style={ styles.TxtInput}>
              <MaterialCommunityIcons name="lock" size={25} color={colors.black} style={{marginRight:8}}/>
              <View style={{width:'80%',alignItems:'center'}}>
                <TextInput 
                  style={{fontSize:16,color:colors.green}} 
                  placeholder="Mot de passe"
                  placeholderTextColor={colors.green}
                  secureTextEntry={true}
                  onChangeText={(mdp)=>setMdp(mdp)}
                  value={mdp}
                />
              </View>
              <MaterialIcons name="edit" size={24} color="black" style={{marginLeft:5}}/>
            </View>
          </View>

          <View style={{width:'90%'}}>
            <View style={ styles.TxtInput}>
              <MaterialCommunityIcons name="email" size={25} color={colors.black} style={{marginRight:8}} />
              <View style={{width:'80%',alignItems:'center'}}>
                <TextInput 
                  style={{fontSize:16,color:colors.green}} 
                  placeholder="Adresse Email"
                  placeholderTextColor={colors.green}
                  keyboardType='email-address'
                  onChangeText={(newEmail)=>setNewEmail(newEmail)}
                  value={newEmail}
                />
              </View>
              <MaterialIcons name="edit" size={24} color="black" style={{marginLeft:5}}/>
            </View>
          </View>
          <View style={{alignItems:'center',width:'70%',}}>
              <TouchableOpacity 
                style={[styles.btnValider,{backgroundColor:colors.whiteBlue}]} 
                activeOpacity={0.5} 
                onPress={()=>navigation.navigate('Ingenieurs')}
              >
                <Text style={[styles.txtValider,{fontSize:15,color:colors.green}]}>Changer Ingenieur</Text>
              </TouchableOpacity>
          </View>
          <View style={{alignItems:'center',width:'60%',marginTop:85}}>
              <TouchableOpacity style={styles.btnValider} activeOpacity={0.5} onPress={modifyInfo} >
                <Text style={styles.txtValider}>Valider</Text>
              </TouchableOpacity>
          </View>
        </View>
      </View>
     </View>
   )
 }
 
 export default Profil
 
 const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:colors.white
  },
  container2:{
    flex:2,
    marginTop:18,
    backgroundColor:colors.whiteBlue,
    alignItems:'center'
  },
  container3:{
    width:'90%',
    height:'80%',
    backgroundColor:colors.white,
    marginVertical:30,
    borderRadius:20,
    alignItems:'center',
    elevation:10
  },
  photo:{
    width: 100,
    height: 100, 
    borderRadius:50,
    marginTop:-10,
    marginBottom:10,
  },
  configPhoto:{
    alignItems:'center', 
    justifyContent:'center',
    width:30,
    height:30,
    borderRadius:15,
    backgroundColor:colors.white,
    marginTop:-40,
    marginLeft:60
  },
  TxtInput:{
    flexDirection:'row',
    padding:5,
    paddingLeft:10,
    marginTop:10,
    marginBottom:25,
    marginRight:5,
    borderBottomWidth: 1,
    borderBottomColor:colors.greyApp,
    fontSize:18,
  },
  btnValider:{
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
  txtValider:{
    textAlign:"center",
    fontSize:20,
    padding:2,
    color:colors.white,
    fontWeight:"bold",
  },
 })