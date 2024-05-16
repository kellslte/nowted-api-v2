import { Schema, model} from 'mongoose'

const FolderSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true })

export const Folder = model('Folder', FolderSchema)