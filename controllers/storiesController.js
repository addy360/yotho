const Story = require('../models/Story')
exports.getIndex = (req, res, next)=>{
	Story.find({status:"public"})
	.populate("user")
	.sort({date:"desc"})
	.then(stories=>{
		renderStories(stories, req, res)
	})
	.catch(err=>{
		console.log(err)
		next(err)
	})
}

exports.getAdd = (req, res, next)=>{
	res.render('stories/add')
}

const renderStories = (stories, req, res)=>{
	const data=[]
		stories.map(str=>{
			const user_id = str.user._id
			const loggedInUser = req.user ? req.user._id : false
			const { allow_comments, _id, title, body, user:{ email, picture, first_name, last_name }, status, date } = str
			data.push({story:{allow_comments,loggedInUser , id:_id, user_id:user_id.toString(), title, email, picture, status, last_name, first_name, date, body}})
		})
		res.render('stories/index',{data})
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
		next(err)
	})
}

exports.getShow = (req, res, next)=>{
	const { id } = req.params
	Story.findById(id)
	.populate("user")
	.populate("comments.comment_user")
	.then(story=>{
		const { allow_comments, _id, title, body, status, user:{first_name, last_name, email, picture}, 
		comments, date } = story
		const cmts =[]
		comments.map(c=>{
			cmts.push({comment:{
				comentBody : c.comment_body,
				comentDate : c.comment_date,
				userPicture: c.comment_user.picture,
				userFname: c.comment_user.first_name,
				userLname: c.comment_user.last_name,
			
			}})
		}) 
		const user_id = story.user._id
		const data = {
			user_id,allow_comments, id:_id, title, body, status, first_name, last_name, email, picture, comments:cmts, date
		}
		res.render('stories/show', data)
	})
	.catch(err=>{
		console.log(err)
		next(err)
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
		next(err)
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

exports.postComment = (req, res, next)=>{
	const { comment, post_id } = req.body
	Story.findOne({_id:post_id})
	.then(story=>{
		const newComment = {
			comment_body:comment,
			comment_user:req.user._id
		}
		story.comments.unshift(newComment)
		story.save()
		.then(results=>{
			res.redirect(`/stories/show/${post_id}`)
		})
		.catch(err=>{
			console.log(err)
			next(err)
		})
	})
	.catch(err=>{
		console.log(err)
		next(err)
	})
}

exports.getUserStories = (req, res, next)=>{
	Story.find({status:"public",user:req.params.id})
	.populate("user")
	.sort({date:"desc"})
	.then(stories=>{
		renderStories(stories, req, res)
	})
	.catch(err=>{
		console.log(err)
		next(err)
	})
}