import { View, Text, TextInput, StyleSheet, TouchableHighlight } from 'react-native'
import React, { useState } from 'react'
import Axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import adresseServer from '../Composants/adresseServer'
import colors from '../Constantes/constants'
import HeaderApp from '../Composants/HeaderApp'
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Suggestions = ({navigation}) => {
    
    const [objet,setObjet]=useState('')
    const [description,setDescription]=useState('')

    const SendSuggestion= async()=>{
         try {
             let user=JSON.parse(await AsyncStorage.getItem('user'))
              
             const url=adresseServer+'Suggestions'
             console.log(url)
             let data={
                objet:objet,
                description:description,
                emailUser: user.email,
             }
            console.log(data)
            await Axios.post(url,data).then((res)=>{
                setObjet('')
                setDescription('')
                alert(res.data.message)
            }).catch((err)=>{
                console.log(err)
            })
             
         } catch (error) {
            console.log(error)
         }
    }
  return (
    <View style={styles.container}>
      <HeaderApp navigation={navigation}/>
      <View style={styles.container2}>
          <Text style={styles.txtTitre}>Suggestions</Text>
          <TextInput
            style={styles.txtInput}
            placeholder='Entrer votre Objet...'
            placeholderTextColor={colors.greyApp}
            value={objet}
            onChangeText={(objet)=>setObjet(objet)}
            />
          <View style={styles.txtAreaView}>
            <TextInput
              style={styles.txtArea}
              placeholder='Decriver votre suggestion...'
              placeholderTextColor={colors.greyApp}
              underlineColorAndroid='white'
              multiline={true}
              //numberOfLines={15}
              value={description}
              onChangeText={(description)=>setDescription(description)}
            />
          </View>
          <TouchableHighlight style={styles.btnSend} onPress={SendSuggestion}>
            <Text style={styles.txtBtn}>Envoyer</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.btnSend} onPress={() => {handleNotification()}}>
            <Text style={styles.txtBtn}>NOTIFICATIONS</Text>
          </TouchableHighlight>
        </View>
    </View>
  )
}
async function handleNotification () {
  //alert('BOBO')
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Time's up!",
      body: 'Change sides!',
    },
    trigger: {
      seconds: 10,
    },
  });
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: colors.whiteBlue
    },
    container2:{
      flex:2,
      marginTop:100,
      alignItems:'center',
      //justifyContent:'center'
    },
    txtTitre:{
        fontSize:30,
        marginBottom:15,
        color:colors.green,
        fontWeight:'bold'
    },
    txtInput:{
        backgroundColor:colors.white,
        marginBottom:15,
        width:"80%",
        padding:5,
        paddingLeft:6,
        borderRadius:10,
        color:colors.green,  
        elevation:5 
    },
    txtAreaView:{
      borderWidth:1,
      borderColor:colors.white,
      height:150,
      width:'80%',
      borderRadius:10,
      backgroundColor:colors.white,
      elevation:5
    },
    txtArea:{
      backgroundColor:colors.white,
      marginBottom:15,
      width:"100%",
      paddingHorizontal:10,
      color:colors.green,   
      borderRadius:10,
  },
    btnSend:{
        backgroundColor:colors.green,
        width:"50%",
        alignItems:'center',
        justifyContent:'center',
        marginTop:25,
        padding:10,
        borderRadius:10,
        elevation:5
    },
    txtBtn:{
        color:'white',
        fontSize:20,
        fontWeight:'bold'
    }
})

export default Suggestions