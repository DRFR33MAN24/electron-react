const express = require("express");
const cors = require('cors');
const config = require("config");
const path = require("path");
const db = require("./database");
const User = require("./models/User");

const app = express();
app.use(cors());
app.use(express.json());



db.authenticate()
    .then(() => {
        console.log("Authenticated");
        db.sync({ force: false });
        //db.close();
    })
    .catch(err => {
        console.log("Unable to connect", err);
    });

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

app.use("/api/stats", require("./routes/api/stats"));


// Serve static assets if in production

// app.use(express.static("build"));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   console.log(path.resolve(__dirname, "client", "build", "index.html"));
// });

//app.use(express.static("app"));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "app", "index.html"));
//   console.log(path.resolve(__dirname, "app", "index.html"));
// });

/* GET React App */
// app.get(["/app", "/app/*"], function (req, res, next) {
//     res.sendFile(path.join(__dirname, "app", "index.html"));
//     console.log("check");
// });

const port = process.env.PORT || 5000;

app.listen(port);