const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");
const { getUser, setUser } = require("../service/auth");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  // return res.render("home")
  return res.redirect("/");
}

async function handleUserSignin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user)
    return res.render("login", {
      error: "Invalid Username or Password",
    });

  // const sessionId = uuidv4();
  const token = setUser(user);
  res.cookie("token", token);
  return res.redirect("/");
  // return res.render("home")


  // sending token as a json response
  // return res.json({ token })
}

module.exports = {
  handleUserSignup,
  handleUserSignin,
};
