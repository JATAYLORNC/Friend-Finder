// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var router = express.Router();

// Route that sends the user to the Survey Page
router.get("/survey", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/survey.html"));
});

// Catch-all route that sends the user to the Home Page
router.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/home.html"));
});

//export the router
module.exports = router;