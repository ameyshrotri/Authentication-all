const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const userModel = require("./models/user");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/create", (req, res) => {
  let { username, email, password, age } = req.body;
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      let cuser = await userModel.create({
        username,
        email,
        password: hash,
        age,
      });

      let token = jwt.sign({ email }, "shhh");
      res.cookie("token", token);
      res.send(cuser);
    });
  });
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.post("/login", async function (req, res) {
  let user = await userModel.findOne({ email: req.body.email });
  if (!user) {
    return res.send("User not found");
  }

  bcrypt.compare(req.body.password, user.password, function (err, result) {
    if (err) {
      return res.status(500).send("Error comparing passwords");
    }
    if (result) {
      let token = jwt.sign({ email: user.email }, "shhh");
      res.cookie("token", token);
      res.send("Login successful");
    } else {
      res.send("Incorrect password");
    }
  });
});

app.get("/logout", function (req, res) {
  res.cookie("token", "");
  res.redirect("/");
});

app.listen(4000);
