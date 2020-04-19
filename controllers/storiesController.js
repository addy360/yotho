const Story = require('../models/Story')
exports.getIndex = (req, res, next)=>{
	Story.find({status:"public"})
	.populate("user")
	.then(stories=>{
		const data=[]
		stories.map(str=>{
			const { allow_comments, _id, title, body, user:{ email, picture, first_name, last_name }, status, date } = str
			data.push({story:{allow_comments, id:_id, title, email, picture, status, last_name, first_name, date, body}})
		})
		res.render('stories/index',{data})
	})
	.catch(err=>{
		console.log(err)
		res.render('stories/index')
	})
}

exports.getAdd = (req, res, next)=>{
	res.render('stories/add')
}

exports.postAdd = (req, res, next)=>{
	let { body, title, allow_comments, status } = req.body
	const { _id } = req.user
	allow_comments = allow_comments ? true : false
	const newStory={
		title, body, allow_comments, status, user:_id
	}
	new Story(newStory).save()
	.then(story=>{
		res.redirect(`/stories/show/${story._id}`)
	})
	.catch(err=>{
		console.log(err)
		res.redirect('/stories/add')
	})
}

exports.getShow = (req, res, next)=>{
	const { id } = req.params
	Story.findById(id)
	.populate("user")
	.then(story=>{
		const { allow_comments, _id, title, body, status, user:{first_name, last_name, email, picture}, comments, date } = story
		const user_id = story.user._id
		const data = {
			user_id,allow_comments, id:_id, title, body, status, first_name, last_name, email, picture, comments, date
		}
		console.log(data)
		res.render('stories/show', data)
	})
	.catch(err=>{
		console.log(err)
		res.render('stories/show')
	})
}
exports.getEdit = (req, res, next)=>{
	const { id } = req.params
	Story.findOne({_id:id})
	.then(story=>{
		const { allow_comments, _id, title, status, body, user, comments, date } = story
		const data = {allow_comments, _id, status, title, body}
		res.render('stories/edit',{data})
	})
	.catch(err=>{
		console.log(err)
		res.render('stories/edit')
	})
}

exports.postEdit = (req, res, next)=>{
	let { id, title, status, allow_comments, body } = req.body
	allow_comments = allow_comments ? true : false
	const updateStory={
		title, body, allow_comments, status, 
	}
	Story.findOneAndUpdate({_id:id},updateStory)
	.then(data=>{
		console.log(data)
		res.redirect(`/dashboard`)
	})
	.catch(err=>{
		console.log(err)
		next(err)
	})
}
exports.deletePost = (req, res, next)=>{
	const { id } = req.body
	Story.findOneAndDelete({_id:id})
	.then(data=>{
		res.redirect('/dashboard')
	})
	.catch(err=>{
		console.log(err)
		next(err)
	})
}