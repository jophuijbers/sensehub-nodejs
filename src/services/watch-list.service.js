const User = require('../models/user')

const getWatchList = async (user) => {
    const { watchList } = await User.findById(user.id)
        .populate('watchList')

    return watchList
}

const addCollectionToWatchList = async (user, collection) => {
    if (user.watchList.includes(collection.id))
        return

    user.watchList.push(collection.id)

    await user.save()

    return await getWatchList(user)
}

const removeCollectionFromWatchList = async (user, collection) => {
    if (!user.watchList.includes(collection.id))
        return

    user.watchList.remove(collection.id)

    await user.save()

    return await getWatchList(user)
}

module.exports = {
    getWatchList,
    addCollectionToWatchList,
    removeCollectionFromWatchList
}