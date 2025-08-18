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
      <WorkspaceHeader  fileName={fileInfo?.fileName}/> {/* sticky already */}
      <div className="flex-1 overflow-hidden grid grid-cols-2 gap-0">
        {/* Editor pane */}
        <div className="min-h-0 overflow-hidden flex flex-col">
          <TextEditior fileId={fileId} /> {/* internally handles its own scrolling */}
        </div>
        {/* PDF pane */}
        <div className="min-h-0 overflow-hidden flex flex-col border-l">
          <div className="flex-1 min-h-0 overflow-auto">
            <PdfViewer fileUrl={fileInfo?.fileUrl} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Workspace
