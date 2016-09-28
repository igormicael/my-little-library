/**
 * Created by igor on 24/09/2016.
 */

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Verify = require('./verify');

var UserBook = require('../models/userBook');

var userBookRouter = express.Router();

userBookRouter.use(bodyParser.json());

userBookRouter.route('/')
    .get( Verify.verifyOrdinaryUser, function(req, res, next) {

        UserBook.find({'user': req.decoded._id})
        //UserBook.find({ 'user': '57e5cbcb8c559b4a48ca408a' })
            .populate('user')
            .populate('book')
            .exec(function(err, dish) {
                if (err) next(err);
                res.json(dish);
            })
    })
    .post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {

        UserBook.create({'book': req.body.book, 'user' : req.decoded._id , 'readingStatus' : 'READING' }, function(err, userBook) {
            if (err) {
                console.log(err);
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Error when trying to save userBook');
            } else {
                console.log('Book created!');
                console.log(userBook);
                var id = userBook._id;

                res.end('Added the UserBook with id: ' + id);
            }
        });
    });

userBookRouter.route('/:userBookId')
    .get( Verify.verifyOrdinaryUser,  function(req, res, next) {
        UserBook.findById(req.params.userBookId)
            .populate('book')
            .exec(function(err, userBook) {
                if (err) next(err);
                res.json(userBook);
            })
    })
    .put( Verify.verifyOrdinaryUser , function(req, res, next) {
              
        UserBook.findByIdAndUpdate(req.params.userBookId, {
            $set: req.body
        }, { new: true }, function(err, userBook) {
            if (err) next(err);
            res.send(userBook);
        });

    });

;

module.exports = userBookRouter;
