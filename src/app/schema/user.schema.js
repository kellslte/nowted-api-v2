import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    
}, { timestamps: true})

export const User = model('User', UserSchema);