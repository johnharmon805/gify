var all = {
    buttonArr: ["Tony-Hawk", "Photography", "Snowboarding", "Wine", "Cats", "Hackerman"],
    init: function(data) {
        for (var i = 0; i < all.buttonArr.length; i++) {
            all.addButton(all.buttonArr[i]);
        }
    },

    addButton: function(item) {
        $("#buttons").append("<button class='btn btn-primary btn-giphy small_margin' data-item=" + item + ">" + item + "</button>");
    },

};

$(function() {
    all.init();

    $("#add_button").on("click", function(event) {
        var btnText = $("#button_text").val().trim();

        if (btnText != "" && demo.buttonArr.indexOf(btnText)) {
            all.buttonArr.push(btnText);
            all.addButton(btnText);
            $("#button_text").val("");
        }
    });

    $("#button_text").keypress(function(event) {
        if (event.which == 13) {
            $("#add_button").click();
        }
    });

    $(document.body).on('click', '.btn-giphy', function(event) {
        $("#gifs").empty();

        $.ajax({
                url: "https://api.giphy.com/v1/gifs/search",
                method: 'GET',
                data: {
                    q: $(this).data("item"),
                    api_key: "PrL6HlV0Ye1hiyBtBmcOswXc6VBY1P8B",
                    limit: "10"
                }
            })
            .done(function(response) {

                for (var i = 0; i < response.data.length; i++) {

                    var template = "<div class='large_margin'>" +
                        "<p>Rating: " + response.data[i].rating.toUpperCase() + "<br/>" +
                        "<img src='" + response.data[i].images.fixed_height_still.url + "' " +
                        "data-still='" + response.data[i].images.fixed_height_still.url + "' " +
                        "data-animate='" + response.data[i].images.fixed_height.url + "' " +
                        "data-state='still' " +
                        "class='gif-pause'>"
                    "</div>";


                    $("#gifs").append(template);
                }
            });
    });


    $(document.body).on('click', function(event) {
        if ($(this).data("state") === "still") {
            $(this).attr("src", $(this).data("animate"));
            $(this).data("state", "animate");
        } else {
            $(this).attr("src", $(this).data("still"));
            $(this).data("state", "still");
        }
    });
});