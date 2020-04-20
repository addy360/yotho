const router = require('express').Router()
const { getIndex, getAdd, postAdd, getUserStories, getShow, deletePost, postEdit, getEdit, postComment } = require('../controllers/storiesController')
const { isAuth, storyOwner } = require('../middlewares/isAuth')

router.get('/', getIndex)
router.get('/add', getAdd)
router.get('/show/:id', getShow)
router.get('/user/:id',getUserStories )
router.get('/edit/:id',isAuth, storyOwner, getEdit)
router.post('/add', isAuth, postAdd)
router.post('/edit',isAuth, storyOwner, postEdit)
router.post('/comment', postComment)
router.post('/delete',isAuth, storyOwner, deletePost)





module.exports = router