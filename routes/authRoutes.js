const router = require('express').Router()
const passport = require('passport')
const { getGoogle, getGoogleCallback, getGoogleCallbackOnSuccess } = require('../controllers/authController')
router.get("/google", getGoogle)

router.get('/google/callback',getGoogleCallback,getGoogleCallbackOnSuccess)
module.exports = router