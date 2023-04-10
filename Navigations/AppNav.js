import React, { useContext } from 'react';
import{View,ActivityIndicator}from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import DrawerNav from './DrawerNav';
 import AuthStack from './AuthStack'
import { AuthContext } from '../context/AuthContext';
 
const AppNav = () => {

    const {isLoading,userToken}=useContext(AuthContext);

    //Verification de la valeur de isLoading pour afficher une icone de chargement
    if (isLoading){
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator size={'large'} />
            </View>
        )
    }

  return (
    <NavigationContainer>
        <AuthStack/> 
        {/* userToken !==null ? <DrawerNav/>:<AuthStack/> */ }
    </NavigationContainer>
  )
}

export default AppNav