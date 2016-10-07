import * as mongoose from 'mongoose';
import * as Movie from './movie'

export interface IWriter extends mongoose.Document {
    firstName: string,
    lastName: string,
    biography: string,
    birthday: Date,
    profilePhoto: string,
    filmography: Movie.IMovie[];
}

let writerSchema = new mongoose.Schema ({
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
    birthday: {
        type: Date,
        required: true,
    },
    filmography: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
    }]
})

export default mongoose.model<IWriter>('Writer', writerSchema);
