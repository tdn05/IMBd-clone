import * as mongoose from 'mongoose';

export interface IRating extends mongoose.Document {
    rating: number,
}

let ratingSchema = new mongoose.Schema ({
    rating: {
        type: Number,
        required: true,
    }
});

export default mongoose.model<IRating>('Rating', ratingSchema)
