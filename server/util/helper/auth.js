const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 12;
const Config = require('../../config');

const AuthHelper = {
  hashPassword: async(password) => {
    try {
      const hash = await bcrypt.hash(password, saltRounds);
      return hash;
    } 
    catch(err) {
      throw(err);
    }
  },
  compareHash : async(password, hash) => {
    try { 
      const matches = await bcrypt.compare(password, hash);
      return matches;
    }
    catch(err) {
      throw(err);
    }
  },
  generateToken : async(user) => {
    const jwtSigningOptions = {
      expiresIn : '1d'
    };

    return await jwt.sign(user, Config.JWT_SECRET, jwtSigningOptions)
  }
}

module.exports = AuthHelper;
