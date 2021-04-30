const { Router } = require("express");
const router = Router();
const userModel = require("../model/user.model");
const bcrypt = require("bcrypt");


router.get("/signin", (req, res) => {
  res.render("signin");
});

router.get('/first', async (req, res) => {
  const question = await 
  res.render("questionForm1", {question})
})
// router.post('/second', (req, res) => {
  
//   res.redirect('/second')
// })
// router.post('/third', (req, res) => {
  
//   res.redirect('/third')
// })


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
