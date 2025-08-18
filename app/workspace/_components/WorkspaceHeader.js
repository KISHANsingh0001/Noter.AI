"use client";
import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function WorkspaceHeader({fileName}) {
  return (
    <div className="p-4 flex justify-between items-center shadow-lg bg-white sticky top-0 z-50 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
      <div className="flex items-center gap-1">
          <Image src="/ai.png" alt="logo" width={35} height={20} className="object-contain" />
          <span className="font-bold text-xl text-black text-white">Noter.AI</span>
        </div>
      <h2 className='font-bold text-xl text-white'>{fileName}</h2>
      <div className='flex gap-2 items-center'>
       <Link href={"/dashboard"}>
        <Button 
          variant="outline" 
          className="bg-blue-500 border-gray-700 hover:bg-blue-600 text-white hover:text-white"
        >
         Go to dashboard
        </Button>
       </Link>
        <div className="bg-gray-800 rounded-full p-0.5">
          <UserButton 
            appearance={{
              elements: {
                userButtonAvatarBox: "w-8 h-8"
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default WorkspaceHeader;
