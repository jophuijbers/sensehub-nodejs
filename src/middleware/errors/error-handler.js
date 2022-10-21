const errorHandler = (error, request, response, next) => {
    if(process.env.NODE_ENV !== 'production') {
        console.log(error.stack)
    }

    const status = error.status || 500

    response.status(status).send(error.message)
}

module.exports = errorHandler