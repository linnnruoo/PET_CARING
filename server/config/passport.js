const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const Config = require('./index');

const UserModel = require('../models/User');

passport.use('register', new LocalStrategy(
  { 
    usernameField: 'email',  
    passwordField: 'password',
    passReqToCallback: true
  }, 
  async (req, email, password, done) => {
    if (!req.body.firstname || !req.body.lastname || !req.body.role) {
      return done(null, false, { message : 'Missing parameters in request'});
    }
    if ( !(req.body.role == "petowner" || req.body.role == "caretaker")) {
      return done(null, false, { message : 'Invalid parameters in request'});
    }
    const { firstname, lastname, role} = req.body;
    try {
      const user = await UserModel.create(email, password, firstname, lastname, role);
      return done(null, user);
    } catch (error) {
      console.log(error);
      if (error.routine) {
        if (error.routine === '_bt_check_unique')
        {
          return done(null, false, { message : 'User with that email already exists!'})
        }
      } 
      else {
        done(error);
      }
    }
  }
));

passport.use('login', new LocalStrategy(
  { 
    usernameField: 'email',  
    passwordField: 'password'
  }, 
  async (email, password, done) => {
    try {
      const user = await UserModel.findOne(email);
      if (user) {
        const verified = await UserModel.verify(password, user.password);

        if (verified) {
          const { password , ...safeUser } = user;
          return done(null, safeUser);
        }
        else {
          return done(null, false, { message : 'Login credentials is not valid'});
        } 
      }
      else {
        return done(null, false, { message : 'Login credentials is not valid'});
      }
    } catch (error) {
      console.log(error);
      done(error);
    }
  }
));

let jwtOpts = {};
jwtOpts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOpts.secretOrKey = Config.JWT_SECRET;

passport.use(new JwtStrategy(jwtOpts, async(payload, done) => {
  const { iat, exp, ...userPart} = payload;   
  try {
    const user = await UserModel.findOneUsingToken(userPart.id, userPart.email);
    if (user) {
      return done(null, user);
    }
    else {
      done(null, false, {message : 'Login credentials is not valid'});
    }
  }
  catch (error) {
    done(error);
  }
}));
