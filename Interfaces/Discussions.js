import { View, Text, FlatList, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import io from 'socket.io-client'
import AsyncStorage from '@react-native-async-storage/async-storage'
import adresseServer from '../Composants/adresseServer'
import Messages from '../Composants/Messages'
import NouveauMsgForm from '../Composants/NouveauMsgForm'
import HeaderApp from '../Composants/HeaderApp'
import colors from '../Constantes/constants'
import axios from 'axios'

//Configuration de Socket.io
const socket=io(adresseServer)

const Discussions = ({navigation}) => {
  const [messages,setMesaages]=useState([])
  const [nameUser,setNameUser]=useState('')

  //Fonction qui recupere le nom du user dans AsyncStorage
  const load= async()=>{
    try {
      let user= JSON.parse(await AsyncStorage.getItem('user'))
      console.log(user)
      if (user!== null){
         console.log("CC : "+user.nom)
         setNameUser(user.nom)

         // Configuration Connection au Room
         socket.emit("join-room","Discussions")
         
         //Messages du BD
        const url=adresseServer+"Messages"
        const resultMsg= await axios.get(url)
        
        setMesaages(resultMsg.data)
     
        //Configuration des messages( envoie et reception)
        //Reception de messages
        socket.on("newMsgReceived",(data)=>{
          console.log("Mesaage recu : "+data.contenu)
          setMesaages(actuel =>{
            return [...actuel,data]
          })
        })
      }
    } catch (error) {
      alert(error)
    }
  }
  useLayoutEffect(()=>{
    load();
  },[])
  
  const renderItem=({item})=>{
    return (
      <Messages userName={nameUser} message={item}/>
    )
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS==="ios" ? "padding": null}
      scrollEnabled
      style={styles.keyboard}
    >
      <View style={{alignItems:'center'}}>
        <Text style={styles.nameUser}>{nameUser}</Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false} 
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.temps}
      />
      <NouveauMsgForm user={nameUser} socket={socket}/>
    </KeyboardAvoidingView>
  )
}
const styles=StyleSheet.create({
  keyboard:{
    flex:1,
    paddingBottom:10,
    backgroundColor:colors.whiteBlue
  },
  nameUser:{
    fontSize:30,
    marginVertical:15,
    paddingHorizontal:50,
    borderBottomWidth:1,
    borderColor:colors.greyApp,
    color:colors.greyApp
  }
})
export default Discussions
