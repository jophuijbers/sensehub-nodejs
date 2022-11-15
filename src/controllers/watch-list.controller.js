const {getCollectionById} = require('../services/collection.service')
const {getWatchList, addCollectionToWatchList, removeCollectionFromWatchList} = require('../services/watch-list.service')

const showWatchList = async (request, response, next) => {
    try {
        const watchList = await getWatchList(request.user)
        response.json(watchList)
    } catch (error) {
        next(error)
    }
}

const addToWatchList = async (request, response, next) => {
    try {
        const collection = await getCollectionById(request.params.id)
        const watchList = await addCollectionToWatchList(request.user, collection)
        response.json(watchList)
    } catch (error) {
        next(error)
    }
}

const removeFromWatchList = async (request, response, next) => {
    try {
        const collection = await getCollectionById(request.params.id)
        const watchList = await removeCollectionFromWatchList(request.user, collection)
        response.json(watchList)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    showWatchList,
    addToWatchList,
    removeFromWatchList,
}