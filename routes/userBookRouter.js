/**
 * Created by igor on 24/09/2016.
 */

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var UserBook = require('../models/userBook');
var Verify = require('./verify');

var userBookRouter = express.Router();

userBookRouter.use(bodyParser.json());

userBookRouter.route('/')
    .get(function(req, res, next) {
        UserBook.find(req.query)
            .populate('user')
            .populate('book')
            .exec(function(err, dish) {
                if (err) next (err);
                res.json(dish);
            })
    })
    .post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {

        UserBook.create(req.body, function(err, userBook) {
            if (err) {
                console.log(err);
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Error when trying to save userBook');
            }else{
                console.log('Book created!');
                console.log(userBook);
                var id = userBook._id;

                //res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Added the UserBook with id: ' + id);
            }
        });
    });

module.exports = userBookRouter;