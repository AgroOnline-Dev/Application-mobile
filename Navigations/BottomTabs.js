import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons,FontAwesome5 } from '@expo/vector-icons';
import Commerce from '../Interfaces/AutresModules/Commerce'
import Investissement from '../Interfaces/AutresModules/Investissement'

import colors from '../Constantes/constants';
import AppStack from './AppStack';

const Tabs=createBottomTabNavigator();

const BottomTabs = () => {
  return (
     <Tabs.Navigator
      screenOptions=
      {{
        headerShown:false,
        tabBarShowLabel:false,
        tabBarActiveTintColor:colors.green,
      }}
     >
        <Tabs.Screen
         name='E-Commerce' component={Commerce} 
         options={ 
            {
                tabBarIcon:  ({color})=> <MaterialCommunityIcons name="cart-variant" color={color} size={35} />
            } 
        }/>
        
        <Tabs.Screen
         name='Investissement' component={Investissement} 
         options={ 
            {
                tabBarIcon:  ({color})=> <FontAwesome5 name="coins" color={color} size={30}/>
            }
        }/>

        <Tabs.Screen name='ACT' component={AppStack} 
            options={ 
                {
                    tabBarIcon:  ({color})=> <MaterialCommunityIcons name="account-child" color={color} size={40} />
                }
            }
        />
     </Tabs.Navigator>
  )
}
export default BottomTabs