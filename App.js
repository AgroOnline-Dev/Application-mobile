import 'react-native-gesture-handler'; 

import React from 'react';
import { AuthProvider } from './context/AuthContext';
import AppNav from './Navigations/AppNav';

 

export default function App () {
  
    return (
       <AuthProvider>
        <AppNav />
       </AuthProvider>
    )
 
}

 
