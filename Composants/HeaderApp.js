import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import colors from '../Constantes/constants'

const HeaderApp = ({navigation}) => {
  return (
    <View style={styles.headerStyle}>
      <TouchableOpacity onPress={()=>navigation.openDrawer()}>
        <Ionicons name='menu' size={45} style={{color:colors.green,marginBottom:-20}}/>
      </TouchableOpacity>  
      <Image source={require('../assets/logo.png')} style={{width:'12%',height:'175%'}}  
      />
    </View>
  )
}
const styles=StyleSheet.create({
  headerStyle:{
    flexDirection:'row',
    marginTop:40, 
    justifyContent:'space-between',
    marginHorizontal:20,
    marginBottom:10,
    //backgroundColor:colors.whiteBlue
  }
})
export default HeaderApp
