 import React, { Component } from 'react'
 import { Text, StyleSheet, View, Pressable } from 'react-native'
 import { WebView } from 'react-native-webview';
import colors from '../Constantes/constants';


 const Seminaire = ({navigation}) => {
   return (
    
         <View style={styles.container}>
          <View style={styles.sContainer}>
            <Pressable  onPress={()=>navigation.navigate('Semi')}>
              <Text style={styles.txtParticiper}>Participer aux Séminaires</Text>
            </Pressable>
          </View>
         </View>
   )
 }
 
 export default Seminaire
 
 const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:colors.whiteBlue,
    alignItems:'center',
    justifyContent:'center'
  },
  sContainer:{
    width:'90%',
    height:'90%',
    backgroundColor:colors.white,
    borderRadius:20,
    alignItems:'center',
    justifyContent:'center',
    elevation:10
  },
  txtParticiper:{
    fontSize:15,
    backgroundColor:colors.green,
    borderRadius:10,
    paddingHorizontal:30,
    paddingVertical:8,
    color:colors.white,
    elevation:10
  }
 })
 