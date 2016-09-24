/**
 * Created by igor on 24/09/2016.
 */

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Series = require('../models/series');
var Verify = require('./verify');

var seriesRouter = express.Router();

seriesRouter.use(bodyParser.json());

seriesRouter.route('/')
    .get(function(req, res, next) {
        Series.find(req.query)
            .populate('books')
            .exec(function(err, dish) {
                if (err) next (err);
                res.json(dish);
            })
    })
    .post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {

        Series.create(req.body, function(err, series) {
            if (err) {
                console.log(err);
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Error when trying to save series');
            }else{
                console.log('series created!');
                console.log(series);
                var id = series._id;

                //res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Added the series with id: ' + id);
            }
        });
    });

module.exports = seriesRouter;
