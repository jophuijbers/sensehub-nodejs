const router = require('express').Router()
const fileUpload = require('express-fileupload')
const {isAdmin} = require('../middleware/auth')
const {index, show, store, update, destroy} = require('../controllers/collection.controller')

router.use(fileUpload({
    createParentPath: true
}))

router.get('/', index)

router.get('/:id', show)

router.post('/', isAdmin, store)

router.patch('/:id', isAdmin, update)

router.delete('/:id', isAdmin, destroy)

module.exports = router