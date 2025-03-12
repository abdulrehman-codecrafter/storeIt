import mongoose from "mongoose";

// File Schema
const fileSchema = new mongoose.Schema(
    {
      ownerId: {
        type: mongoose.Schema.Types.ObjectId, // Changed from String to ObjectId
        required: true,
        ref: "User",
      },
      fileName: {
        type: String,
        required: true,
      },
      fileType:{
        type:String,
        required:true
      },
      fileExtension:{
        type:String,
      },
      fileUrl: {
        type: String,
        required: true,
      },
      sharedTo: [
        {
          type: mongoose.Schema.Types.ObjectId, // Changed to an array of ObjectIds
          ref: "User",
        },
      ],
    },
    { timestamps: true } // Automatically manages createdAt & updatedAt
  );
  
  const File = mongoose.models.File || mongoose.model("File", fileSchema);
  
  export default File;
  