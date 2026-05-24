"use client";
import { Button } from "@/components/ui";
import { useAuth } from "@/contexts/authContext";
import { useState } from "react";

export default function  Dashboard (){
    const {logout, user} = useAuth();
    const [error, setError] = useState("");
    const firstName = user?.name?.trim().split(" ")[0] || [" "]

 const handleLogout = async () =>{
    setError("")
      try{
    await logout();
    window.location.href = "/auth/login"
 } catch(err: unknown){
    setError(typeof err === "string" ? err: "logout failed")
    

 }}

    return(
        <>
        <div className="flex items-center justify-center h-screen w-full bg-green-900">
         <div><h1>{`hello ${firstName} how are you`}</h1></div>
           {error && <p>{error}</p>}
            <Button 
            onClick={handleLogout}
            className=" bg-blue-500">logout</Button>
        </div>
        </>
    )


}