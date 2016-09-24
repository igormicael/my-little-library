var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Authors = require('../models/authors');
var Verify = require('./verify');

var authorRouter = express.Router();

authorRouter.use(bodyParser.json());

authorRouter.route('/')
    .get(function(req, res, next) {
        Authors.find(req.query)
            .exec(function(err, dish) {
                if (err) next (err);
                res.json(dish);
            })
    })
    .post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {

        Authors.create(req.body, function(err, author) {
            if (err) {
                console.log(err);
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Error when trying to save book');
            }else{
                console.log('Author created!');
                console.log(author);
                var id = author._id;

                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Added the author with id: ' + id);
            }
        });
    });

module.exports = authorRouter;
