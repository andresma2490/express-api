const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const FacebookStrategy = require('passport-facebook');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User, SocialUser } = require('../models');

module.exports = function(passport) {
    // JWT 
    passport.use(new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
    }, (payload, done) =>{
        User.findOne({
            where: {
                id: payload.id
            }
        })
        .then(user =>{
            if(user){
                console.log("user found");
                done(null, user);
            }else{
                console.log("user not found");
                done(null, false);
            }
        })
        .catch(error =>{
            console.log(error);
        });
    }));
    
    // SocialJWT 
    passport.use('socialJWT', new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
    }, (payload, done) =>{
        SocialUser.findOne({
            where: {
                id: payload.id
            }
        })
        .then(user =>{
            if(user){
                console.log("socialUser found");
                done(null, user);
            }else{
                console.log("socialUser not found");
                done(null, false);
            }
        })
        .catch(error =>{
            console.log(error);
        });
    }));

    // Facebook
    passport.use('facebook', new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "/api/users/auth/facebook/callback",
        profileFields: ['id', 'emails', 'displayName']
    }, (accessToken, refreshToken, profile, done) =>{
        
        //console.log('access', accessToken);
        //console.log('refresh', refreshToken);
        //console.log('profile', profile);
    
        SocialUser.findOne({
            where: {
                id: profile.id
            }
        })
        .then(user =>{
            if(user){
                return done(null, user);
            }else{
                SocialUser.create({
                    id: profile.id,
                    email: profile.emails[0].value,
                    provider: profile.provider,
                    username: profile.displayName
                })
                .then(newUser =>{
                    return done(null, newUser);
                })
                .catch(error =>{
                    console.log(error);
                });

                return null; // promises always return  
            }
        })
        .catch(error =>{
            console.log(error);
        });
    }));

    // Google
    passport.use('google', new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/users/auth/google/callback"
    }, (accessToken, refreshToken, profile, done) =>{
        
        //console.log('access', accessToken);
        //console.log('refresh', refreshToken);
        //console.log('profile', profile);
    
        SocialUser.findOne({
            where: {
                id: profile.id
            }
        })
        .then(user =>{
            if(user){
                return done(null, user);
            }else{
                SocialUser.create({
                    id: profile.id,
                    email: profile.emails[0].value,
                    provider: profile.provider,
                    username: profile.displayName 
                })
                .then(newUser =>{
                    return done(null, newUser);
                })
                .catch(error =>{
                    console.log(error);
                });

                return null; // promises always return  
            }
        })
        .catch(error =>{
            console.log(error);
        });
    }));


}
