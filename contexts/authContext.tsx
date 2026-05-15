"use client";

import {createContext, useContext, useState, ReactNode} from "react";
import {User} from "@/lib/type";
import { loginUser, signupUser, logoutUser, getStoredUser } from "@/lib/auth";


type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children: ReactNode}) =>{
  const [user, setUser] = useState<User | null>(getStoredUser);
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try{
      const data = await loginUser(email, password);
      setUser(data.user);
    } finally{
      setLoading(false);
    }
  }

  const signup = async (name: string, email: string, password: string)=>{
    setLoading(true);
    try{
      const data = await signupUser(name, email, password);
      setUser(data.user);
    }finally{
      setLoading(false)
    }
  }
  
  const logout = () => {
    logoutUser();
    setUser(null);
  };

//get current user
return(
  <AuthContext.Provider
  value= {{
    user,
    loading,
    login,
    signup,
    logout,
  }}
  >
    {children}
    </AuthContext.Provider>
)
}

export const useAuth = () =>
  {const context =  useContext(AuthContext);

if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};