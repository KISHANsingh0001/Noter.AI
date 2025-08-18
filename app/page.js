'use client'
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect } from "react";
import LandingPage from "./LandingPage";


export default function Home() {
  
  return (
    <div className="h-screen overflow-auto">
      <LandingPage/>
    </div>
  );
}
