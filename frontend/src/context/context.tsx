import { createContext, useContext, useState, Dispatch, SetStateAction, ReactNode, useMemo, useEffect } from "react";


interface AuthContextType {
  accessToken: string;
  setAccessToken: Dispatch<SetStateAction<string>>;
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider = ({children}: {children: ReactNode}) => {
    const [accessToken, setAccessToken] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(()=>{
        if(accessToken){
            setIsLoggedIn(true);
        }
        else setIsLoggedIn(false);

    },[accessToken]);

    const value  = useMemo(()=>({accessToken, setAccessToken, isLoggedIn, setIsLoggedIn}),[accessToken, isLoggedIn]);

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    const context =  useContext(AuthContext);
    if(!context){
        throw new Error("useAuthContext must be within AuthProvider");
    }
    return context;
}