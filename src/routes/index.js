const router = require('express').Router()

const authRoutes = require('./auth.routes')
const userRoutes = require('./user.routes')

const {isAuth} = require('../middleware/auth')
const {errorHandler, notFoundHandler} = require('../middleware/errors')


router.use('/auth', authRoutes)

router.use('/users', isAuth, userRoutes)

router.use(notFoundHandler)
router.use(errorHandler)

module.exports = router