/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

// module.exports = (req, res, next) => {
//   res.status(401).json({ you: 'shall not pass!' });
// };



// const bcrypt = require("bcryptjs");
// const Auth = require("./auth-model");


function restrict() {
  return async(req, res, next) => {
    try {
      if(!req.session || !req.session.user){
        return res.status(401).json({
          message: "You are restricted"
        })
      }
      next()
    }
   catch(err) {
    next(err)
  }
}
}


module.exports = {restrict, }


