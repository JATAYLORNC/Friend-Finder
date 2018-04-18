//call function when survey submit button is clicked
$("#survey-submit").on("click", function (event) {
  event.preventDefault();

  //function to validate if all fields in form have been filled out
  function validateForm() {

    //boolean indicating if fields have been filled out
    var isValid = true;

    //check if name or photo fields are empty
    $(".aboutYou").each(function() {
      if ($(this).val() === "") {
          isValid = false;
      }
    });
  
    //check if any of the questions are not answered
    $(".question").each(function() {
      if ($(this).val() === "") {
          isValid = false;
      }
    });
    
    return isValid;
  }

  //check if form fields are all complete
  if(validateForm()) {

    //capture input data into variables
    var name = $("#name").val().trim();
    var photo = $("#photo").val().trim();
    var scores = [
      parseInt($("#q1").val()),
      parseInt($("#q2").val()),
      parseInt($("#q3").val()),
      parseInt($("#q4").val()),
      parseInt($("#q5").val()),
      parseInt($("#q6").val()),
      parseInt($("#q7").val()),
      parseInt($("#q8").val()),
      parseInt($("#q9").val()),
      parseInt($("#q10").val())
    ];

    //create newFriend object from input
    var newFriend = {
      "name": name,
      "photo": photo,
      "scores": scores
    };

    //past newFriend Object to "/api/friends" route
    $.post("/api/friends", newFriend)
    .then(function (res) {

      //variables to hold best match response information
      var friendName = res.name;
      var friendPhoto = res.photo;

      //update modal popup field with best match name and photo
      $("#friendName").text(friendName);
      $("#friendPhoto").attr("src", friendPhoto);

      //activate modal popup
      $('#exampleModalCenter').modal();
    });
  } else {
    //alert user to fill in all fields
    alert("Please make sure all fields are complete!");
  }
});
