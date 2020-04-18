const express = require('express')
const mongoose = require("mongoose")

const app = express()

app.get("/",(req, res, next)=>{
	res.send("Welcome")
})

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