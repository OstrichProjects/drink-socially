'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Game = mongoose.model('Game');

//Globals
var user;
var game;

//The tests
describe('<Unit Test>', function() {
    describe('Model Game:', function() {
        beforeEach(function(done) {
            user = new User({
                name: 'Full name',
                email: 'test@test.com',
                username: 'user',
                password: 'password'
            });

            user.save(function() {
                game = new Game({
                    title: 'Game Title',
                    description: 'Game Description',
                    rules: ['rule1','rule2','rule3'],
                    user: user
                });

                done();
            });
        });

        describe('Method Save', function() {
            it('should be able to save without problems', function(done) {
                return game.save(function(err) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without title', function(done) {
                game.title = '';

                return game.save(function(err) {
                    should.exist(err);
                    done();
                });
            });
        });

        afterEach(function(done) {
            game.remove();
            user.remove();
            done();
        });
    });
});