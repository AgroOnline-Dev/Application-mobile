import React from 'react'
 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
 

//Importations des interfaces
import Discussions from '../Interfaces/Discussions';
import Ingenieurs from '../Interfaces/Ingenieurs';
import ActTopTabs from './ActTopTabs';
import HeaderApp from '../Composants/HeaderApp';

const Stack = createNativeStackNavigator()

const AppStack = ({navigation}) => {
    return(
        <Stack.Navigator 
            screenOptions={{
                //header: (navigation)=><HeaderApp navigation={navigation}/>
                headerShown:false
            }}
        > 
            <Stack.Screen name="Ingenieurs" component={Ingenieurs}/>
            <Stack.Screen name="Act" component={ActTopTabs}/>
        </Stack.Navigator>
      )
}
export default AppStack