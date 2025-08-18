'use client'
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect } from "react";
import LandingPage from "./LandingPage";


export default function Home() {
  const {user} = useUser();
  const creatUser = useMutation(api.user.createUser);
  
  const CheckUser = async()=>{
    const result = await creatUser({
      email:user?.primaryEmailAddress?.emailAddress,
      imageUrl:user?.imageUrl,
      userName:user?.fullName
    })
  }
   useEffect(()=>{
     user&&CheckUser()
   },[user]);
  return (
    <div className="h-screen overflow-auto">
      <LandingPage/>
    </div>
  );
}
