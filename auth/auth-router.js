const router = require('express').Router();
const Auth = require("./auth-model");
const bycrpt = require("bcryptjs");

router.post('/register', async (req, res, next) => {
  // implement registration
  try {
    const {username, password} = req.body;
    const user = await Auth.findBy({username}).first()
    console.log("Made it to 1");
    if(user) {
      return res.status(409).json({
        message: "User already exists"
      })
    }
    console.log("Made it to 2");
    const newUser = await Auth.add({username, password: await bycrpt.hashSync(password, 8)})
    console.log("Made it to 3");
    res.status(201).json(newUser);
    
  } catch(err) {
    next(err);
  }
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
