import mongoose from "mongoose";

import dotenv from "dotenv"
dotenv.config()

export async function connect(){
    try {
        await mongoose.connect(process.env.DATABASE)
        console.log("Atlas mongo connect")
    } catch (error) {
        console.log("Error:", error.message);
    }
}

