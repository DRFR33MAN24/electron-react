const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const User = require("../../models/User");


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
router.post("/add", async (req, res) => {
    console.log('add Employee called');
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
    if (req.user.isManager !== 'manager') {
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
        isManager: type === 'manager'
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
});

module.exports = router;