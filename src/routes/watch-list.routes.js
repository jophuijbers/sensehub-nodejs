const router = require('express').Router()
const {showWatchList, addToWatchList, removeFromWatchList} = require('../controllers/watch-list.controller')

router.get('/', showWatchList)

router.post('/:id', addToWatchList)

router.delete('/:id', removeFromWatchList)

module.exports = router