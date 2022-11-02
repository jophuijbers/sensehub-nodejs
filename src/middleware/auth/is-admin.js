const isAdmin = async (request, response, next) => {
    const isAdmin = request.user.role === 'admin'

    if (!isAdmin) return response.sendStatus(403)

    next()
}

module.exports = isAdmin