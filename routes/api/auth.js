const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
//const axios = require("axios");
const { stringify } = require("query-string");
// User Model
const User = require("../../models/User");
const fs = require('fs');
const path = require("path");
const userFolder = '/users_data';
// @route POST api/auth
// @desc Auth the user
// @acces Public
router.post("/", async (req, res) => {
  const { phone, password } = req.body;
  // Verify URL
  // const query = stringify({
  //   secret: config.get("reCAPTCHA"),
  //   response: req.body.token,
  //   remoteip: req.connection.remoteAddress
  // });
  // const verifyURL = `${config.get("verifyURL")}${query}`;
  // //console.log(verifyURL);
  // const body = await axios.get(verifyURL);
  //console.log(body.data);
  // if (body.data.success !== undefined && !body.data.success) {
  //   return res.status(400).json({ msg: "Failed captcha verification" });
  // }


  if (!phone || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  let user = await User.findOne({ where: { phone: phone } }, { plain: true });
  if (!user) {
    return res.status(400).json({ msg: "User Does not exists." });
  }
  if (user.active === false) {
    return res.status(400).json({ msg: "Please activate your account" });
  }

  // Validate password
  bcryptjs.compare(password, user.password).then(isMatch => {
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
    jwt.sign(
      { id: user.id },
      config.get("jwtSecret"),
      {
        expiresIn: 604800
      },
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user: {
            id: user.id,
            name: user.name,
            isManager: user.isManager,
            phone: user.phone,
            balance: user.balance,
            password: user.password,
            country: user.country,
            region: user.region,
            address: user.address,
            zip: user.zip,
            wallet: user.wallet
          }
        });
      }
    );
  });
});

router.get("/user", auth, async (req, res) => {
  //console.log("LoadUser Route");
  let user = await User.findAll({
    where: {
      id: req.user.id
    },
    plain: true
  });

  if (user.active === false) {
    return res.status(400).json({ msg: "Please activate your account" });
  }

  res.json(user);

  // User.findById(req.user.id)
  //   .select("-password")
  //   .then(user => res.json(user));
});
router.get("/img", auth, async (req, res) => {
  //console.log('Image Route Called');
  //console.log(req.headers);
  const profile = path.join(__dirname, '../..', userFolder, req.user.id.toString(10), 'profile.png');
  //console.log(profile);
  fs.access(profile, (error) => {
    //  if any error
    if (error) {
      console.log(error);
      return;
    }
  });

  res.contentType('png')
  res.sendFile(profile);
});


module.exports = router;
