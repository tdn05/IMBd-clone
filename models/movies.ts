
import * as mongoose from 'mongoose';
import * as Actor from './actor';
import * as Writer from './writer';
import * as Rating from './rating'
import * as Review from './review'


export interface IMovie extends mongoose.Document {
    title: string,
    imgUrl: string,
    date: Date,
    description: string,
    length: string,
    genre: string,
    director: string,
    trailer: string,
    rate: string,
    writers: Writer.IWriter[];
    actors: Actor.IActor[];
    storyline: string,
    reviews: Review.IReview[];
    rating: Rating.IRating[];
};

let movieSchema = new mongoose.Schema ({
    title: {
        type: String,
        required: true,
    },
    imgUrl: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    length: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    director: {
        type: String,
        required: true,
    },
    trailer: {
        type: String,
        required: true,
    },
    rate: {
        type: String,
        required: true,
    },
    storyline: {
        type: String,
        required: true,
    },
    writers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Writer'
    }],
    actors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Actor'
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }],
    rating: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rating'
    }]
})

export default mongoose.model<IMovie>('Movie', movieSchema);
