// Dependencies
// =============================================================
var express = require("express");
var router = express.Router();

var myfriends = require("../data/friends");

var friends = myfriends.friends;

// Route that sends the user to the Survey Page
router.get("/api/friends", function (req, res) {
  return res.json(friends);
});

// Create New Friend - takes in JSON input
router.post("/api/friends", function (req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware

  var newFriend = req.body;

  console.log(newFriend);

  var bestFriend = [];
  

  for(i=0; i<friends.length; i++) {
    var score = friends[i].scores;
    var newScore = newFriend.scores;

    var difference = score.map(function(item, index) {
      // In this case item correspond to currentValue of array a, 
      // using index to get value from array b
      return parseInt(item) - parseInt(newScore[index]);
    });

    console.log(difference);

    var totalDifference = difference.reduce(function(total, num) {
      return total + num;
    });

    // console.log(totalDifference);

    bestFriend.push(totalDifference);

    } 

    console.log(bestFriend);

    var minIndex = bestFriend.indexOf(Math.min(...bestFriend));

    console.log (minIndex);

    friends.push(newFriend);

    console.log(friends[minIndex]);

    res.json(friends[minIndex]);
    
  });


module.exports = router;
