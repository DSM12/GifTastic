$(document).ready()

// Topic array (TV Shows)
var telev = ["Game Of Thrones", "Avatar: The Last Airbender", "The Wire", "The Sorpranos", "Money Heist"];



function renderButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < telev.length; i++) {
        var tvshow = $("<button>");
        tvshow.addClass("show");
        tvshow.attr({ "data-name": telev[i] });
        tvshow.text(telev[i]);
        $("#buttons-view").append(tvshow);
        console.log(telev[i]);
    }
}

renderButtons();

$("#buttons-view").on("click", function () {

    tvshow = $(this).data("name");

    var queryURL = "http://api.giphy.com/v1/gifs/search?api_key=daeosb9obEnVYmPLuV0prqRjfv1fKZfA&q=tv+shows" + tvshow + "&limit=10&offset=0&rating=G&lang=en";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .done(function (response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");
                var rating = results[i].rating;
                var pTag = $("<p>").text("Rating: " + rating);
                var showImage = $("<img>");

                showImage.attr("src", results[i].images.fixed_height.url);

                gifDiv.append(pTag);
                gifDiv.append(showImage);

                $("gifs-appear-here").prepend(gifDiv);

            }
        });
});

$("#add-tvshow").on("click", function (event) {
    event.preventDefault();
    var choice = $("#tvshow-input").val().trim();
    telev.push(choice);
    renderButtons();
});

$(".gif").on("click", function(){
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});