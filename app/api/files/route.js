import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import { getFileType } from "../../../lib/utils";
import dbConnect from "../../../lib/mongodb";
import File from "../../../models/files-model";
// import { auth } from "@clerk/nextjs/server";
import User from "@/models/user-model";
import { currentUser } from '@clerk/nextjs/server'

// 🔹 Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dbwqr9pht",
    api_key: process.env.CLOUDINARY_API_KEY || "653288197387766",
    api_secret: process.env.CLOUDINARY_API_SECRET || "IVAKxytOWL1qUHRIG-FWK9W3GUI",
});

/**
 * 🔹 Helper Function: Get Logged-in User
 */
async function getLoggedUser() {
    try {
        const { emailAddresses } = await currentUser();
        const primaryEmailAddress = emailAddresses[0].emailAddress
        if (!primaryEmailAddress) {
            console.warn("User not authenticated");
            return { error: NextResponse.json({ message: "User not authenticated" }, { status: 401 }) };
        }

        // console.log("User authenticated:", primaryEmailAddress);

        await dbConnect();
        // console.log("Database connected");

        const loggedUser = await User.findOne({ email: primaryEmailAddress }).exec();

        if (!loggedUser) {
            console.error("User not found in database:", primaryEmailAddress);
            return { error: NextResponse.json({ message: "User not found" }, { status: 404 }) };
        }

        // console.log("User found:", loggedUser._id);
        return { loggedUser };
    } catch (error) {
        console.error("Authentication error:", error);
        return { error: NextResponse.json({ message: "Authentication failed" }, { status: 500 }) };
    }
}

/**
 * 🔹 POST API: Upload File to Cloudinary
 */
export async function POST(request) {
    try {
        // 🔹 Fetch logged-in user
        const { loggedUser, error } = await getLoggedUser();
        if (error) return error;
        if (loggedUser.uploadLimit === 0) {
            return NextResponse.json({ error: "Max Upload Limit Reached" }, { status: 400 });

        }
        // 🔹 Parse file upload
        const formData = await request.formData();
        const file = formData.get("file");

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        // Convert file to Buffer
        const buffer = Buffer.from(await file.arrayBuffer());

        const fileName = file.name.split(".").slice(0, -1).join(".");
        const fileExtension = file.name.split(".").pop();
        const { fileType } = getFileType(file.name);

        // 🔹 Upload to Cloudinary
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: "Demo",
                    resource_type: "auto",
                    public_id: file.fileName,
                    unique_filename: false,
                    type: "upload",
                },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            );
            uploadStream.end(buffer);
        });

        // 🔹 Save file metadata to DB
        const newFile = new File({
            ownerId: loggedUser._id,
            fileName,
            fileType,
            fileExtension,
            fileUrl: result.secure_url,
        });

        const savedFile = await newFile.save();
        const uploadLimit = loggedUser.uploadLimit - 1
        await User.findByIdAndUpdate(loggedUser._id, { uploadLimit })
        await savedFile.populate("ownerId")
        return NextResponse.json(
            {
                savedFile
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}

/**
 * 🔹 GET API: Fetch User's Files
 */
export async function GET() {
    try {
        // 🔹 Fetch logged-in user
        const { loggedUser, error } = await getLoggedUser();
        if (error) return error;

        // 🔹 Fetch files for the user
        const files = await File.find({ ownerId: loggedUser._id }).populate("ownerId").exec();

        if (!files.length) {
            console.warn("No files found for user:", loggedUser._id);
            return NextResponse.json({ message: "No files found" }, { status: 404 });
        }

        return NextResponse.json({ files }, { status: 200 });
    } catch (err) {
        console.error("Error fetching files:", err);
        return NextResponse.json({ message: "Error fetching files", error: err.message }, { status: 500 });
    }
}
