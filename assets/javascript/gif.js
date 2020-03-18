$(document).ready(function () {

    // initial array of shows
    var topics = ["Gilmore Girls", "New Girl", "The Office", "Schitt's Creek", "The Ranch", "Bones", "Stranger Things", "The Good Place", "Grey's Anatomy", "Criminal Minds", "Supernatural", "Parks and Recreation", "Charmed", "Dexter", "Royal Pains", "Glee", "NCIS"];

    // displayMovieInfo function renders the HTML to display the appropriate content
    function displayShows() {

        // grab and store the data-name property value from the button
        var shows = $(this).attr("data-name");

        // constructing the queryURL using the shows variable
        var queryURL = "http://api.giphy.com/v1/gifs/search?&q=" + shows + "&api_key=R1uAUqzCjidqM7cUG8cMQjrSHm7lqy9a&limit=10&rating=pg";

        // create an ajax call with the queryURL
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            clear();
            // results variable holds response from ajax request
            var results = response.data;
            // console.log variable results
            console.log(results);

            // looping through each item in the results array
            for (var i = 0; i < results.length; i++) {
                // create and store a div tag
                var showDiv = $("<div class='shows'>");
                // create a paragraph tag and store result item's rating within it 
                var pRating = $("<p>").text("Rating: " + results[i].rating);
                // create and store an image tag
                var showImage = $("<img>");
                // set the src attribute of the img to a property from the results item
                showImage.attr("src", results[i].images.original_still.url);
                // append paragraph and image tag to the showDiv div
                showDiv.append(showImage);
                showDiv.append(pRating);
                // prepend showDiv to the html page within the show-view div
                $("#show-view").prepend(showDiv);


                showImage.attr("data-still", results[i].images.original_still.url);

                showImage.attr("data-animate", results[i].images.original.url);

                showImage.attr("data-state", "still")

                showImage.addClass("gif")
            }

            
            $(".gif").on("click", function () {
                var state = $(this).attr("data-state");

                for (var i = 0; i < results.length; i++) {

                    if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                    } else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                    }
                }
            });
        });

    }
    function clear() {
        $("#show-view").empty();
    }

    function renderButtons() {
        $("#buttons-view").empty();

        for (var i = 0; i < topics.length; i++) {

            var a = $("<button>");

            a.addClass("show-btn");

            a.attr("data-name", topics[i]);

            a.text(topics[i]);

            $("#buttons-view").append(a);
        }
    }

    $("#add-show").on("click", function (event) {
        event.preventDefault();

        var show = $("#show-input").val().trim();

        topics.push(show);

        renderButtons();
    });

    $(document).on("click", ".show-btn", displayShows);

    renderButtons();
}); 