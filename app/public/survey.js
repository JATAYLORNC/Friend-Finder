$("#survey-submit").on("click", function (event) {
  event.preventDefault();

  function validateForm() {
    var isValid = true;

    $(".aboutYou").each(function() {
      if ($(this).val() === "") {
          isValid = false;
      }
    });
  
    $(".question").each(function() {
      if ($(this).val() === "") {
          isValid = false;
      }
    });
    
    return isValid;
  }

  if(validateForm()) {

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

    var newFriend = {
      "name": name,
      "photo": photo,
      "scores": scores
    };

    $.post("/api/friends", newFriend)
    .then(function (res) {

        var friendName = res.name;
        var friendPhoto = res.photo;

        $("#friendName").text(friendName);
        $("#friendPhoto").attr("src", friendPhoto);

        console.log(res);

        $('#exampleModalCenter').modal();
    });
  } else {
    alert("Please make sure all fields are complete!");
  }
});
