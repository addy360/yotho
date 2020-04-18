const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
	googleId:{type:String, required:true},
	first_name:{type:String, required:true},
	last_name:{type:String, required:true},
	email:{type:String, required:true},
	picture:{type:String, required:true},
})

module.exports = mongoose.model("User",UserSchema)