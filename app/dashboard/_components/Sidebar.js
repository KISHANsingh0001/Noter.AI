// "use client";
// import React, { useState, useEffect } from "react";
// import { useUser } from "@clerk/nextjs";
// import { usePathname, useRouter } from "next/navigation";
// import { Layout, Shield, Menu, X, Sparkles } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Progress } from "@/components/ui/progress";
// import UploadPdfDialog from "./UploadPdfDialog";
// import { useQuery } from "convex/react";
// import { api } from "@/convex/_generated/api";
// import Link from "next/link";
// import Image from "next/image";
// import { createPortal } from "react-dom";

// function SideBar() {
//   const { user } = useUser();
//   const path = usePathname();
//   const router = useRouter();
//   const [isMobile, setIsMobile] = useState(false);
//   const [open, setOpen] = useState(false);
//   const fileList = useQuery(api.fileStorage.GetUserFiles, {
//     userEmail: user?.primaryEmailAddress?.emailAddress,
//   });

//   // Detect mobile
//   useEffect(() => {
//     const handler = () => setIsMobile(window.innerWidth < 768);
//     handler();
//     window.addEventListener("resize", handler);
//     return () => window.removeEventListener("resize", handler);
//   }, []);

//   // Preventing body scroll when sidebar open
//   useEffect(() => {
//     if (open) document.body.classList.add("overflow-hidden");
//     else document.body.classList.remove("overflow-hidden");
//   }, [open]);

//   const nav = [
//     { path: "/dashboard", label: "Workspace", icon: <Layout className="h-5 w-5" /> },
//     { path: "/dashboard/upgrade", label: "Upgrade", icon: <Shield className="h-5 w-5" /> },
//   ];

//   const goUpgrade = () => {
//     router.push("/dashboard/upgrade");
//     setOpen(false);
//   };



//   const Content = (
//     <>
//       <div className="flex items-center justify-between">
//         <Image src="/logo.svg" alt="logo" width={145} height={40} />
//         {isMobile && (
//           <button onClick={() => setOpen(false)} aria-label="Close">
//             <X className="h-6 w-6" />
//           </button>
//         )}
//       </div>

//       <div className="mt-6">
//         <UploadPdfDialog isMaxFile={(fileList?.length || 0) <= 5}>
//           <Button className="w-full">+ Upload PDF File</Button>
//         </UploadPdfDialog>

//         <nav className="mt-5 space-y-1">
//           {nav.map(n => (
//             <Link
//               key={n.path}
//               href={n.path}
//               onClick={() => setOpen(false)}
//               className={`flex items-center gap-2 p-3 rounded-lg text-sm hover:bg-slate-100 ${
//                 path === n.path ? "bg-slate-200 font-medium" : ""
//               }`}
//             >
//               {n.icon}
//               {n.label}
//             </Link>
//           ))}
//         </nav>

//         <div className="mt-6">
//           <Progress value={((fileList?.length || 0) / 5) * 100} className="h-2" />
//           <p className="text-xs mt-1">
//             {fileList?.length || 0} of 5 PDFs Uploaded
//           </p>
//           <p className="text-xs text-gray-400 mt-1">Upgrade to upload more</p>
//         </div>

     
//       </div>
//     </>
//   );

//   // Desktop
//   const Desktop = (
//     <aside className="hidden md:flex flex-col w-64 h-screen shadow-md p-6 overflow-y-auto">
//       {Content}
//     </aside>
//   );

//   // Mobile portal overlay (ensures it sits ABOVE page content)
//   const MobileOverlay =
//     isMobile &&
//     createPortal(
//       <div
//         className={`fixed inset-0 z-[100] transition-opacity ${
//           open ? "opacity-100" : "opacity-0 pointer-events-none"
//         }`}
//       >
//         <div
//           className="absolute inset-0 bg-black/50"
//           onClick={() => setOpen(false)}
//         />
//         <div
//           className={`absolute top-0 left-0 h-full w-72 bg-white shadow-xl transform transition-transform duration-300 ${
//             open ? "translate-x-0" : "-translate-x-full"
//           } p-5 overflow-y-auto`}
//         >
//           {Content}
//         </div>
//       </div>,
//       document.body
//     );

//   return (
//     <>
//       {Desktop}
//       {MobileOverlay}
//       {isMobile && !open && (
//         <button
//           onClick={() => setOpen(true)}
//             aria-label="Open menu"
//           className="fixed bottom-4 right-4 z-[90] bg-blue-600 text-white p-3 rounded-full shadow-lg"
//         >
//           <Menu className="h-6 w-6" />
//         </button>
//       )}
//     </>
//   );
// }

// export default SideBar;

// "use client";
// import React, { useState, useEffect } from "react";
// import { useUser } from "@clerk/nextjs";
// import { usePathname, useRouter } from "next/navigation";
// import { Layout, Shield, Menu, X, Sparkles } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Progress } from "@/components/ui/progress";
// import UploadPdfDialog from "./UploadPdfDialog";
// import { useQuery } from "convex/react";
// import { api } from "@/convex/_generated/api";
// import Link from "next/link";
// import Image from "next/image";
// import { createPortal } from "react-dom";

// function SideBar() {
//   const { user } = useUser();
//   const path = usePathname();
//   const router = useRouter();
//   const [isMobile, setIsMobile] = useState(false);
//   const [open, setOpen] = useState(false);
//   const fileList = useQuery(api.fileStorage.GetUserFiles, {
//     userEmail: user?.primaryEmailAddress?.emailAddress,
//   });
  
//   const GetUserInfo = useQuery(api.user.GetUserInfo,{
//     userEmail:user?.primaryEmailAddress?.emailAddress
//   })
//   console.log("UserInfo",GetUserInfo);
  
//   // Calculate if max files reached - make sure it's a boolean
//   const isMaxFilesReached = (fileList?.length >= 5 && !GetUserInfo?.upgrade);

//   // Detect mobile
//   useEffect(() => {
//     const handler = () => setIsMobile(window.innerWidth < 768);
//     handler();
//     window.addEventListener("resize", handler);
//     return () => window.removeEventListener("resize", handler);
//   }, []);

//   // Preventing body scroll when sidebar open
//   useEffect(() => {
//     if (open) document.body.classList.add("overflow-hidden");
//     else document.body.classList.remove("overflow-hidden");
//   }, [open]);

//   const nav = [
//     { path: "/dashboard", label: "Workspace", icon: <Layout className="h-5 w-5" /> },
//     { path: "/dashboard/upgrade", label: "Upgrade", icon: <Shield className="h-5 w-5" /> },
//   ];

//   const goUpgrade = () => {
//     router.push("/dashboard/upgrade");
//     setOpen(false);
//   };

//   // Usage stats/progress bar component for reuse
//   const UsageStats = (
//   <div className="mt-auto pt-4 border-t border-gray-200">
//     {GetUserInfo?.upgrade ? (
//       // Premium user stats
//       <div>
//         <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
//           <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 w-full"></div>
//         </div>
//         <div className="flex items-center justify-between mt-1">
//           <p className="text-xs font-medium text-blue-700">
//             Premium Plan
//           </p>
//           <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
//             Unlimited
//           </span>
//         </div>
//       </div>
//     ) : (
//       // Free user stats
//       <>
//         <Progress value={((fileList?.length || 0) / 5) * 100} className="h-2" />
//         <div className="flex items-center justify-between mt-1">
//           <p className="text-xs">
//             {fileList?.length || 0} of 5 PDFs
//           </p>
//           <Link 
//             href="/dashboard/upgrade" 
//             onClick={() => setOpen(false)}
//             className="text-xs text-blue-600 hover:underline"
//           >
//             Upgrade
//           </Link>
//         </div>
//       </>
//     )}
//   </div>
// );

//   const Content = (
//     <div className="flex flex-col h-full">
//       <div className="flex items-center justify-between w-full">
//   <div className="flex items-center gap-2">
//     <Image src="/ai.png" alt="logo" width={65} height={40} className="object-contain" />
//     <span className="font-bold text-2xl text-black ">Noter.AI</span>
//   </div>
//   {isMobile && (
//     <button onClick={() => setOpen(false)} aria-label="Close">
//       <X className="h-6 w-6" />
//     </button>
//   )}
// </div>

//       <div className="mt-6 flex-1 flex flex-col">
//         <div>
//           {/* Pass isMaxFile prop correctly and provide a custom button */}
//           <UploadPdfDialog isMaxFile={isMaxFilesReached}>
//             <Button 
//               className="w-full" 
//               disabled={isMaxFilesReached}
//               variant={isMaxFilesReached ? "outline" : "default"}
//             >
//               {isMaxFilesReached ? 'Limit Reached' : '+ Upload PDF File'}
//             </Button>
//           </UploadPdfDialog>

//           <nav className="mt-5 space-y-1">
//             {nav.map(n => (
//               <Link
//                 key={n.path}
//                 href={n.path}
//                 onClick={() => setOpen(false)}
//                 className={`flex items-center gap-2 p-3 rounded-lg text-sm hover:bg-slate-100 ${
//                   path === n.path ? "bg-slate-200 font-medium" : ""
//                 }`}
//               >
//                 {n.icon}
//                 {n.label}
//               </Link>
//             ))}
//           </nav>
//         </div>
        
//         {/* Flexible spacer to push progress bar to bottom */}
//         <div className="flex-1"></div>
        
//         {/* Progress bar at bottom */}
//         {UsageStats}
//       </div>
//     </div>
//   );

//   // Desktop
//   const Desktop = (
//     <aside className="hidden md:flex flex-col w-64 h-screen shadow-md p-6 overflow-y-auto">
//       {Content}
//     </aside>
//   );

//   // Mobile portal overlay (ensures it sits ABOVE page content)
//   const MobileOverlay =
//     isMobile &&
//     createPortal(
//       <div
//         className={`fixed inset-0 z-[100] transition-opacity ${
//           open ? "opacity-100" : "opacity-0 pointer-events-none"
//         }`}
//       >
//         <div
//           className="absolute inset-0 bg-black/50"
//           onClick={() => setOpen(false)}
//         />
//         <div
//           className={`absolute top-0 left-0 h-full w-72 bg-white shadow-xl transform transition-transform duration-300 ${
//             open ? "translate-x-0" : "-translate-x-full"
//           } p-5 overflow-y-auto`}
//         >
//           {Content}
//         </div>
//       </div>,
//       document.body
//     );

//   return (
//     <>
//       {Desktop}
//       {MobileOverlay}
//       {isMobile && !open && (
//         <button
//           onClick={() => setOpen(true)}
//           aria-label="Open menu"
//           className="fixed bottom-4 right-4 z-[90] bg-blue-600 text-white p-3 rounded-full shadow-lg"
//         >
//           <Menu className="h-6 w-6" />
//         </button>
//       )}
//     </>
//   );
// }

// export default SideBar;

"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { Layout, Shield, Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import UploadPdfDialog from "./UploadPdfDialog";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import Image from "next/image";
import { createPortal } from "react-dom";

function SideBar() {
  const { user } = useUser();
  const path = usePathname();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(false);
  const fileList = useQuery(api.fileStorage.GetUserFiles, {
    userEmail: user?.primaryEmailAddress?.emailAddress,
  });
  
  const GetUserInfo = useQuery(api.user.GetUserInfo,{
    userEmail:user?.primaryEmailAddress?.emailAddress
  })
  console.log("UserInfo",GetUserInfo);
  
  // Calculate if max files reached - make sure it's a boolean
  const isMaxFilesReached = (fileList?.length >= 5 && !GetUserInfo?.upgrade);

  // Detect mobile
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    handler();
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  // Preventing body scroll when sidebar open
  useEffect(() => {
    if (open) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
  }, [open]);

  const nav = [
    { path: "/dashboard", label: "Workspace", icon: <Layout className="h-5 w-5" /> },
    // { path: "/dashboard/upgrade", label: "Upgrade", icon: <Shield className="h-5 w-5" /> },
  ];

  const goUpgrade = () => {
    router.push("/dashboard/upgrade");
    setOpen(false);
  };
   // Function to close sidebar
  const closeSidebar = () => {
    if (isMobile) {
      setOpen(false);
    }
  };

  // Usage stats/progress bar component for reuse
  const UsageStats = (
    <div className="mt-auto pt-4 border-t border-gray-700/30">
      {GetUserInfo?.upgrade ? (
        // Premium user stats
        <div>
          <div className="h-2 bg-gray-700/20 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 w-full"></div>
          </div>
          <div className="flex items-center justify-between mt-1">
            <p className="text-xs font-medium text-blue-400">
              Premium Plan
            </p>
            <span className="text-xs bg-blue-900/20 text-blue-400 px-2 py-0.5 rounded-full">
              Unlimited
            </span>
          </div>
        </div>
      ) : (
        // Free user stats
        <>
          <Progress 
            value={((fileList?.length || 0) / 5) * 100} 
            className="h-2 bg-gray-700/20 [&>div]:bg-blue-600" 
          />
          <div className="flex items-center justify-between mt-1">
            <p className="text-xs text-gray-300">
              {fileList?.length || 0} of 5 PDFs
            </p>
            <Link 
              href="/dashboard/upgrade" 
              onClick={() => setOpen(false)}
              className="text-xs text-blue-400 hover:text-blue-300"
            >
              Upgrade
            </Link>
          </div>
        </>
      )}
    </div>
  );

  const Content = (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between w-full">
        <Link href={"/"}>
        <div className="flex items-center gap-2">
          <Image src="/ai.png" alt="logo" width={65} height={40} className="object-contain" />
          <span className="font-bold text-2xl text-gray-100">Noter.AI</span>
        </div>
        </Link>
        {isMobile && (
          <button onClick={() => setOpen(false)} aria-label="Close" className="text-gray-300 hover:text-white">
            <X className="h-6 w-6" />
          </button>
        )}
      </div>

      <div className="mt-6 flex-1 flex flex-col">
        <div>
          {/* Pass isMaxFile prop correctly and provide a custom button */}
          <UploadPdfDialog isMaxFile={isMaxFilesReached}
          onDialogOpen={closeSidebar}
          >
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white" 
              disabled={isMaxFilesReached}
              variant={isMaxFilesReached ? "outline" : "default"}
            >
              {isMaxFilesReached ? 'Limit Reached' : '+ Upload PDF File'}
            </Button>
          </UploadPdfDialog>

          <nav className="mt-5 space-y-1">
            {nav.map(n => (
              <Link
                key={n.path}
                href={n.path}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2 p-3 rounded-lg text-sm hover:bg-blue-600/75 text-gray-300 ${
                  path === n.path ? "bg-blue-600/75 text-white font-medium" : ""
                }`}
              >
                {n.icon}
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
        
        {/* Flexible spacer to push progress bar to bottom */}
        <div className="flex-1"></div>
        
        {/* Progress bar at bottom */}
        {UsageStats}
      </div>
    </div>
  );

  // Desktop
  const Desktop = (
    <aside className="hidden md:flex flex-col w-64 h-screen shadow-md p-6 overflow-y-auto bg-gradient-to-b from-gray-900 via-gray-850 to-gray-800 border">
      {Content}
    </aside>
  );

  // Mobile portal overlay (ensures it sits ABOVE page content)
  const MobileOverlay =
    isMobile &&
    createPortal(
      <div
        className={`fixed inset-0 z-[100] transition-opacity ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/70"
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute top-0 left-0 h-full w-72 bg-gradient-to-b from-gray-900 via-gray-850 to-gray-800 shadow-xl transform transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-full"
          } p-5 overflow-y-auto`}
        >
          {Content}
        </div>
      </div>,
      document.body
    );

  return (
    <>
      {Desktop}
      {MobileOverlay}
      {isMobile && !open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="fixed bottom-4 right-4 z-[90] bg-blue-600 text-white p-3 rounded-full shadow-lg"
        >
          <Menu className="h-6 w-6" />
        </button>
      )}
    </>
  );
}

export default SideBar;