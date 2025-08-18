import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// create a temporary endpoint where your file can be uploaded
export const  generateUploadUrl = mutation(async (ctx)=>{
   return await ctx.storage.generateUploadUrl();
});

export const AddFileEntryToDb=mutation({
    args:{
        fileId: v.string(),
        storageId: v.string(),
        fileName: v.string(),
        createdBy: v.string(),
        fileUrl:v.string(),
    },
    handler:async(ctx,args)=>{
     const result = await ctx.db.insert('pdfFiles',{
        fileId:args.fileId,
        storageId:args.storageId,
        fileName:args.fileName,
        fileUrl:args.fileUrl,
        createdBy:args.createdBy
     });
     return "Inserted File Successfully"
    }
})

export const gerFileUrl = mutation({
    args:{
        storageId:v.string()
    },
    handler:async(ctx,args)=>{
        const url = await ctx.storage.getUrl(args.storageId);
        return url;
    }
});

export const GetFileRecord=query({
    args:{
        fileId:v.string()
    },
    handler:async(ctx , args)=>{
       const result = await ctx.db.query('pdfFiles').filter((q)=>q.eq(q.field('fileId') , args.fileId)).collect();
       console.log(result);
       return result[0];
       
    }
})

export const GetUserFiles = query({
    args:{
        userEmail:v.optional(v.string())
    },
    handler:async(ctx , args)=>{

        if(!args?.userEmail){
            return ;
        }
        const result = await ctx.db.query('pdfFiles').filter((q)=> q.eq(q.field('createdBy'),args.userEmail)).collect();

        return result;
    }
});

export const deleteFile = mutation({
    args:{
        fileId:v.string(),
        userEmail:v.string()
    },
    handler:async(ctx,args)=>{
        const userResult = await ctx.db.query('users').filter((q)=>q.eq(q.field('email'),args.userEmail)).collect();
        if(userResult.length === 0 || !userResult[0].upgrade){
            throw new Error("Only Premium user can delete Files")
        }

        const file = await ctx.db.query('pdfFiles').filter((q)=>q.eq(q.field('fileId') , args.fileId)).first();
        if(!file){
             throw new Error("File not found");
        }

        await ctx.db.query('documents').filter((q)=>q.eq(q.field('metadata') , args.fileId)).collect()
        .then((notes) => {
        notes.forEach(async (note) => {
          await ctx.db.delete(note._id);
        });
      });

      await ctx.db.delete(file._id)

      return {success:true}
    }
})