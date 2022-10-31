const router = require('express').Router()
const {isAdmin} = require('../middleware/auth')
const {indexUsers, showAuthUser, storeUser, destroyUser} = require('../controllers/user.controller')

router.get('/', isAdmin, indexUsers)

router.get('/me', showAuthUser)

router.post('/', isAdmin, storeUser)

router.delete('/:id', isAdmin, destroyUser)

module.exports = router