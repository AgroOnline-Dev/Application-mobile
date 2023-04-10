import { View, Text } from 'react-native'
import React from 'react'
import HeaderApp from '../../Composants/HeaderApp'

const Investissement = ({navigation}) => {
  return (
    <View style={{flex:1}}>
      <HeaderApp navigation={navigation}/>
      <View style={{alignItems:'center',justifyContent:'center',marginTop:15}}>
        <Text >Investissement</Text>
      </View>
    </View>
  )
}

export default Investissement