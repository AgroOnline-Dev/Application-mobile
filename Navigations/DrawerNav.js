import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';
//IMPORTATION DES COMPOSANTS
import BottomTabs from './BottomTabs';
import CustomDrawer from '../Composants/CustomDrawer';
 
import Profil from '../Interfaces/Profil';
import Suggestions from '../Interfaces/Suggestions';
import colors from '../Constantes/constants';
import { Image } from 'react-native';
 
const Drawer=createDrawerNavigator();

const DrawerNav = ({navigation}) => {
    
    return (
            <Drawer.Navigator
                drawerContent={(props)=><CustomDrawer {...props}/>}
                screenOptions={
                    { 
                    headerShown:false,
                    headerTintColor:colors.green,
                    headerStatusBarHeight:40,
                    headerStyle:{
                        backgroundColor:colors.whiteBlue,
                        shadowOpacity:0,
                        elevation:0,
                    },
                    headerTitle:'',
                    headerRight: ()=>
                        <Image source={require('../assets/logo.png')}  
                        style={{
                            width:'17%',
                            height:'110%',
                            padding:20,
                            marginBottom:5,
                            marginTop:30,
                            marginRight:40
                        }}  
                        />
                    ,
                    drawerLabelStyle:{
                        marginLeft:-23,
                        fontSize:15
                    },
                    drawerActiveTintColor:colors.green,
                }}
                >
                <Drawer.Screen name="Accueil" component={BottomTabs} options={{
                    drawerIcon : ({color})=> <Ionicons name="home-sharp" size={26} color={color} />
                }} 
                />
                <Drawer.Screen name="Profil" component={ Profil} options={{
                    drawerIcon : ({color})=> <Ionicons name="person" size={26} color={color}/>
                }} 
                />
                <Drawer.Screen name="Suggestions" component={ Suggestions } options={{            
                    drawerIcon : ({color})=> <MaterialCommunityIcons name="sticker-text"size={26} color={color}/>
                }} 
                />
            </Drawer.Navigator>
    );
}

export default DrawerNav