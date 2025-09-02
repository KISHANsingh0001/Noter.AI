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
// "use client";
// import { Button } from '@/components/ui/button';
// import { UserButton } from '@clerk/nextjs';
// import Image from 'next/image';
// import Link from 'next/link';
// import { Home } from 'lucide-react';
// import React from 'react';

// function WorkspaceHeader({fileName}) {
//   return (
//     <div className="p-2 sm:p-4 flex flex-wrap justify-between items-center shadow-lg sticky top-0 z-50 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
//       {/* Logo and App Name */}
//       <div className="flex items-center gap-1 mb-1 sm:mb-0">

//         <Image src="/ai.png" alt="logo" width={28} height={18} className="object-contain sm:w-[35px] sm:h-[20px]" />
//         <span className="font-bold text-sm sm:text-xl text-white">Noter.AI</span>
      
//       </div>
      
//       {/* Action Buttons */}
//       <div className='flex gap-1 sm:gap-2 items-center order-2 sm:order-3'>
//         <Link href={"/dashboard"}>
//           <Button 
//             variant="outline" 
//             size="sm"
//             className="bg-blue-500 border-gray-700 hover:bg-blue-600 text-white hover:text-white"
//           >
//             <span className="hidden sm:inline">Go to dashboard</span>
//             <Home className="sm:hidden h-4 w-4" />
//           </Button>
//         </Link>
//         <div className="bg-gray-800 rounded-full p-0.5">
//           <UserButton 
//             appearance={{
//               elements: {
//                 userButtonAvatarBox: "w-6 h-6 sm:w-8 sm:h-8"
//               }
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default WorkspaceHeader;
