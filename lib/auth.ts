import api from "./api";
import {User, LoginResponse} from "./type"


const isClient = typeof window !== "undefined";

export const loginUser = async (email: string, password: string) =>{
    try{
    const login = await api.post<LoginResponse>("/api/users/login", 
        {email, password}
    )
    const {token, user} = login.data
    saveAuth(token, user)


    return login.data
    }
    catch(error: unknown){
        console.error("Login error", error);
        const err = error as {response?: {data?: {error?: string}}};
        throw err?.response?.data?.error || "Login failed";
    }
}

export const signupUser = async (name: string, email: string, password: string) =>{
    try{
    const signup = await api.post<LoginResponse>("/users/signup", 
        {name, email, password}
    )
    const {token, user} = signup.data;

    saveAuth(token, user)

    return signup.data;
}
    catch(error: unknown){
        console.error("signup error", error);
        const err = error as {response?: {data?: {error?: string}}};
        throw err?.response?.data?.error || "signup failed";
    }
};

export const saveAuth = (token: string, user: User) =>{
    if(!isClient) return;

    try{
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
}
catch(error){
    console.log("failed to save auth", error);
  }
}

export const logoutUser =() =>{
    if (!isClient) return;

    localStorage.removeItem("token");
    localStorage.removeItem("user");
}

export const getStoredUser = (): User | null => {
    if (!isClient) return null;
    try{

    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
    } catch{
        localStorage.removeItem("user");
        return null;
    }}

