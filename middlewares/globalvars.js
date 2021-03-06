module.exports = (req, res, next)=>{
	if(req.user){
		const { _id , first_name, last_name, email, picture } = req.user
		res.locals.first_name = first_name
		res.locals.userId = _id
		res.locals.last_name = last_name
		res.locals.email = email
		res.locals.picture = picture
		res.locals.user = req.user
	}else{
		res.locals.user = req.user || null
	}
	next()
}