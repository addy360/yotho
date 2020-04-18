const router = require('express').Router()
const passport = require('passport')
const { getGoogle, getGoogleCallback, getGoogleCallbackOnSuccess, logout } = require('../controllers/authController')
router.get("/google", getGoogle)
router.get("/logout", logout)
router.get('/google/callback',getGoogleCallback,getGoogleCallbackOnSuccess)
module.exports = router