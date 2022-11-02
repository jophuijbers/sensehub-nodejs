const router = require('express').Router()
const userRoutes = require('./user.routes')
const {errorHandler, notFoundHandler} = require('../middleware/errors')

router.use('/users', userRoutes)

router.use(notFoundHandler)
router.use(errorHandler)

module.exports = router