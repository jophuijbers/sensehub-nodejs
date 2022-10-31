const router = require('express').Router()

const authRoutes = require('./auth.routes')
const userRoutes = require('./user.routes')
const collectionRoutes = require('./collection.routes')

const {isAuth} = require('../middleware/auth')
const {errorHandler, notFoundHandler} = require('../middleware/errors')


router.use('/auth', authRoutes)

router.use('/users', isAuth, userRoutes)

router.use('/collections', isAuth, collectionRoutes)

router.use(notFoundHandler)
router.use(errorHandler)

module.exports = router