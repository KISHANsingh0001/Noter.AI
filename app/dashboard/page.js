// "use client";
// import { api } from "@/convex/_generated/api";
// import { useUser } from "@clerk/nextjs";
// import { useQuery } from "convex/react";
// import Image from "next/image";
// import Link from "next/link";

// export default function Dashboard() {
//   const { user } = useUser();

//   const fileList = useQuery(api.fileStorage.GetUserFiles, {
//     userEmail: user?.primaryEmailAddress?.emailAddress,
//   });
//   console.log(fileList);

//   return (
//     <div className="p-7 ">
//       <h2 className="font-medium text-3xl"> Workspace</h2>
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-10">
//         {fileList?.length > 0
//           ? fileList?.map((file, index) => (
//               <Link href={"/workspace/" + file.fileId} key={index}>
//                 <div
//                   key={index}
//                   className="flex p-5 shadow-md rounded-md flex-col items-center justify-center border cursor-pointer hover:scale-105 transition-all hover:bg-gray-100"
//                 >
//                   <Image src={"/pdf.png"} alt="file" width={50} height={70} />
//                   <h2 className="mt-3 text-lg font-medium">{file?.fileName}</h2>
//                 </div>
//               </Link>
//             ))
//           : [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
//               <div
//                 className="bg-slate-200 rounded-md h-[150px] animate-pulse"
//                 key={index}
//               ></div>
//             ))}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { api } from "@/convex/_generated/api";
// import { useUser } from "@clerk/nextjs";
// import { useQuery } from "convex/react";
// import Image from "next/image";
// import Link from "next/link";

// export default function Dashboard() {
//   const { user } = useUser();

//   const fileList = useQuery(api.fileStorage.GetUserFiles, {
//     userEmail: user?.primaryEmailAddress?.emailAddress,
//   });

//   return (
//     <div className="p-7 h-[calc(100vh-73px)] overflow-auto bg-gradient-to-br from-gray-900 via-gray-850 to-gray-800 text-gray-100">
//       <h2 className="font-medium text-3xl text-white top-0 z-10 py-2 bg-gradient-to-br from-gray-900 via-gray-850 to-gray-800">Workspace</h2>
      
//       <div className="mt-6">
//         {fileList?.length > 0 ? (
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 pb-8">
//             {fileList.map((file, index) => (
//               <Link href={"/workspace/" + file.fileId} key={index}>
//                 <div
//                   className="flex p-5 shadow-md rounded-md flex-col items-center justify-center border border-gray-700 bg-gray-800/50 cursor-pointer hover:scale-105 transition-all hover:bg-gray-700/70"
//                 >
//                   <div className="relative">
//                     <Image src={"/pdf.png"} alt="file" width={50} height={70} />
//                     <div className="absolute inset-0 bg-blue-500/10 rounded-sm"></div>
//                   </div>
//                   <h2 className="mt-3 text-lg font-medium text-gray-200 truncate w-full text-center">{file?.fileName}</h2>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         ) : fileList === undefined ? (
//           // Loading state
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
//             {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
//               <div
//                 className="bg-gray-700/40 rounded-md h-[150px] animate-pulse"
//                 key={index}
//               ></div>
//             ))}
//           </div>
//         ) : (
//           // Empty state
//           <div className="flex flex-col items-center justify-center mt-10 p-6 rounded-lg bg-gray-800/30 border border-gray-700/50">
//             <Image 
//               src="/pdf.png" 
//               alt="No files" 
//               width={80} 
//               height={100} 
//               className="opacity-40 mb-4"
//             />
//             <h3 className="text-xl font-medium text-gray-300">No PDF files yet</h3>
//             <p className="text-gray-400 mt-2 text-center max-w-md">
//               Upload your first PDF file to get started with Noter.AI
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import DeleteFileButton from "./_components/DeleteFile";

export default function Dashboard() {
  const { user } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  const fileList = useQuery(api.fileStorage.GetUserFiles, {
    userEmail
  });
  
  const GetUserInfo = useQuery(api.user.GetUserInfo, {
    userEmail
  });
  
  const isPremium = GetUserInfo?.upgrade || false;

  return (
    <div className="p-7 h-[calc(100vh-73px)] overflow-auto bg-gradient-to-br from-gray-900 via-gray-850 to-gray-800 text-gray-100">
      <h2 className="font-medium text-3xl text-white top-0 z-10 py-2 bg-gradient-to-br from-gray-900 via-gray-850 to-gray-800">Workspace</h2>
      
      <div className="mt-6">
        {fileList?.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 pb-8">
            {fileList.map((file, index) => (
              <div key={index} className="relative group">
                <Link href={"/workspace/" + file.fileId}>
                  <div
                    className="flex p-5 shadow-md rounded-md flex-col items-center justify-center border border-gray-700 bg-gray-800/50 cursor-pointer hover:scale-105 transition-all hover:bg-gray-700/70"
                  >
                    <div className="relative">
                      <Image src={"/pdf.png"} alt="file" width={50} height={70} />
                      <div className="absolute inset-0 bg-blue-500/10 rounded-sm"></div>
                    </div>
                    <h2 className="mt-3 text-lg font-medium text-gray-200 truncate w-full text-center">{file?.fileName}</h2>
                  </div>
                </Link>
                
                {/* Delete button - positioned in top-right corner */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <DeleteFileButton 
                    fileId={file.fileId}
                    fileName={file.fileName}
                    userEmail={userEmail}
                    isPremium={isPremium}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : fileList === undefined ? (
          // Loading state
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
              <div
                className="bg-gray-700/40 rounded-md h-[150px] animate-pulse"
                key={index}
              ></div>
            ))}
          </div>
        ) : (
          // Empty state
          <div className="flex flex-col items-center justify-center mt-10 p-6 rounded-lg bg-gray-800/30 border border-gray-700/50">
            <Image 
              src="/pdf.png" 
              alt="No files" 
              width={80} 
              height={100} 
              className="opacity-40 mb-4"
            />
            <h3 className="text-xl font-medium text-gray-300">No PDF files yet</h3>
            <p className="text-gray-400 mt-2 text-center max-w-md">
              Upload your first PDF file to get started with Noter.AI
            </p>
          </div>
        )}
      </div>
    </div>
  );
}