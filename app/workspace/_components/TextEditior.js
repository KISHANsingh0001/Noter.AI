"use client"
import { Placeholder } from "@tiptap/extensions";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect } from "react";
import EditiorExtension from "./EditiorExtension";
import TextAlign from '@tiptap/extension-text-align'
import Highlight from "@tiptap/extension-highlight";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

function TextEditior({fileId}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start Taking Your Notes Here...",
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight.configure({ multicolor: true })
    ],
 
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "focus:outline-none p-5",
      },
    },
  });
  
   const notes = useQuery(api.notes.GetNotes,{
    fileId:fileId
   })

  console.log(notes);

 useEffect(()=>{
  editor&&editor.commands.setContent(notes);
 },[notes&&editor])
  
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="shrink-0 border-b bg-white">
        <EditiorExtension editor={editor} />
      </div>
      <div className="flex-1 min-h-0 overflow-auto border-gray-700 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900  text-white">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

export default TextEditior;
