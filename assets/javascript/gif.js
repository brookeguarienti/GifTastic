$(document).ready(function () {

    // initial array of shows
    var topics = ["Gilmore Girls", "New Girl", "The Office", "Schitt's Creek", "The Ranch", "Bones", "Stranger Things", "The Good Place", "Grey's Anatomy", "Criminal Minds", "Supernatural", "Parks and Recreation", "Charmed", "Dexter", "Royal Pains", "Glee", "NCIS"];

    // displayShows function renders the HTML to display the appropriate content
    function displayShows() {

        // grab and store the data-name property value from the button
        var shows = $(this).attr("data-name");

        // constructing the queryURL using the shows variable
        var queryURL = "http://api.giphy.com/v1/gifs/search?&q=" + shows + "&api_key=R1uAUqzCjidqM7cUG8cMQjrSHm7lqy9a&limit=10&rating=pg";

        // create an ajax call with the queryURL and GET method
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // call clear function 
            clear();
            // results variable holds response from ajax request
            var results = response.data;
            // console.log variable results
            console.log(results);

            // looping through each item in the results array
            for (var i = 0; i < results.length; i++) {
                // create and store a div tag and give it class 'show'
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

                // give and set "data-still" to the showImage var to the original still img response
                showImage.attr("data-still", results[i].images.original_still.url);
                // give and set "data-animate" to the showImage var to the original img response
                showImage.attr("data-animate", results[i].images.original.url);
                // give and set the "data-state" to still 
                showImage.attr("data-state", "still")
                // add class 'gif' to each showImage var
                showImage.addClass("gif")
            }

            // this function will aid in the pausing and animating of the gif
            // add an on click function to the class "gif"
            $(".gif").on("click", function () {
                // grab each object with class "gif" and add "data-state" and set this equal to var state
                var state = $(this).attr("data-state");
                // loop through results 
                for (var i = 0; i < results.length; i++) {
                    // if the clicked image's state is still, update its src attribute to what its data-animate value is, then set the image's data-state to animate
                    if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                        // otherwise, set src to the data-still value
                    } else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                    }
                }
            });
        });

    }
    // function to clear gifs displayed on the page
    function clear() {
        $("#show-view").empty();
    }
    // function to bring about buttons to the page
    function renderButtons() {
        $("#buttons-view").empty();
        // loop through topics array 
        for (var i = 0; i < topics.length; i++) {
            // create a button and give it the variable "a"
            var a = $("<button>");
            // add a class to that button "show-btn"
            a.addClass("show-btn");
            // add the attribute "data-name" and set it to each string in the array
            a.attr("data-name", topics[i]);
            // add the text from the string in the array to display on the button
            a.text(topics[i]);
            // append var a to "buttons-view"
            $("#buttons-view").append(a);
        }
    }
    // on click event for adding a new show to the array of buttons
    $("#add-show").on("click", function (event) {
        event.preventDefault();
        // grab the value entered into "show-input" and set to var show 
        var show = $("#show-input").val().trim();
        // push this show into the array topics
        topics.push(show);
        // render the buttons (including the newly created button)
        renderButtons();
    });
    // when a button with "show-btn" class is clicked, displayShows function
    $(document).on("click", ".show-btn", displayShows);
    // call renderButtons function
    renderButtons();
}); 