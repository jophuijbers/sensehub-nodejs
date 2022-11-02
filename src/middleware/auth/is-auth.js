const {verifyToken} = require('../../utils/jwt.util')
const {getUserById} = require('../../services/user.service')

const isAuth = async (request, response, next) => {
    const authHeader = request.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return response.sendStatus(401)

    try {
        const jwtPayload = verifyToken(token)

        request.user = await getUserById(jwtPayload.id)
    } catch (error) {
        return response.sendStatus(403)
    }

    next()
}

module.exports = isAuth