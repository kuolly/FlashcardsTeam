const { Router } = require("express");
const router = Router();
const userModel = require("../model/user.model");
const bcrypt = require("bcrypt");
const {questionModel1, questionModel2, questionModel3} = require("../model/questionModel")

router.get("/signin", (req, res) => {
  res.render("signin");
});

router.get('/first', (req, res) => {
  const question1 = await questionModel1.find()
  res.render("questionForm1", question1)
})

router.get('/second', (req, res) => {
  const question2 = await questionModel2.find()
  res.render("questionForm2", question2)
})

router.get('/third', (req, res) => {
  const question3 = await questionModel3.find()
  res.render("questionForm3", question3)
})

router.post("/signin", async (req, res) => {
  const { name, email, password } = req.body;
  if (name && email && password) {
    const hashPass = await bcrypt.hash(password, 10);
    console.log(hashPass);
    const currentUser = await userModel.create({
      name,
      email,
      password: hashPass,
    });
    console.log(currentUser);
    if (currentUser) {
      req.session.user = {
        id: currentUser._id,
      };
      return res.status(200).redirect("/");
    }
    return res.status(418).redirect("/signin");
  }
  return res.status(418).redirect("/signin");
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.redirect("/");

    res.clearCookie(req.app.get("cookieName"));
    return res.redirect("/");
  });
});

module.exports = router;
