const mongoose = require('mongoose')

const Schema = mongoose.Schema

const StorySchema = new Schema({
	title:{type:String, required:true},
	body:{type:String, required:true},
	allow_comments:{type:Boolean, default:true},
	status:{type:String, required:true},
	comments:[{
		comment_body:{type:String, required:true},
		comment_date:{type:Date , default:Date.now},
		comment_user:{type:Schema.Types.ObjectId, ref:"User"}
	}],
	user:{type:Schema.Types.ObjectId, ref:"User"},
	date:{type:Date , default:Date.now}
})

module.exports = mongoose.model("Story",StorySchema)