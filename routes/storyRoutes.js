const router = require('express').Router()
const { getIndex, getAdd, postAdd, getShow, deletePost, postEdit, getEdit } = require('../controllers/storiesController')
const { isAuth } = require('../middlewares/isAuth')

router.get('/', getIndex)
router.get('/add', getAdd)
router.get('/show/:id', getShow)
router.get('/edit/:id', getEdit)
router.post('/add', postAdd)
router.post('/edit', postEdit)
router.post('/delete', deletePost)





module.exports = router