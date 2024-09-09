import mongoose, { Document } from "mongoose";


interface IComic extends Document {
    num: number;
    views: number;
}

const comicSchema = new mongoose.Schema({
    num: {type: Number, required: true, unique: true},
    views: {type: Number, default: 0},
});

export default mongoose.model<IComic>('Comic', comicSchema);
