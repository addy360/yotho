const express = require('express')
const passport = require('passport')
const mongoose = require("mongoose")
const session = require('express-session')

const authRoutes = require('./routes/authRoutes')
const globalVars = require('./middlewares/globalvars')
const app = express()


// passport
require('./config/passport')(passport)
app.use(session({
  secret: 'supersecretkeyword',
  resave: false,
  saveUninitialized: false,
}))


app.use(passport.initialize());
app.use(passport.session());
app.get("/",(req, res, next)=>{
	res.send("Welcome")
})

app.use(globalVars)

app.use('/auth', authRoutes)

mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_KEY}@yotho-shard-00-00-rragg.mongodb.net:27017,yotho-shard-00-01-rragg.mongodb.net:27017,yotho-shard-00-02-rragg.mongodb.net:27017/yotho?ssl=true&replicaSet=Yotho-shard-0&authSource=admin&retryWrites=true&w=majority`,{
	useNewUrlParser:true,
	useUnifiedTopology:true
})
.then(()=>{
	app.listen(process.env.PORT,()=>{
		console.log(`server started and listening at port ${process.env.PORT}`)
	})	
})
.catch(err=>{
	console.log(err)
})