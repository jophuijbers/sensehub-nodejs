const {streamVideo} = require('../services/stream.service')
const {getCollectionById} = require('../services/collection.service')
const {addVideoToWatched} = require('../services/user.service')

const stream = async (request, response, next) => {
    try {
        const collection = await getCollectionById(request.params.collection)
        const video = collection.videos.find(v => v.id === request.params.video)

        streamVideo(video, request, response)

        await addVideoToWatched(request.user, video)
    } catch(error) {
        next(error)
    }
}

module.exports = {
    stream
}