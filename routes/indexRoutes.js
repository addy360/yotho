const router = require('express').Router()
const { getIndex, getAbout, getDashboard } = require('../controllers/indexController')

const { isAuth, isGuest } = require('../middlewares/isAuth')

router.get('/', isGuest, getIndex)
router.get('/about', getAbout)
router.get('/dashboard', isAuth, getDashboard)




module.exports = router