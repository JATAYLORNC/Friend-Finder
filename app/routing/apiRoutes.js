// Dependencies
// =============================================================
var express = require("express");
var router = express.Router();

//mounts the friends object array from friends.js
var myfriends = require("../data/friends");
var friends = myfriends.friends;

// Route that sends the user the friends object array
router.get("/api/friends", function (req, res) {
  return res.json(friends);
});

// Create New Friend - takes in JSON input
router.post("/api/friends", function (req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware

  //variable to handle newFriend object post from the user
  var newFriend = req.body;

  //variable to hold sum of answer differences between new Friend and each
  //person already in friends.
  var bestFriend = [];
  

  //loop through each person object in friends object array
  for(i=0; i<friends.length; i++) {

    //variable to hold scores array for friend[i]
    var score = friends[i].scores;

    //variable to hold scores from user
    var newScore = newFriend.scores;

    //map performs function on each "item" in "score" array
    var difference = score.map(function(item, index) {
      // In this case item correspond to currentValue of array score, 
      // using index to get value for array newScore
      // This works because both arrays are of identical length

      //compute absolute value of difference between array 1 and 2 for each item 
      return Math.abs(parseInt(item) - parseInt(newScore[index]));
    });

    //reduce the array to one number based on the function that sums up all of the values
    var totalDifference = difference.reduce(function(total, num) {
      return total + num;
    });

    // console.log(totalDifference);

    //push the sum of the differences to the bestFriend array 
    bestFriend.push(totalDifference);

    } 

    //find the index of the smallest value in the bestFriend array
    //this index will match with the index of the person in the friends array
    var minIndex = bestFriend.indexOf(Math.min(...bestFriend));

    //push the newFriend object for user into the friends array
    friends.push(newFriend);

    //return the best match friend object to the front end survey.js
    res.json(friends[minIndex]);
    
  });

//export the router
module.exports = router;
