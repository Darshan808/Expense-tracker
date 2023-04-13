
import pkg from 'passport-jwt';
const JwtStrategy = pkg.Strategy;
const ExtractJwt = pkg.ExtractJwt;
import User from '../models/User.js';
import * as dotenv from 'dotenv';
dotenv.config();

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;


export default (passport)=>{
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {  
        User.findOne({_id: jwt_payload.id}).then((user)=>{
            if(user){
                return done(null,user);
            } else{
                return done(null,false);
            }
        }).catch((err)=>{
            return done(err,false);
        })
    // passport.use(new JwtStrategy(opts, function(jwt_payload, done) {     
    //     User.findOne({id: jwt_payload.sub}, function(err, user) {
    //         if (err) {
    //             return done(err, false);
    //         }
    //         if (user) {
    //             return done(null, user);
    //         } else {
    //             return done(null, false);
    //             // or you could create a new account
    //         }
    //     });
    }));
}