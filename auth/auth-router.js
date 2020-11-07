const router = require('express').Router();
const Auth = require("./auth-model");
const bycrpt = require("bcryptjs");
const { json } = require('express');

router.post('/register', async (req, res, next) => {
  // implement registration
  try {
    const {username, password} = req.body;
    const user = await Auth.findBy({username}).first()
    // console.log("Made it to 1");
    if(user) {
      return res.status(409).json({
        message: "User already exists"
      })
    }
    console.log("Made it to 2");
    const newUser = await Auth.add({username, password: await bycrpt.hashSync(password, 8)})
    // console.log("Made it to 3");
    res.status(201).json(newUser);
    
  } catch(err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  // implement login
  try{
    const {username, password} = req.body;
    const userData = await Auth.findBy({username}).first();

    if(!userData) {
      return res.status(401).json({
        message: "User not found",
      })
    }

    const passwordValid = await bycrpt.compare(password, userData.password)

    if(!passwordValid) {
      return res.status(401).json({
        message: "Incorrect password"
      })
    }

      req.session.user = userData;

      res.json(({
        message: `${userData.username} has logged in`
      }))
    
  } catch(err) {
    next(err)
  //   res.status(500).json({
  //     message: "Error",
  //   })
  }
})

module.exports = router;
