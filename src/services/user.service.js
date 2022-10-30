const User = require('../models/user')

const getAllUsers = async () => {
    return User.find()
}

const getUserById = async (id) => {
    return User.findById(id)
}

const createUser = async (payload) => {
    const user = new User(payload)

    await user.save()

    return user
}

const deleteUser = async (id) => {
    await User.deleteOne({ _id: id })
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser
}