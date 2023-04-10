import { View, Text } from 'react-native'
import React from 'react'
import HeaderApp from '../../Composants/HeaderApp'

const Commerce = ({navigation}) => {
  return (
    <View style={{flex:1}}>
      <HeaderApp navigation={navigation}/>
      <View style={{alignItems:'center',justifyContent:'center'}}>
        <Text >E-commerce</Text>
      </View>
    </View>
  )
}

export default Commerce