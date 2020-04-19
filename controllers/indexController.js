const Story = require('../models/Story')
exports.getIndex = (req, res, next)=>{
	res.render("index/index")
}

exports.getAbout = (req, res, next)=>{
	res.render("index/about")
}
exports.getDashboard = (req, res, next)=>{
	const { user } = req
	Story.find({user:user._id})
	.then(stories=>{
		const data = []
		stories.map(str=>{
			const { allow_comments, _id, status, title, body, comments, date } = str
			data.push({story:{_id, allow_comments, status, title, body, comments, date}})
		})
		console.log(data)
		res.render("index/dashboard",{data})
	})
	.catch(err=>{
		res.render("index/dashboard")
		console.log(err)
	})
}