import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import {Feather} from '@expo/vector-icons';
import colors from '../Constantes/constants';

const NouveauMsgForm = ({user, socket}) => {

    const [content,setContent]=useState('');

    const Envoyer=()=>{
        if (content.trim()===''){
            return
        }
        const msg={
            room : "Discussions" ,
            user,
            contenu : content.trim(),
            temps: new Date().getTime(),
            heure: `${new Date().getHours()}`+':'+`${new Date().getMinutes()}`
        }
         
        //Configuration Envoie des messages via socket
        console.log(msg)
        console.log(socket.emit)
        socket.emit("send-message", msg)
        setContent("")
    }

  return (
    <View style={{alignItems:'center'}}>
      <View style={styles.container}>
        <TextInput 
          style={styles.newMsgInput}
          value={content}
          onChangeText={setContent}
          multiline={true}
          placeholder="Entrer votre message ici..."
        />
        <Pressable disabled={ content===""} onPress={Envoyer} style={styles.btnSendMsg}>
              <Feather name='send' size={30} 
                  color={content==="" ? "lightgreen" : colors.green}
              />
        </Pressable>
      </View>
    </View>
  )
}

export default NouveauMsgForm

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-between',
        padding:5,
        marginBottom:10,
        backgroundColor:colors.greyApp,
        borderRadius:10,
        paddingHorizontal:20,
        paddingVertical:5,
        width:330,
        elevation:5
        
    },
    newMsgInput:{
      width:'85%',
    },
    btnSendMsg:{
      justifyContent:'center'
    }
})