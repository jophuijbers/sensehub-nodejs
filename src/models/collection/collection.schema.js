const mongoose = require('mongoose')
const videoSchema = require('./video.schema')

const collectionSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    creator: {
        type: Object,
        required: true
    },

    videos: [videoSchema],
    tags: [String],

}, {timestamps: true})

module.exports = collectionSchema