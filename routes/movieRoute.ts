import * as express from 'express';
import Movie from '../models/movies';
import * as mongodb from 'mongodb';
import * as jwt from 'jsonwebtoken';
import Review from '../models/review';

let ObjectId = mongodb.ObjectID;

let movieRoute = express.Router();

//create a movie
movieRoute.post('/', (req,res)=>{
    let movie = new Movie();

    movie.title = req.body.title;
    movie.description = req.body.description;
    movie.length = req.body.length;
    movie.genre = req.body.genre;
    movie.director = req.body.director;
    movie.trailer = req.body.trailer;
    movie.storyline = req.body.storyline;
    movie.writers = req.body.writers;
    movie.actors = req.body.actors;
    movie.reviews = req.body.reviews;
    movie.rating = req.body.rating;
    movie.rate = req.body.rate;
    movie.date = req.body.date;
    movie.imgUrl = req.body.imgUrl;

    movie.save().then((movie)=>{
        res.status(201).send(movie)
    }).catch((err)=>{
        res.status(400).send(err)
    })
});

//read movies
movieRoute.get('/', (req,res)=>{
    Movie.find().populate('actors').then((movies)=>{
        res.send(movies);
    }).catch((err)=>{
        res.status(500).send({err: err})
    })
});

movieRoute.get('/:id', (req,res)=>{
    Movie.findById(req.params['id']).populate('actors')
    .then((movie)=>{
        res.send(movie);
    }).catch((err)=>{
        res.status(500).send({err:err});
    })
});

//add review to Movie
movieRoute.post('/review/:movId', (req,res)=>{
    let movId = new ObjectId(req.params['movId']);
    let review = new Review();

    review.user = req.body.user;
    review.message = req.body.message;
    review.timeCreate = new Date();
    review.votes = req.body.votes;

    review.save()
    .then((review)=>{
        let revId = new ObjectId(review._id);
        Movie.update({_id:movId}, {$push: {reviews: revId}})
        .then(()=>{
            res.sendStatus(201);
        }).catch(()=>{
            res.sendStatus(404);
        })
    }).catch(()=>{
        res.sendStatus(400);
    });
});

//add actor to Movie
movieRoute.post('/actor/:movId', (req,res)=>{
    let actId = new ObjectId(req.body._id);
    let movId = new ObjectId(req.params['movId'])

    Movie.update({_id: movId}, {$push: {actors: actId}})
    .then((movie)=>{
        res.send(movie)
    }).catch((err)=>{
        res.status(400).send(err);
    })
})

export default movieRoute;

function authorize(req,res,next){
    let token = req['token'];

    jwt.verify(token, 'SuperSecret', (err, decoded)=>{
        if(err){
            res.sendStatus(401)
        } else {
            console.log(decoded);
            next();
        }
    })
}
