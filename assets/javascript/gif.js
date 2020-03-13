$(document).ready(function () {

    var array = ["cats", "gerbals", "chickens", "lions"]

    var queryUrl = $.get("http://api.giphy.com/v1/gifs/search?q=animals&api_key=R1uAUqzCjidqM7cUG8cMQjrSHm7lqy9a&limit=5&rating=g");
    queryUrl.done(function (data) { console.log("success got data", data); });

});