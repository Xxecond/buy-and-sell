"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/authContext";
import { Button } from "@/components/ui";

export default function SignupForm(){
  const {signup, loading} = useAuth();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")

  
  const handleSubmit = async (e: React.FormEvent) =>{
  e.preventDefault();
  setError("");

  try{
   await signup(name, email, password);

   window.location.href = "/dashboard";

  } catch(err: unknown){
    setError(typeof err === "string" ? err : "Login failed")
  }
  }

  return(
    <form onSubmit={handleSubmit} className="  w-5/6 flex flex-col  space-y-5">

      <input 
      type="text"
       value={name}
      placeholder="Enter Name"
      onChange={(e) => setName(e.target.value)}
      className="ring-black ring focus:ring-2 p-3"
      required
       />

       <input 
       type="text"
       placeholder="enter email"
       value={email}
       onChange={(e) => setEmail(e.target.value)}
       className="ring-black ring focus:ring-2 p-3"
       required
       />

       <input
       type="password"
       placeholder="enter password"
       value={password}
       onChange={(e)=> setPassword(e.target.value)}
       className="ring-black ring focus:ring-2 p-3"
       required
       />

       {error && <p>{error}</p>}

      <Button 
      variant="special"
      disabled={loading}
      className="w-full"
      >{loading? "loading": "signup"}</Button>

    </form>
  )

}