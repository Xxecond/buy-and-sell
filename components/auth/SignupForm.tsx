"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/authContext";
import { Button } from "@/components/ui";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";

export default function SignupForm(){
  const {signup, loading} = useAuth();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("")
  const passwordMatch = password === confirmPassword;

  
  const handleSubmit = async (e: React.FormEvent) =>{
  e.preventDefault();
  setError("");

  if(!passwordMatch){
    setError("passwords do not match");
    return; 
  }

  try{
   await signup(name, email, password);

   window.location.href = "/dashboard";

  } catch(err: unknown){
    setError(typeof err === "string" ? err : "Login failed")
  }
  }

  return(
    <form onSubmit={handleSubmit} className="  w-5/6 flex flex-col space-y-5">

    <label className=" m-0">Name</label>
      <input 
      type="text"
       value={name}
      placeholder="Yussif Mumuni"
      onChange={(e) => setName(e.target.value)}
      className="block focus:outline-none ring-black ring focus:ring-2 p-2 rounded-lg"
      required
       />

       <label className=" m-0">Email</label>
       <input 
       type="text"
       placeholder="Mumuniyussif@gmail.com"
       value={email}
       onChange={(e) => setEmail(e.target.value.toLowerCase())}
       className="block focus:outline-none ring-black ring focus:ring-2 p-2 rounded-lg"
       required
       />
       <label className=" m-0">Password</label>
      <div aria-label="pd-section-1" className="relative">
      <input
        type={showPassword ? "text" : "password"}
        placeholder="•••••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="block focus:outline-none ring-black ring focus:ring-2 p-2 rounded-lg w-full "
        required
      />
      <button 
      onClick={() =>setShowPassword(!showPassword)}
      className="text-black absolute translate-x-1/2 right-10 top-1/2 -translate-y-1/2 ">
        {showPassword ? <EyeIcon className="w-6 h-6 md:w-8 md:h-8" />:<EyeOffIcon className="w-6 h-6 md:w-8 md:h-8"/>}
      </button>
      </div>

       <div>

        <label className=" m-0">Confirm Password</label>
      <div aria-label="pd-section-2" className="relative">
      <input
        type={showPassword ? "text" : "password"}
        placeholder="••••••••••••"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className=" block ring-black ring focus:outline-none focus:ring-2 p-2 rounded-lg w-full"
        required
      />
      <button 
      onClick={() =>setShowPassword(!showPassword)}
      className="text-black absolute translate-x-1/2 right-10 top-1/2 -translate-y-1/2 ">
        {showPassword ? <EyeIcon className="w-6 h-6 md:w-8 md:h-8" />:<EyeOffIcon className="w-6 h-6 md:w-8 md:h-8"/>}
      </button>
      </div>
        </div>
       
       <div className="flex space-x-3">
        <p className="text-xs md:text-sm">Already have an account?</p ><Link href="/auth/login" className="text-emerald-600 text-xs md:text-sm" >login</Link>
       </div>
       {error && <p className="text-red-600">{error}</p>}

      <Button 
      variant="special"
      disabled={loading}
      className="w-full"
      >{loading? "loading": "signup"}</Button>

    </form>
  )

}