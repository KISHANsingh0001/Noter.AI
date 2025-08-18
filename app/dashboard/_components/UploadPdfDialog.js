// "use client"
// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { DialogClose } from "@radix-ui/react-dialog";
// import { useAction, useMutation } from "convex/react";
// import { api } from "@/convex/_generated/api";
// import { Loader2Icon } from "lucide-react";
// import uuid4 from "uuid4";
// import { useUser } from "@clerk/nextjs";
// import axios from "axios";
// import { toast } from "sonner";

// function UploadPdfDialog({ children , isMaxFile }) {
//   // creates a function generates secure temporary upload URL for direct browser-to-storage file uploads.
//   const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);

//   const AddFileEntry = useMutation(api.fileStorage.AddFileEntryToDb);
//   const [file, setFile] = useState();
//   const getFileUrl = useMutation(api.fileStorage.gerFileUrl);
//   const {user} = useUser();
//   const [fileName , setFileName] = useState();
//   const [loading, setLoading] = useState(false);
//   const [open , setOpen] = useState(false);

//   const embeddDocument=useAction(api.myAction.ingest);

//   const OnFileSelect = (event) => {
//     setFile(event.target.files[0]);
//   };
//   const OnUpload = async() => {
//      setLoading(true);

//      // Step 1: Get a short-lived upload URL
//     const postUrl = await generateUploadUrl();
 
//      // Step 2: POST the file to the URL
//     const result = await fetch(postUrl, {
//       method: "POST",
//       headers: { "Content-Type": file?.type },
//       body: file,
//     });

//     const { storageId } = await result.json();
//     console.log('StorageId',storageId);

//     const fileId = uuid4();

//     const fileUrl = await getFileUrl({storageId:storageId});

//     // Step 3: Save the newly allocated storage id to the database
//     const resp = await AddFileEntry({
//         fileId:fileId,
//         storageId:storageId,
//         fileName:fileName??"untitled File",
//         fileUrl:fileUrl,
//         createdBy:user?.primaryEmailAddress?.emailAddress
//     })
//     console.log(resp);

//     // API Call To Fetch PDF Process DATA
//     const ApiResp = await axios.get(`/api/pdf-loader?pdfUrl=${fileUrl}`);
//     console.log(ApiResp.data.result);

//     await embeddDocument({
//       splitText:ApiResp.data.result,
//       fileId:fileId
//     });
   
    
//     setLoading(false);
//     setOpen(false);
//     toast("Pdf Uploaded Successfully...");

//   };
//   return (
//     <Dialog open={open}>
//       <DialogTrigger asChild>
//         <Button onClick={()=>setOpen(true)} className='w-full' disabled={isMaxFile}>+ Upload PDF FIle</Button>
//         </DialogTrigger>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Upload Pdf File</DialogTitle>
//           <DialogDescription asChild>
//             <div className="">
//               <h2 className="mt-5">Select a File to Upload</h2>
//               <div className="flex  gap-2 p-3 rounded-md border">
//                 <Input type="file" accept=".pdf" onChange={OnFileSelect} />
//               </div>
//               <div className="mt-2">
//                 <label htmlFor="Name">File Name</label>
//                 <Input id="Name" type="text" onChange={(e)=>setFileName(e.target.value)} />
//               </div>
//             </div>
//           </DialogDescription>
//         </DialogHeader>
//         <DialogFooter className="sm:justify-end">
//           <DialogClose>
//             <Button type="button" variant="secondary">
//               Close
//             </Button>
//           </DialogClose>
//           <Button type="button" onClick={OnUpload} disabled={loading}>
//             {loading ? <Loader2Icon className="animate-spin"/> : 'Upload'}
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }

// export default UploadPdfDialog;
"use client"
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader2Icon, AlertCircle } from "lucide-react";
import uuid4 from "uuid4";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function UploadPdfDialog({ children, isMaxFile , onDialogOpen }) {
  const router = useRouter();
  const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
  const AddFileEntry = useMutation(api.fileStorage.AddFileEntryToDb);
  const [file, setFile] = useState();
  const getFileUrl = useMutation(api.fileStorage.gerFileUrl);
  const {user} = useUser();
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const embeddDocument = useAction(api.myAction.ingest);

  const OnFileSelect = (event) => {
    setFile(event.target.files[0]);
  };
  
  const OnUpload = async() => {
    // Don't allow upload if max files reached
    if (isMaxFile) {
      toast.error("You've reached the maximum number of files allowed. Please upgrade to add more.");
      router.push("/dashboard/upgrade");
      handleClose();
      return;
    }

    setLoading(true);

    try {
      // Step 1: Get a short-lived upload URL
      const postUrl = await generateUploadUrl();
  
      // Step 2: POST the file to the URL
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": file?.type },
        body: file,
      });
  
      const { storageId } = await result.json();
      console.log('StorageId', storageId);
  
      const fileId = uuid4();
  
      const fileUrl = await getFileUrl({storageId: storageId});
  
      // Step 3: Save the newly allocated storage id to the database
      const resp = await AddFileEntry({
        fileId: fileId,
        storageId: storageId,
        fileName: fileName || file?.name || "untitled File",
        fileUrl: fileUrl,
        createdBy: user?.primaryEmailAddress?.emailAddress
      });
      console.log(resp);
  
      // API Call To Fetch PDF Process DATA
      const ApiResp = await axios.get(`/api/pdf-loader?pdfUrl=${fileUrl}`);
      console.log(ApiResp.data.result);
  
      await embeddDocument({
        splitText: ApiResp.data.result,
        fileId: fileId
      });
      
      toast.success("PDF uploaded successfully!");
      handleClose();
      router.refresh(); // Refresh to update the file count
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload PDF. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  // Function to handle dialog closing
  const handleClose = () => {
    setOpen(false);
    // Reset form state
    setFile(undefined);
    setFileName("");
  };

  // If max files reached and no custom button provided, just return null
  if (isMaxFile && !children) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      setOpen(newOpen);
      
      // If dialog is opening and we have a callback, call it
      if (newOpen && onDialogOpen) {
        onDialogOpen();
      }
    }}>
      <DialogTrigger asChild>
        <div>{children}</div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload PDF File</DialogTitle>
          <DialogDescription asChild>
            <div className="">
              <h2 className="mt-5">Select a File to Upload</h2>
              <div className="flex gap-2 p-3 rounded-md border">
                <Input type="file" accept=".pdf" onChange={OnFileSelect} />
              </div>
              <div className="mt-2">
                <label htmlFor="fileName">File Name (Optional)</label>
                <Input 
                  id="fileName" 
                  type="text" 
                  placeholder="Enter file name or use filename" 
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)} 
                />
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <Button 
            type="button" 
            variant="secondary"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button 
            type="button" 
            onClick={OnUpload} 
            disabled={loading || !file}
          >
            {loading ? <Loader2Icon className="animate-spin mr-2" /> : null}
            {loading ? 'Uploading...' : 'Upload'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default UploadPdfDialog;