import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ActTopTabs from './ActTopTabs';
import HeaderApp2 from '../Composants/HeaderApp2';
import colors from '../Constantes/constants';

const Stack = createNativeStackNavigator()

const TestStack = ({navigation}) => {
  return (
    <Stack.Navigator 
            screenOptions={{
              headerStyle:{
                backgroundColor:colors.whiteBlue,
              },
              headerBackVisible:false,
              //headerTitle: ()=><HeaderApp navigation={navigation}/>,
              header: (navigation)=><HeaderApp2 navigation={navigation}/>,
              headerStyle:{
                backgroundColor:colors.whiteBlue,
                shadowOpacity:0,
                elevation:0,
            },
            }}
        > 
            <Stack.Screen name="Act" component={ActTopTabs}/>
        </Stack.Navigator>
  )
}

export default TestStack