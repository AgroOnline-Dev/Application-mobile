import React, {createContext,useState} from "react";

export const AuthContext=createContext();


export const AuthProvider=({children})=>{
    
    const [isLoading,setIsLoading]=useState(false);
    const [userToken,setUserToken]=useState(null);
    
    const logIn=()=>{
        setIsLoading(false)
        setUserToken('aesrgtry');
    }
    const logOut=()=>{
        setUserToken(null);
        setIsLoading(false);
    }
    return(
        <AuthContext.Provider value={{logIn,logOut,isLoading,userToken}}>
            {children}
        </AuthContext.Provider>
    )
}
