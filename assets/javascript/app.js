// GIPHY API KEY: UJ4rcCIsCqw4544MYn2mPanM2ZuoI0fX 

$("button").on("click", function() {
  var title = $(this).attr("data-title");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    title + "&api_key=UJ4rcCIsCqw4544MYn2mPanM2ZuoI0fX&limit=10&rating=pg";

  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function(response) {
        console.log(response);
      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div class='item'>");

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var titleImage = $("<img>");
        titleImage.attr("src", results[i].images.fixed_height.url);

        gifDiv.prepend(p);
        gifDiv.prepend(titleImage);

        $("#gifs-appear-here").prepend(gifDiv);
      }
    });
});