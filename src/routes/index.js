const router = require('express').Router()
const {errorHandler, notFoundHandler} = require('../middleware/errors')

router.use(notFoundHandler)
router.use(errorHandler)

module.exports = router