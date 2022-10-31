const mongoose = require('mongoose')
const collectionSchema = require('./collection.schema')
const {getImagePath} = require('../../utils/image.util')
const {getStreamPath} = require('../../utils/video.util')

collectionSchema.methods.toJSON = function() {
    return {
        id: this._id,
        name: this.name,
        imagePath: getImagePath(this.image),
        creator: this.creator,
        tags: this.tags,
        length: this.videos.length > 1?
            this.videos.length :
            this.videos[0].duration,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    }
}

collectionSchema.methods.withVideos = function(user) {
    return {
        id: this._id,
        name: this.name,
        imagePath: getImagePath(this.image),
        creator: this.creator,
        videos: this.videos.map(video => {
            return {
                id: video._id,
                name: video.name,
                path: getStreamPath(this._id, video.id),
                duration: video.duration,
                hasWatched: user.hasWatched(video)
            }
        }),
        tags: this.tags,
        length: this.videos.length,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    }
}

module.exports = mongoose.model('Collection', collectionSchema)