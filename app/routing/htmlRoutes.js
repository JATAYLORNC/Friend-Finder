var express = require("express");
var path = require("path");
// var apiRoutes = require("./apiRoutes");

var router = express.Router();

// router.use("/api/friends", apiRoutes);

// Route that sends the user to the Survey Page
router.get("/survey", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/survey.html"));
});

// Catch-all route that sends the user to the Home Page
router.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/home.html"));
});

module.exports = router;