const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User')
module.exports = (passport)=>{
	passport.use(new GoogleStrategy({
	    clientID: process.env.GOOGLE_CLIENT_ID,
	    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
	    callbackURL: "/auth/google/callback",
	    proxy:true
	  },
	  (accessToken, refreshToken, profile, cb)=> {
	  	const { sub, name, picture, email } = profile._json
	    // User.findOrCreate({ googleId: profile.id },  (err, user)=> {
	    //   return cb(err, user);
	    // });
	  }
	));

}