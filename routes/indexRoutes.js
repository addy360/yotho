const router = require('express').Router()
const { getIndex, getDashboard } = require('../controllers/indexController')

router.get('/', getIndex)
router.get('/dashboard', getDashboard)




module.exports = router