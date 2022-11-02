const router = require('express').Router()
const {stream} = require('../controllers/stream.controller')

router.get('/:collection/:video', stream)

module.exports = router