const User = require('../models/user')

const getAllUsers = async () => {
    return User.find()
}

const getUserById = async (id) => {
    return User.findById(id)
}

const getUserByUsername = async (username) => {
    return User.findOne({ username: username })
}

const createUser = async (payload) => {
    const user = new User(payload)

    await user.save()

    return user
}

const deleteUser = async (id) => {
    await User.deleteOne({ _id: id })
}

const checkCredentials = async (username, password) => {
    const user = await getUserByUsername(username)

    const isAuth = await user?.comparePassword(password)

    return isAuth ? user : null
}

const addVideoToWatched = async (user, video) => {
    if (user.watched.includes(video.id))
        return

    user.watched.push(video.id)

    await user.save()
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser,
    checkCredentials,
    addVideoToWatched
}