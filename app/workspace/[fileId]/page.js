"use client"
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import WorkspaceHeader from '../_components/WorkspaceHeader';
import PdfViewer from '../_components/PdfViewer';
import {  useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import TextEditior from '../_components/TextEditior';

function Workspace() {
    const {fileId} = useParams();
    const fileInfo = useQuery(api.fileStorage.GetFileRecord,{
        fileId:fileId
    });
    useEffect(()=>{
       console.log(fileInfo);
       
    },[fileInfo])
  return (
   <div className="h-screen flex flex-col overflow-hidden">
      <WorkspaceHeader fileName={fileInfo?.fileName}/>
      
      <div className="flex-1 overflow-hidden flex flex-col md:grid md:grid-cols-2 gap-0">
        {/* Editor  */}
        <div className="min-h-0 overflow-hidden flex flex-col h-1/2 md:h-auto">
          <TextEditior fileId={fileId} />
        </div>
        {/* PDF  */}
        <div className="min-h-0 overflow-hidden flex flex-col border-l h-1/2 md:h-auto">
          <div className="flex-1 min-h-0 overflow-auto">
            <PdfViewer fileUrl={fileInfo?.fileUrl} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Workspace
