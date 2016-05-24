var page = 1;
function getApiURL(url) {
    const API_ROOT = "https://api.dribbble.com/v1";
    const ACCESS_TOKEN = "712b8222f4a84771aff2009c800882f77221e2c2057db757e2ed8ecff713022d";
    return API_ROOT + url + "?access_token=" + ACCESS_TOKEN + "&page=" + page;
}

function loadImages() {
    var xhr = new XMLHttpRequest();
    downloading = true;
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            console.log(JSON.parse(xhr.responseText));


            insertImages(JSON.parse(xhr.responseText));
            downloading = false;
        }
    };

    xhr.open("GET", getApiURL("/shots"), true);
    xhr.send();
    page++;
}

function insertImages(data) {
    var mainContainer = $("#container");
    for (var i = 0; i < data.length; i++) {
        var imageContainer = $("<div/>")
            .addClass("imageContainer");

        var overlay = $("<div/>")
            .addClass("overlay");

        var overlayWithContent = $("<div/>")
            .addClass("overlayWithContent");

        var imageTitle = $("<p/>")
            .text(data[i].title)
            .addClass("imageTitle");

        var heart = $("<div/>").addClass("heart");

        var imageAuthor = $("<p/>")
            .text(data[i].user.name)
            .addClass("imageAuthor");

        var favouriteButton = $("<button/>").text("Favourite")
            .addClass("favouriteButton")
            .prop("id", "button" + data[i].id);

        console.log();
        var width = $(window).width();
        var img = $("<img/>").prop("id", data[i].id).addClass("image");

        if(width < 200){

                img.prop("src", data[i].images.teaser);
        } else if(width > 1500){
                img.prop("src", data[i].images.hidpi);
        } else{
                img.prop("src", data[i].images.normal);
        }


        imageContainer.append(img);
        imageContainer.append(overlay);
        imageContainer.append(heart);
        imageContainer.append(overlayWithContent);
        overlayWithContent.append(imageTitle);
        overlayWithContent.append("<hr/>");
        overlayWithContent.append(imageAuthor);
        overlayWithContent.append(favouriteButton);
        mainContainer.append(imageContainer);
    }
}

$(window).on("scroll", function () {
    var $document = $(document);
    var $window = $(this);

    if (($document.scrollTop() >= $document.height() - $window.height() - 400) && (downloading === false)) {
        downloading = true;
        loadImages()
    }
});

$(document).on("mouseenter", ".imageContainer", function () {
    $(this).find(".overlay").show();
    $(this).find(".overlayWithContent").show();
});

$(document).on("mouseleave", ".imageContainer", function () {
    $(this).find(".overlayWithContent").hide();
    $(this).find(".overlay").hide();

});

$(document).on("click", ".favouriteButton", function () {
    $(this).closest('.overlayWithContent').siblings(".heart").toggle();
});

