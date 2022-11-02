const {checkCredentials} = require('../services/user.service')

const login = async (request, response, next) => {
    try {
        const user = await checkCredentials(request.body.username, request.body.password)

        if (!user) return response.sendStatus(401)

        response.send(user.toAuthJSON())
    } catch(err) {
        next(err)
    }
}

module.exports = {
    login
}