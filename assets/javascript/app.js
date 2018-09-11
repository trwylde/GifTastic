// GIPHY API KEY: UJ4rcCIsCqw4544MYn2mPanM2ZuoI0fX 

var topics = ["The Notebook", "Water for Elephants", "Anna Karenina", "The Lion, the Witch and the Wardrobe",
              "The Wizard of Oz", "The Princess Bride", "The Godfather", "Gone With the Wind", "The Hobbit",   
              "Silver Linings Playbook", "Testament of Youth", "Citizen Kane", "Hidden Figures", "Gone Girl",
               "The Hunger Games"];

var numberOfGIFs = 10;
var cutOffRating = "PG";

function renderButtons(){
	for(var i = 0; i < topics.length; i++) {
		var newButton = $("<button>");
		newButton.addClass("btn");
		newButton.addClass("bookTitle-button");
		newButton.text(topics[i]);
		$("#button-container").append(newButton);
	}
	$(".bookTitle-button").unbind("click");

	$(".bookTitle-button").on("click", function(){
		$(".gif-image").unbind("click");
		$("#gif-container").empty();
		populateGIFContainer($(this).text());
	});

}

function addButton(movie){
	if(topics.indexOf(movie) === -1) {
		topics.push(movie);
		$("#button-container").empty();
		renderButtons();
	}
}

function populateGIFContainer(movie){
	$.ajax({
		url: "https://api.giphy.com/v1/gifs/search?q=" + movie + 
		"&api_key=61TKqzUDPHfv40Bqr6iEsqqBCfa360mt&rating=" + cutOffRating + "&limit=" + numberOfGIFs,
		method: "GET"
	}).then(function(response){
		response.data.forEach(function(element){
			newDiv = $("<div>");
			newDiv.addClass("individual-gif-container");
			newDiv.append("<p>Rating: " + element.rating.toUpperCase() + "</p>");
			var newImage = $("<img src = '" + element.images.fixed_height_still.url + "'>");
			newImage.addClass("gif-image");
			newImage.attr("state", "still");
			newImage.attr("still-data", element.images.fixed_height_still.url);
			newImage.attr("animated-data", element.images.fixed_height.url);
			newDiv.append(newImage);
			$("#gif-container").append(newDiv);
		});
		
		$(".gif-image").unbind("click");
		$(".gif-image").on("click", function(){
			if($(this).attr("state") === "still") {
				$(this).attr("state", "animated");
				$(this).attr("src", $(this).attr("animated-data"));
			}
			else {
				$(this).attr("state", "still");
				$(this).attr("src", $(this).attr("still-data"));
			}
		});
	});
}

$(document).ready(function(){
	renderButtons();
	$("#submit").on("click", function(){
		event.preventDefault();
		addButton($("#user-fav-adaptation").val().trim());
		$("#user-fav-adaptation").val("");
	});
});




/*
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

// function for animating gifs
$(".gif").on("click", function() {
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("data-state");
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});
*/