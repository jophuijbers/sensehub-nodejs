const setAuthHeader = (request, response, next) => {
    if (!request.query.token) return response.sendStatus(401)

    request.headers['authorization'] = `Bearer ${request.query.token}`

    next()
}

module.exports = setAuthHeader