exports.getIndex = (req, res, next)=>{
	res.render("index/index")
}

exports.getDashboard = (req, res, next)=>{
	res.send("Dashboard")
}