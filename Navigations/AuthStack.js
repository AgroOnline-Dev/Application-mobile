import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Importations des interfaces
import CreerCompte from '../Interfaces/CreerCompte';
import Connexion from '../Interfaces/Connexion'
import Ingenieurs from '../Interfaces/Ingenieurs'
import CustomDrawer from '../Composants/CustomDrawer';
import DrawerNav from './DrawerNav'
import Profil from '../Interfaces/Profil'
import Suggestions from '../Interfaces/Suggestions';
import ActTopTabs from './ActTopTabs';
import SpaceVisio from '../Interfaces/SpaceVisio';
import TestStack from './TestStack';
 

const Stack = createNativeStackNavigator()

const StackNav = () => {
    return(
        <Stack.Navigator 
            screenOptions={{headerShown:false}}
        >
            <Stack.Screen name="Connexion" component={Connexion} />
            <Stack.Screen name="Inscription" component={CreerCompte} />
            <Stack.Screen name="Ingenieurs" component={Ingenieurs} />
            <Stack.Screen name="home" component={DrawerNav} />
            <Stack.Screen name="ActTop" component={ActTopTabs} />
            <Stack.Screen name="ActTo" component={TestStack} />
            <Stack.Screen name="Profil" component={Profil} />
            <Stack.Screen name="Suggestions" component={Suggestions} />
            <Stack.Screen name="Semi" component={SpaceVisio} />
        </Stack.Navigator>
      )
}

export default StackNav