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

module.exports = router;