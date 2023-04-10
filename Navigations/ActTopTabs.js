import {} from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Discussions from '../Interfaces/Discussions';
import FicheTech from '../Interfaces/FichesTech';
import Seminaire from '../Interfaces/Seminaire';
import colors from '../Constantes/constants';

const TopTabs = createMaterialTopTabNavigator();

const ActTopTabs = ({navigation}) => {
  return (
    <TopTabs.Navigator
      screenOptions={
        {
          tabBarLabelStyle: { fontSize:11,color:colors.black,fontWeight:'bold' },
          tabBarStyle: { backgroundColor: colors.whiteBlue, marginTop:20 },
          tabBarActiveTintColor:colors.green,
          tabBarIndicatorStyle:{
            backgroundColor:colors.green,
          },
          tabBarPressColor:colors.lightGreen,
          tabBarPressOpacity:0.5
        }
      }
    >
      <TopTabs.Screen name="Chat" component={ Discussions} />
      <TopTabs.Screen name="Fiches Techniques" component={FicheTech} />
      <TopTabs.Screen name="Séminaires" component={Seminaire} />
    </TopTabs.Navigator>
  )
}
export default ActTopTabs
