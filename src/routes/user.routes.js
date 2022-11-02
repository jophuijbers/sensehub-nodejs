const router = require('express').Router()
const {indexUsers, storeUser, destroyUser} = require('../controllers/user.controller')

router.get('/', indexUsers)

router.post('/', storeUser)

router.delete('/:id', destroyUser)

module.exports = router