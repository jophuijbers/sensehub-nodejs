const {getAllUsers, createUser, deleteUser} = require('../services/user.service')

const indexUsers = async (request, response, next) => {
    try {
        const users = await getAllUsers()
        response.status(200).json(users)
    } catch (error) {
        next(error)
    }
}

const storeUser = async (request, response, next) => {
    const payload = {
        username: request.body.username,
        password: request.body.password,
        role: request.body.role
    }

    try {
        const newUser = await createUser(payload)
        response.status(201).json(newUser)
    } catch (error) {
        next(error)
    }
}

const destroyUser = async (request, response, next) => {
    try {
        await deleteUser(request.params.id)
        response.sendStatus(204)
    } catch(error) {
        next(error)
    }
}

module.exports = {
    indexUsers,
    storeUser,
    destroyUser
}