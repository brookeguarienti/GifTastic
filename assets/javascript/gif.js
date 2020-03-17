$(document).ready(function () {

    // initial array of shows
    var topics = ["Gilmore Girls", "New Girl", "The Office", "Schitt's Creek", "The Ranch", "Bones", "Stranger Things", "The Good Place", "Grey's Anatomy", "Criminal Minds", "Supernatural", "Parks and Recreation", "Charmed", "Dexter", "Royal Pains", "Glee", "NCIS"];

    // displayMovieInfo function renders the HTML to display the appropriate content
    function displayShows() {

        // var queryURL = $.get("http://api.giphy.com/v1/gifs/search?q=animals&api_key=R1uAUqzCjidqM7cUG8cMQjrSHm7lqy9a&limit=5&rating=g");
        // queryURL.done(function (data) { console.log("success got data", data); });


        var shows = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?&q=" + shows + "&api_key=R1uAUqzCjidqM7cUG8cMQjrSHm7lqy9a&limit=10&rating=g";
        


        // create an ajax call for the specific show button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            //creating a div to hold the show
            var showDiv = $("<div class='show'>");

            //storing the rating data
            var rating = response.rating;
            console.log(queryURL);
            
            console.log(response.rating);
        })


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