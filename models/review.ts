import * as mongoose from 'mongoose';

export interface IReview extends mongoose.Document {
    user: string,
    message: string,
    timeCreate: Date,
    votes: number,
}

let reviewSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    timeCreate: {
        type: Date,
        required: true
    },
    votes: {
        type: Number,
        required: true
    }
});

export default mongoose.model<IReview>('Review', reviewSchema);
