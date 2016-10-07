import * as mongodb from 'mongodb';
import * as express from 'express';
import Actor from '../models/actor';

let ObjectId = mongodb.ObjectID;

let actorRoute = express.Router();

actorRoute.post('/', (req,res)=>{
    let actor = new Actor();

    actor.firstName = req.body.firstName;
    actor.lastName = req.body.lastName;
    actor.biography = req.body.biography;
    actor.birthday = req.body.birthday;
    actor.img = req.body.img;

    actor.save().then((actor)=>{
        res.status(201).send(actor)
    }).catch((err)=>{
        res.status(400).send(err);
    });
});

actorRoute.get('/', (req,res)=>{
    Actor.find().populate('filmography').then((actors)=>{
        res.send(actors);
    }).catch((err)=>{
        res.status(500).send({err:err})
    })
});

actorRoute.get('/:id', (req,res)=>{
    Actor.findById(req.params['id']).populate('filmography').then((actor)=>{
        res.send(actor);
    }).catch((err)=>{
        res.status(500).send({err:err})
    })
});

export default actorRoute;
