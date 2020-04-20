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
	  	const { sub, given_name, family_name, picture, email } = profile._json
	    	User.findOne({googleId:sub})
	    	.then(user=>{
	    		if(user) return cb(null, user)
	    		const newUser = {
	    			googleId:sub,
	    			first_name:given_name,
	    			last_name:family_name,
	    			email,picture
	    		}
	    		new User(newUser).save()
	    		.then(user=>{
	    			cb(null,user)
	    		})
	    		.catch(err=>cb(err))
	    	})
	    	.catch(err=>cb(err))
	  }
	));

	passport.serializeUser((user, done)=> {
	  done(null, user.id);
	});
	 
	passport.deserializeUser((id, done)=> {
	  User.findById(id,  (err, user)=> {
	    done(err, user);
	  });
	});

}