const Story = require('../models/Story')
exports.isAuth = (req, res, next)=>{
	if(!req.user) return res.redirect('/')
		next()
}

exports.isGuest = (req, res, next)=>{
	if(req.user) return res.redirect('/dashboard')
	next()
}

exports.storyOwner = (req, res, next)=>{
	const {user:{_id}} = req
	const post_id = req.params.id || req.body.id
	Story.findOne({_id:post_id,user:_id})
	.then(str=>{
		if(!str) return redirect('/dashboard')
		next()
	})
	.catch(err=>{
		next(err)
	})
}