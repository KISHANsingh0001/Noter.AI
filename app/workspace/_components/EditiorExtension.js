// 'use client'
// import { chatSession } from "@/configs/AIModel";
// import { api } from "@/convex/_generated/api";
// import { useUser } from "@clerk/nextjs";
// import { useAction, useMutation } from "convex/react";
// import {
//   Bold,
//   Code,
//   Italic,
//   Underline,
//   Heading1,
//   Heading2,
//   Heading3,
//   List,
//   ListOrdered,
//   Quote,
//   Undo,
//   Redo,
//   AlignLeft,
//   AlignCenter,
//   AlignRight,
//   Highlighter,
//   Sparkles,
//   Loader2,
//   MoreHorizontal,
// } from "lucide-react";
// import { useParams } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import { toast } from "sonner";

// function EditorExtension({ editor }) {
//   const { fileId } = useParams();
//   const saveNotes = useMutation(api.notes.AddNotes);
//   const { user } = useUser();
  
//   const [, setTick] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showMoreTools, setShowMoreTools] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
  
//   // Check screen size on mount and when resized
//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsMobile(window.innerWidth < 768); // 768px is typical tablet breakpoint
//     };
    
//     // Initial check
//     checkScreenSize();
    
//     // Add event listener for resize
//     window.addEventListener('resize', checkScreenSize);
    
//     // Cleanup
//     return () => window.removeEventListener('resize', checkScreenSize);
//   }, []);
 
//   useEffect(() => {
//     if(!editor){
//       return;
//     }
//     const rerender = () => setTick((t) => t + 1);
//     editor.on("selectionUpdate", rerender);
//     editor.on("transaction", rerender);
//     editor.on("update", rerender);
//     editor.on("focus", rerender);
//     editor.on("blur", rerender);
//     return () => {
//       editor.off("selectionUpdate", rerender);
//       editor.off("transaction", rerender);
//       editor.off("update", rerender);
//       editor.off("focus", rerender);
//       editor.off("blur", rerender);
//     };
//   }, [editor]);
  
//   // Clean markdown fences
//   const cleanAIResponse = (text) => {
//     if (!text) return "";
//     return text
//     .replace(/```(?:\w+)?/g, "")   // remove ``` and ```html etc
//     .replace(/```/g, "")
//     .trim();
//   };
  
//   // Safe active check that works even when editor is null
//   const active = (checkFn) => {
//     if (!editor) return "text-black";
//     try {
//       return checkFn() ? "text-blue-500" : "text-black";
//     } catch (e) {
//       return "text-black";
//     }
//   };

//   const SearchAI = useAction(api.myAction.search);

//   const onAiClick = async() => { 
//     toast("AI is getting your answer...");
//     setIsLoading(true);

//     // selecting the text
//     const selectedText = editor.state.doc.textBetween(
//       editor.state.selection.from,
//       editor.state.selection.to,
//       " "
//     ).trim();
    
//     const result = await SearchAI({
//       query: selectedText,
//       fileId: fileId
//     });
//     const UnformattedAns = JSON.parse(result);
  
//     let AllUnformattedAns = '';

//     UnformattedAns && UnformattedAns.forEach(item => {
//       AllUnformattedAns = AllUnformattedAns + item.pageContent;
//     });
    
//     const PROMPT = `For question : ${selectedText} and with the given content as answer please give appropriate answer in HTML format. The answer content is : ${AllUnformattedAns}`;

//     const AiModelResult = await chatSession.sendMessage(PROMPT);

//     const FinalAns = AiModelResult.response.text();
//     const cleanedFinalAns = cleanAIResponse(FinalAns);
   
//     const AllText = editor.getHTML();
//     editor.commands.setContent(`${AllText} <p><strong>Answer: </strong>${cleanedFinalAns} </p>`);
//     setIsLoading(false);
    
//     saveNotes({
//       notes: editor.getHTML(),
//       fileId: fileId,
//       createdBy: user?.primaryEmailAddress.emailAddress
//     });
//   };

//   // Guard clause - render nothing if editor isn't available
//   if (!editor) return null;
  
//   // Only define UI elements AFTER we've confirmed editor exists
//   // Group the buttons into logical sets for responsive design
//   const primaryTools = (
//     <>
//       <button
//         onClick={() => editor.chain().focus().toggleBold().run()}
//         className={`p-1 rounded hover:bg-gray-100 ${editor.isActive("bold") ? "text-blue-500" : "text-black"}`}
//       >
//         <Bold size={20} />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleItalic().run()}
//         className={`p-1 rounded hover:bg-gray-100 ${editor.isActive("italic") ? "text-blue-500" : "text-black"}`}
//       >
//         <Italic size={20} />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleUnderline().run()}
//         className={`p-1 rounded hover:bg-gray-100 ${editor.isActive("underline") ? "text-blue-500" : "text-black"}`}
//       >
//         <Underline size={20} />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleBulletList().run()}
//         className={`p-1 rounded hover:bg-gray-100 ${editor.isActive("bulletList") ? "text-blue-500" : "text-black"}`}
//       >
//         <List size={20} />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleOrderedList().run()}
//         className={`p-1 rounded hover:bg-gray-100 ${editor.isActive("orderedList") ? "text-blue-500" : "text-black"}`}
//       >
//         <ListOrdered size={20} />
//       </button>
//       <button onClick={onAiClick} className="p-1 rounded hover:bg-blue-100 hover:text-blue-500">
//         {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
//       </button>
//     </>
//   );
  
//   const secondaryTools = (
//     <>
//       <button
//         onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
//         className={`p-1 rounded hover:bg-gray-100 ${editor.isActive("heading", { level: 1 }) ? "text-blue-500" : "text-black"}`}
//       >
//         <Heading1 size={20} />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
//         className={`p-1 rounded hover:bg-gray-100 ${editor.isActive("heading", { level: 2 }) ? "text-blue-500" : "text-black"}`}
//       >
//         <Heading2 size={20} />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
//         className={`p-1 rounded hover:bg-gray-100 ${editor.isActive("heading", { level: 3 }) ? "text-blue-500" : "text-black"}`}
//       >
//         <Heading3 size={20} />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleCodeBlock().run()}
//         className={`p-1 rounded hover:bg-gray-100 ${editor.isActive("codeBlock") ? "text-blue-500" : "text-black"}`}
//       >
//         <Code size={20} />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleHighlight().run()}
//         className={`p-1 rounded hover:bg-gray-100 ${editor.isActive("highlight") ? "text-blue-500" : "text-black"}`}
//       >
//         <Highlighter size={20} />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().toggleBlockquote().run()}
//         className={`p-1 rounded hover:bg-gray-100 ${editor.isActive("blockquote") ? "text-blue-500" : "text-black"}`}
//       >
//         <Quote size={20} />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().undo().run()}
//         className="p-1 rounded hover:bg-gray-100 text-black"
//       >
//         <Undo size={20} />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().redo().run()}
//         className="p-1 rounded hover:bg-gray-100 text-black"
//       >
//         <Redo size={20} />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().setTextAlign("left").run()}
//         className={`p-1 rounded hover:bg-gray-100 ${editor.isActive({ textAlign: "left" }) ? "text-blue-500" : "text-black"}`}
//       >
//         <AlignLeft size={20} />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().setTextAlign("center").run()}
//         className={`p-1 rounded hover:bg-gray-100 ${editor.isActive({ textAlign: "center" }) ? "text-blue-500" : "text-black"}`}
//       >
//         <AlignCenter size={20} />
//       </button>
//       <button
//         onClick={() => editor.chain().focus().setTextAlign("right").run()}
//         className={`p-1 rounded hover:bg-gray-100 ${editor.isActive({ textAlign: "right" }) ? "text-blue-500" : "text-black"}`}
//       >
//         <AlignRight size={20} />
//       </button>
//     </>
//   );
  
//   return (
//     <div className="border-b ">
//       {/* Mobile view */}
//       {isMobile ? (
//         <div className="p-2">
//           <div className="flex flex-wrap gap-1 justify-between items-center">
//             <div className="flex flex-wrap gap-1">
//               {primaryTools}
//             </div>
//             <div>
//               <button 
//                 onClick={() => setShowMoreTools(!showMoreTools)}
//                 className="p-1 rounded bg-gray-100 hover:bg-gray-200"
//               >
//                 <MoreHorizontal size={20} />
//               </button>
//             </div>
//           </div>
          
//           {showMoreTools && (
//             <div className="flex flex-wrap gap-1 mt-2 pt-2 border-t">
//               {secondaryTools}
//             </div>
//           )}
//         </div>
//       ) : (
//         /* Desktop view */
//         <div className="p-3">
//           <div className="flex flex-wrap gap-2">
//             {primaryTools}
//             <div className="w-px h-6 bg-gray-200 mx-1 self-center"></div>
//             {secondaryTools}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default EditorExtension;

'use client'
import { chatSession } from "@/configs/AIModel";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useAction, useMutation } from "convex/react";
import {
  Bold,
  Code,
  Italic,
  Underline,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Highlighter,
  Sparkles,
  Loader2,
  MoreHorizontal,
} from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

function EditorExtension({ editor }) {
  const { fileId } = useParams();
  const saveNotes = useMutation(api.notes.AddNotes);
  const { user } = useUser();
  
  const [, setTick] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showMoreTools, setShowMoreTools] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check screen size on mount and when resized
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // 768px is typical tablet breakpoint
    };
    
    // Initial check
    checkScreenSize();
    
    // Add event listener for resize
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
 
  useEffect(() => {
    if(!editor){
      return;
    }
    const rerender = () => setTick((t) => t + 1);
    editor.on("selectionUpdate", rerender);
    editor.on("transaction", rerender);
    editor.on("update", rerender);
    editor.on("focus", rerender);
    editor.on("blur", rerender);
    return () => {
      editor.off("selectionUpdate", rerender);
      editor.off("transaction", rerender);
      editor.off("update", rerender);
      editor.off("focus", rerender);
      editor.off("blur", rerender);
    };
  }, [editor]);
  
  // Clean markdown fences
  const cleanAIResponse = (text) => {
    if (!text) return "";
    return text
    .replace(/```(?:\w+)?/g, "")   // remove ``` and ```html etc
    .replace(/```/g, "")
    .trim();
  };
  
  // Safe active check that works even when editor is null
  const active = (checkFn) => {
    if (!editor) return "text-gray-400";
    try {
      return checkFn() ? "text-blue-400" : "text-gray-400";
    } catch (e) {
      return "text-gray-400";
    }
  };

  const SearchAI = useAction(api.myAction.search);

  // const onAiClick = async() => { 
  //   toast("AI is getting your answer...");
  //   setIsLoading(true);

  //   // selecting the text
  //  const selectedText = editor.state.doc.textBetween(
  //   editor.state.selection.from,
  //   editor.state.selection.to,
  //   " "
  // ).trim();

  //  if (!selectedText) {
  //   // Get current paragraph text instead
  //   const { from } = editor.state.selection;
  //   const $from = editor.state.doc.resolve(from);
  //   const para = $from.parent;
  //   if (para && para.textContent) {
  //     selectedText = para.textContent.trim();
  //     toast.info("Using current paragraph for AI search");
  //   } else {
  //     toast.error("Please select text or position cursor in a paragraph with your question");
  //     return;
  //   }
  // }
    
  //   const result = await SearchAI({
  //     query: selectedText,
  //     fileId: fileId
  //   });
  //   const UnformattedAns = JSON.parse(result);
  
  //   let AllUnformattedAns = '';

  //   UnformattedAns && UnformattedAns.forEach(item => {
  //     AllUnformattedAns = AllUnformattedAns + item.pageContent;
  //   });
    
  //   // const PROMPT = `For question : ${selectedText} and with the given content as answer please give appropriate answer in HTML format. The answer content is : ${AllUnformattedAns}`;
  //       const PROMPT = selectedText 
  //     ? `Answer the following question in well-formatted HTML: "${selectedText}"
         
  //        Use this information First from the PDF to create your answer:
  //        ${AllUnformattedAns || "No direct information found in the PDF. Please provide a general answer based on common knowledge."}
         
  //        Format your response as clean HTML that can be directly inserted into a document.`
  //     : ``;

  //   const AiModelResult = await chatSession.sendMessage(PROMPT);

  //   const FinalAns = AiModelResult.response.text();
  //   const cleanedFinalAns = cleanAIResponse(FinalAns);
   
  //   const AllText = editor.getHTML();
  //   editor.commands.setContent(`${AllText} <p><strong>Answer: </strong>${cleanedFinalAns} </p>`);
  //   setIsLoading(false);
    
  //   saveNotes({
  //     notes: editor.getHTML(),
  //     fileId: fileId,
  //     createdBy: user?.primaryEmailAddress.emailAddress
  //   });
  // };
  const onAiClick = async() => { 
  // Get selected text first
  const selectedText = editor.state.doc.textBetween(
    editor.state.selection.from,
    editor.state.selection.to,
    " "
  ).trim();
  
  // Placeholder for text we'll use in the query
  let queryText = selectedText;

  // If no selection, try to use current paragraph
  if (!selectedText) {
    try {
      const { from } = editor.state.selection;
      const $from = editor.state.doc.resolve(from);
      const para = $from.parent;
      
      if (para && para.textContent && para.textContent.trim()) {
        queryText = para.textContent.trim();
        toast.info("Using current paragraph for AI search");
      } else {
        toast.error("Please select text or position cursor in a paragraph with your question");
        return; // Exit early
      }
    } catch (error) {
      console.error("Error getting current paragraph:", error);
      toast.error("Please select some text to search");
      return; // Exit early without starting the loading state
    }
  }
  
  // Only start loading after we confirm we have text to search
  if (!queryText) {
    toast.error("Please select text to search");
    return; // Exit early
  }
  
  // Now we know we have text to search, start loading
  setIsLoading(true);
  toast("AI is getting your answer...");

  try {
    const result = await SearchAI({
      query: queryText,
      fileId: fileId
    });
    
    // Handle null or invalid results
    let UnformattedAns = [];
    try {
      UnformattedAns = result ? JSON.parse(result) : [];
    } catch (e) {
      console.error("Error parsing search results:", e);
      UnformattedAns = [];
    }
    
    let AllUnformattedAns = '';
    if (UnformattedAns && UnformattedAns.length > 0) {
      UnformattedAns.forEach(item => {
        AllUnformattedAns = AllUnformattedAns + item.pageContent;
      });
    }
    
    const PROMPT = `Answer the following question in well-formatted HTML: "${queryText}"
       
       Use this information first from the PDF to create your answer and possibly 'Highlight the answer' and Do not Repeat the Question Again and Remove the Extra white spaces :
       ${AllUnformattedAns || "Do this Option When Do or Die Situation No direct information found in the PDF. Please provide a general answer based on common knowledge."}
       
       Format your response as clean HTML that can be directly inserted into a document.`;

    const AiModelResult = await chatSession.sendMessage(PROMPT);
    const FinalAns = AiModelResult.response.text();
    const cleanedFinalAns = cleanAIResponse(FinalAns);
    
    const AllText = editor.getHTML();
    editor.commands.setContent(`${AllText} <p><strong>Answer: </strong>${cleanedFinalAns} </p>`);
    
    // Save notes after successful AI response
    saveNotes({
      notes: editor.getHTML(),
      fileId: fileId,
      createdBy: user?.primaryEmailAddress.emailAddress
    });
  } catch (error) {
    console.error("Error in AI processing:", error);
    toast.error("Failed to get AI response. Please try again.");
  } finally {
    // Always reset loading state, even if there was an error
    setIsLoading(false);
  }
};

  // Guard clause - render nothing if editor isn't available
  if (!editor) return null;
  
  // Only define UI elements AFTER we've confirmed editor exists
  // Group the buttons into logical sets for responsive design
  const primaryTools = (
    <>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-1 rounded hover:bg-gray-700/30 ${editor.isActive("bold") ? "text-blue-400" : "text-gray-300"}`}
      >
        <Bold size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-1 rounded hover:bg-gray-700/30 ${editor.isActive("italic") ? "text-blue-400" : "text-gray-300"}`}
      >
        <Italic size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`p-1 rounded hover:bg-gray-700/30 ${editor.isActive("underline") ? "text-blue-400" : "text-gray-300"}`}
      >
        <Underline size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-1 rounded hover:bg-gray-700/30 ${editor.isActive("bulletList") ? "text-blue-400" : "text-gray-300"}`}
      >
        <List size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-1 rounded hover:bg-gray-700/30 ${editor.isActive("orderedList") ? "text-blue-400" : "text-gray-300"}`}
      >
        <ListOrdered size={20} />
      </button>
      <button onClick={onAiClick} className="p-1 rounded hover:bg-blue-900/20 hover:text-blue-400 text-gray-300">
        {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
      </button>
    </>
  );
  
  const secondaryTools = (
    <>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`p-1 rounded hover:bg-gray-700/30 ${editor.isActive("heading", { level: 1 }) ? "text-blue-400" : "text-gray-300"}`}
      >
        <Heading1 size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-1 rounded hover:bg-gray-700/30 ${editor.isActive("heading", { level: 2 }) ? "text-blue-400" : "text-gray-300"}`}
      >
        <Heading2 size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`p-1 rounded hover:bg-gray-700/30 ${editor.isActive("heading", { level: 3 }) ? "text-blue-400" : "text-gray-300"}`}
      >
        <Heading3 size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`p-1 rounded hover:bg-gray-700/30 ${editor.isActive("codeBlock") ? "text-blue-400" : "text-gray-300"}`}
      >
        <Code size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={`p-1 rounded hover:bg-gray-700/30 ${editor.isActive("highlight") ? "text-blue-400" : "text-gray-300"}`}
      >
        <Highlighter size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-1 rounded hover:bg-gray-700/30 ${editor.isActive("blockquote") ? "text-blue-400" : "text-gray-300"}`}
      >
        <Quote size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        className="p-1 rounded hover:bg-gray-700/30 text-gray-300"
      >
        <Undo size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        className="p-1 rounded hover:bg-gray-700/30 text-gray-300"
      >
        <Redo size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={`p-1 rounded hover:bg-gray-700/30 ${editor.isActive({ textAlign: "left" }) ? "text-blue-400" : "text-gray-300"}`}
      >
        <AlignLeft size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={`p-1 rounded hover:bg-gray-700/30 ${editor.isActive({ textAlign: "center" }) ? "text-blue-400" : "text-gray-300"}`}
      >
        <AlignCenter size={20} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={`p-1 rounded hover:bg-gray-700/30 ${editor.isActive({ textAlign: "right" }) ? "text-blue-400" : "text-gray-300"}`}
      >
        <AlignRight size={20} />
      </button>
    </>
  );
  
  return (
    <div className="border-b border-gray-700 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
      {/* Mobile view */}
      {isMobile ? (
        <div className="p-2">
          <div className="flex flex-wrap gap-1 justify-between items-center">
            <div className="flex flex-wrap gap-1">
              {primaryTools}
            </div>
            <div>
              <button 
                onClick={() => setShowMoreTools(!showMoreTools)}
                className="p-1 rounded bg-gray-700/50 hover:bg-gray-600/50 text-gray-300"
              >
                <MoreHorizontal size={20} />
              </button>
            </div>
          </div>
          
          {showMoreTools && (
            <div className="flex flex-wrap gap-1 mt-2 pt-2 border-t border-gray-700/50">
              {secondaryTools}
            </div>
          )}
        </div>
      ) : (
        /* Desktop view */
        <div className="p-3">
          <div className="flex flex-wrap gap-2">
            {primaryTools}
            <div className="w-px h-6 bg-gray-700/50 mx-1 self-center"></div>
            {secondaryTools}
          </div>
        </div>
      )}
    </div>
  );
}

export default EditorExtension;