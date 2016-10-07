import * as mongoose from 'mongoose';
import * as Movie from './movies'

export interface IActor extends mongoose.Document {
    firstName: string,
    lastName: string,
    biography: string,
    birthday: Date,
    img: string,
    filmography: Movie.IMovie[];
}

let actorSchema = new mongoose.Schema ({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    biography: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true,
    },
    filmography: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
    }]
})

export default mongoose.model<IActor>('Actor', actorSchema);
