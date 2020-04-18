const passport = require('passport')
exports.getGoogle = passport.authenticate('google',{ 
	scope: ['profile','email'] 
})

exports.getGoogleCallback = passport.authenticate('google', { failureRedirect: '/' })
exports.getGoogleCallbackOnSuccess = (req, res, next)=>{
	res.redirect('/dashboard');
} 

exports.logout = (req, res, next)=>{
	req.logout()
	res.redirect('/')
}
