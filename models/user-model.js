import mongoose from "mongoose"


const userSchema = new mongoose.Schema({
    clerkId: {
        type:String,
    },
    firstName: {
        type: String,

    },
    lastName: {
        type: String,

    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    imageUrl: {
        type:String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User =mongoose.models.User || mongoose.model('User', userSchema);

export default User