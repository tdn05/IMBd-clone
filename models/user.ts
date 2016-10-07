import * as mongoose from 'mongoose';
import * as jwt from 'jsonwebtoken';
const crypto:any =  require('crypto-js');

interface IUser extends mongoose.Document {
    username: string,
    password: string,
    email: string,
    admin: boolean
    setPassword(password),
    validatePassword(password),
    generateToken()
}

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        set: function(value:string){
            return value.toLowerCase().trim();
        }
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        required: false,
    }
})



userSchema.method('setPassword', function(password){
    // this.salt = crypto.randomBytes(16).toString('hex');
    // this.password = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    this.password = crypto.AES.encrypt(password, 'SuperSecret');
});

userSchema.method('validatePassword', function(password){
    // let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    // console.log(hash==this.password);

    let hash = crypto.AES.decrypt(this.password, 'SuperSecret');

    return password === hash.toString(crypto.enc.Utf8);
});

//makes a token, don't put sensitive info in here
userSchema.method('generateToken', function(){
    return jwt.sign({
        id: this._id,
        username: this.username,
        admin: this.admin,
    }, 'SuperSecret');
})

export default mongoose.model<IUser>('User', userSchema)
