 import React, { Component } from 'react'
 import { Text, StyleSheet, View } from 'react-native'
 import { WebView } from 'react-native-webview';


 const SpaceVisio = () => {
   return (
        <WebView source={{ uri: 'https://zoom.us/' }} 
          scrollEnabled={false}
          scalesPageToFit={true}
        />
   )
 }
 
 export default SpaceVisio
 
 const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  }
 })
 