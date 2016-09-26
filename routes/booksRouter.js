var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Books = require('../models/books');
var Verify = require('./verify');

var bookRouter = express.Router();

bookRouter.use(bodyParser.json());

bookRouter.route('/')
    .get(function(req, res, next) {
        Books.find(req.query)
            .populate('authors')
            .exec(function(err, dish) {
                if (err) next (err);
                res.json(dish);
            })
    })
    .post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {

        Books.create(req.body, function(err, book) {
            if (err) {
                console.log(err);
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Error when trying to save book');
            }else{
                console.log('Book created!');
                console.log(book);
                var id = book._id;

                //res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Added the Book with id: ' + id);
            }
        });
    });

bookRouter.route('/:bookId')
    .get(/*Verify.verifyOrdinaryUser,*/ function (req, res, next) {
        Books.findById(req.params.bookId, function (err, book) {
            if (err) next(err);
            res.json(book);
        })
    })
    .put(Verify.verifyAdmin, function (req, res, next) {
        Books.findByIdAndUpdate(req.params.bookId, {
            $set: req.body
        }, {new: true}, function (err, book) {
            if (err) next(err);
            res.json(book);
        });
    });

module.exports = bookRouter;
