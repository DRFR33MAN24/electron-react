const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const bcryptjs = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const fs = require("fs");
const path = require("path");
const glob = require("glob");
const userFolder = "./users_data";

router.post("/", async (req, res) => {
  try {
    employees = await User.findAll({
      raw: true,
      nest: true
    });
  } catch (error) {
    console.log(error);
  }

  res.json(employees);
});

// @route POST api/users
// @desc Register New User
// @acces Public
router.post("/add", auth, async (req, res) => {
  console.log("add Employee called");
  const { name, phone, password, type, nationality } = req.body;
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
  if (req.user.isManager !== true) {
    return res.status(400).json({ msg: "Not allowed to manage employees" });
  }

  if (!name || !phone || !password || !type || !nationality) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check for exitsting user
  let user = await User.findOne(
    { where: { phone: `${phone}` } },
    { plain: true }
  );
  if (user) {
    return res.status(400).json({ msg: "User alerady exists." });
  }

  // const newUser = new User({
  //   name,
  //   email,
  //   password
  // });
  const newUser = User.build({
    name: `${name}`,
    phone: `${phone}`,
    password: `${password}`,
    country: `${nationality}`,
    isManager: type === "manager",
    active: true
  });

  // Create salt and hash

  bcryptjs.genSalt(10, (err, salt) => {
    bcryptjs.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save().then(user => {
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
                phone: user.phone,
                active: user.active
              }
            });
          }
        );
      });
    });
  });
  let newDir = userFolder + "/" + phone;
  let srcDir = userFolder + "/" + req.user.id.toString() + "/draft.jpeg";
  console.log(newDir, srcDir);
  if (!fs.existsSync(newDir)) {
    fs.mkdirSync(newDir);
    fs.copyFileSync(
      srcDir,
      newDir + "/profile.jpeg",
      fs.constants.COPYFILE_EXCL,
      () => {
        console.log("profile image copied successfully!");
      }
    );
  }
});

router.get("/getImg", auth, async (req, res) => {
  //console.log('Image Route Called');
  //console.log(req.headers);
  const { phone } = req.phone;
  console.log(phone);
  const profile = glob.sync(
    path.join(__dirname, "../..", userFolder, phone, "profile.*")
  );
  //console.log(profile[0]);
  fs.access(profile[0], error => {
    //  if any error
    if (error) {
      console.log(error);
      return;
    }
  });

  //res.contentType("png");
  res.sendFile(profile[0]);
});

module.exports = router;
