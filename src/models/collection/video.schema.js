const mongoose = require('mongoose')
const {getDuration} = require('../../utils/video.util')

const videoSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: false
    }
})

videoSchema.pre('save', async function() {
    if(this.duration) return
    this.duration = await getDuration(this.path)
})

module.exports = videoSchema