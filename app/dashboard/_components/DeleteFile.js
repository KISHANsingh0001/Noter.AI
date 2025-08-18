"use client";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2, Loader2 } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function DeleteFileButton({ fileId, fileName, userEmail, isPremium }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteFile = useMutation(api.fileStorage.deleteFile);
  const router = useRouter();

  const handleDelete = async () => {
    if (!isPremium) {
      toast.error("Upgrade to premium to delete files");
      router.push("/dashboard/upgrade");
      return;
    }

    setIsDeleting(true);
    try {
      await deleteFile({ fileId, userEmail });
      toast.success(`"${fileName}" has been deleted`);
      router.refresh();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete file. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  // Non-premium users see disabled button with tooltip
  if (!isPremium) {
    return (
      <div className="group relative">
        <button
          className="p-2 rounded-full bg-gray-200/20 text-gray-500 cursor-not-allowed"
          disabled
        >
          <Trash2 size={16} />
        </button>
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Premium feature
        </span>
      </div>
    );
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="p-2 rounded-full hover:bg-red-600/10 text-red-500 transition-colors">
          <Trash2 size={16} />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-gray-900 border border-gray-700 text-gray-200">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">Are you sure?</AlertDialogTitle>
          <AlertDialogDescription className="text-gray-400">
            This will permanently delete "{fileName}" and all associated notes.
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-gray-800 text-gray-200 border-gray-700 hover:bg-gray-700">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            className="bg-red-600 hover:bg-red-700 text-white"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2 inline" />
            ) : null}
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}