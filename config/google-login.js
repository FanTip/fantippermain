var passport = require('passport');
var googleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../models/user');
var mongoose = require('mongoose');

passport.use('google', new googleStrategy({
    clientID : '358968116641-0jnhgv8m97h4dj5kheijj3stt2tf3ohc.apps.googleusercontent.com',
    clientSecret : 'Zq0fvZOOTIlNAXJsQpc6xz_x',
    callbackURL: 'https://fantipper.herokuapp.com/auth/google/callback' || 'http://localhost:3000/auth/google/callback' ,
    profileFields : ['emails','picture.type(large)','name']
},
    function(accessToken, refreshToken, profile, done){
        console.log(profile);
        User.findOne({'googleID' : profile.id}, function(err, user){
            if(err){
              return done(err);
            }
            if(user){
              return done(null, user);
            }else{
                console.log(profile);
              var NewUser = new User();
              NewUser._id = new mongoose.Types.ObjectId();
              NewUser.googleID = profile.id;
              NewUser.accessToken = accessToken;
              NewUser.name = profile.name.givenName + ' ' + profile.name.familyName;
              NewUser.email = profile.emails[0].value;
              NewUser.imagepath = profile.photos[0].value;
              NewUser.creator.isCreator = false;
              NewUser.creator.creatorName = 'None provided';
              NewUser.creator.creatorNameuser = 'None provided';
              NewUser.creator.creatorCategories = null;
              NewUser.creator.creatorUrl = 'None provided';
              NewUser.creator.creatorLocation = 'None provided';
              NewUser.creator.creatorEmail = 'None Provided';
              NewUser.creator.creatorTileImage = '/images/example.jpg';
              NewUser.card.isCard = false;
              
              NewUser.save(function(err){
                if(err){
                  throw err;
                }
                return done(null, NewUser);
              });
            }
          });
    }

));

passport.serializeUser(function(user, cb) {
    cb(null, user);
  });
  
  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });