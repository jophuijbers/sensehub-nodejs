const Collection = require('../models/collection')
const {saveVideos, updateVideos} = require('../utils/video.util')
const {saveImage} = require('../utils/image.util')

const filterCollections = async (filters) => {
    return Collection.find(filters).sort({ updatedAt: -1 })
}

const getCollectionById = async (id) => {
    return Collection.findById(id)
}

const createCollection = async (payload) => {
    const collection = new Collection({
        name: payload.name,
        creator: payload.creator.toJSONCreator(),
        videos: saveVideos(payload.name)
    })

    if (payload.image) collection.image = saveImage(payload.name, payload.image)
    if (payload.tags) collection.tags = payload.tags.split(' ')

    await collection.save()

    return collection
}

const updateCollection = async (id, payload) => {
    const collection = await getCollectionById(id)

    if (payload.name) {
        collection.name = payload.name
        collection.videos = updateVideos(collection)
    }

    if (payload.image) collection.image = saveImage(payload.name, payload.image)
    if(payload.tags) collection.tags = payload.tags.split(' ')

    return collection.save()
}

const deleteCollection = async (id) => {
    return Collection.deleteOne({ _id: id })
}

module.exports = {
    filterCollections,
    getCollectionById,
    createCollection,
    updateCollection,
    deleteCollection
}