const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('index'))



router.use((req, res, next) => req.session.currentUser ? next() : res.redirect("/login"))


router.get("/profile", (req, res) => res.render("profile"));


module.exports = router