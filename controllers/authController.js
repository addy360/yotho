const passport = require('passport')
exports.getGoogle = passport.authenticate('google',{ 
	scope: ['profile','email'] 
})

exports.getGoogleCallback = passport.authenticate('google', { failureRedirect: '/login' })
exports.getGoogleCallbackOnSuccess = (req, res, next)=>{
	res.redirect('/');
} 
