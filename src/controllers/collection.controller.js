const {getPastDate} = require('../utils/date.util')
const {filterCollections, createCollection, getCollectionById, updateCollection, deleteCollection} = require('../services/collection.service')

const index = async (request, response, next) => {
    let filters = {}
    if (request.query.search) filters = {
        $or: [
            { name: {$regex: request.query.search, $options: 'i'} },
            { tags: {$regex: request.query.search, $options: 'i'} }
        ]
    }
    else if (request.query.tag === 'recent') filters = {
        updatedAt: { $gt: getPastDate(7, 'd') }
    }
    else if (request.query.tag) filters = { tags: request.query.tag }

    try {
        const collections = await filterCollections(filters)
        response.json(collections)
    } catch (error) {
        next(error)
    }
}

const show = async (request, response, next) => {
    try {
        const collection = await getCollectionById(request.params.id)
        response.json(collection.withVideos(request.user))
    } catch (error) {
        next(error)
    }
}

const store = async (request, response, next) => {
    const payload = {
        name: request.body.name,
        creator: request.user,
        image: request.files?.image,
        videos: request.videos,
        tags: request.body.tags
    }

    try {
        const newCollection = await createCollection(payload)
        response.status(201).json(newCollection)
    } catch (error) {
        next(error)
    }
}

const update = async (request, response, next) => {
    const payload = {
        name: request.body.name,
        image: request.files?.image,
        videos: request.videos,
        tags: request.body.tags
    }

    try {
        const collection = await updateCollection(request.params.id, payload)

        response.json(collection)
    } catch(err) {
        next(err)
    }
}

const destroy = async (request, response, next) => {
    try {
        await deleteCollection(request.params.id)

        response.sendStatus(204)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    index,
    show,
    store,
    update,
    destroy
}