'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Post Schema
 */
var PostSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    text: {
        type: String,
        required: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

/**
 * Validations
 */
PostSchema.path('text').validate(function(text) {
    return text.length;
}, 'Post text cannot be blank');

/**
 * Statics
 */
PostSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Post', PostSchema);
