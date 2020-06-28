const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { User } = require('../models');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secretTokenHere'
}

const strategy = new JwtStrategy(options, (payload, done) =>{
    User.findOne({
            id: payload.id
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
});

module.exports = strategy;