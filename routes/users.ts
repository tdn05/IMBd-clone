import * as express from 'express';
import * as passport from 'passport';
import * as passportLocal from 'passport-local';
import * as jwt from 'jsonwebtoken';
import User from '../models/user';


let router = express.Router();

//configure passport local strategy

let LocalStrategy = passportLocal.Strategy;

passport.serializeUser(function(user, done){
    done(null, user.id);
})

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy(function (username, password, done){
    User.findOne({username: username.trim()})
    .then(function(user){
        //if no user found, send back error message
        if(!user) {
            console.log('no user found')
            return done(null, false, {message: 'incorrect username'});
        }
        //if password doesn't match, send back error message
        if(!user.validatePassword(password)) {
            console.log('incorrect pw')
            return done(null, false, {message: 'incorrect password'});
        }

        user.password = null;
        return done(null, user)
    })
    .catch((err)=>{
        return done(err);
    })
}))

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Register
router.post('/register', register,  passport.authenticate('local', {failureRedirect: '/login'}), login);

function register(req,res,next){
    console.log(req.body);
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'Password is requried').notEmpty();
    //made form the client side
    req.checkBody('confirmPassword', 'Password do not match').equals(req.body.password);

    let errors = req.validationErrors();
    if(errors){
        res.status(400).send(errors);
    } else {
        let newUser = new User();
        newUser.username = req.body.username;
        newUser.email = req.body.email;
        newUser.setPassword(req.body.password)

        newUser
        .save()
        .then((user)=>{
            next();
            // res.send(user);
        //sends back password all hashed up so never do this.
        })
        .catch(()=>{

        })
    }
}

router.post('/login', passport.authenticate('local', {failureRedirect: '/login'}), login);

function login(req,res){
    if(req.isAuthenticated()){
        let data ={
            token: req.user.generateToken(),
            username: req.user.username,
            admin: req.user.admin
        }
        res.send(data);
    } else {
        res.send('you are not authenticated')
    }
}


export default router;
