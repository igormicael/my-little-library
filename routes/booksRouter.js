var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Books = require('../models/books');
var Verify = require('./verify');

var bookRouter = express.Router();

bookRouter.use(bodyParser.json());

bookRouter.route('/')
    .get(function(req, res, next) {
        /*Dishes.find({}, function(err, dish) {
         if (err) throw err;
         res.json(dish);
         });*/
        Books.find(req.query)
            //.populate('categories.value')
            .exec(function(err, dish) {
                if (err) next (err);
                res.json(dish);
            })
    })
    .post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {

        Books.create(req.body, function(err, book) {
            if (err) next (err);
            console.log('Books created!');
            console.log(book);
            var id = book._id;

            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Added the Book with id: ');
        });
    })
    /*.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
        Dishes.remove({}, function(err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });*/

module.exports = bookRouter;
