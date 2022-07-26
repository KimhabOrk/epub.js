var book = ePub();
var rendition;

var inputElement;

function init() {
    inputElement = document.getElementById("input");

    inputElement.addEventListener('change', function (e) {
        var file = e.target.files[0];
        if (window.FileReader) {
            var reader = new FileReader();
            reader.onload = openBook;
            reader.readAsArrayBuffer(file);
        }
    });
}

function openBook(e) {
    var bookData = e.target.result;
    var title = document.getElementById("title");
    var next = document.getElementById("next");
    var prev = document.getElementById("prev");

    book.open(bookData, "binary");
    console.log("opened book")
    console.log(book)
    /*rendition = book.renderTo("viewer", {
    width: "100%",
    height: "100%"
    });*/
    var rendition = book.renderTo("viewer", {
        //manager: "continuous",
        flow: "paginated",
        width: "100%",
        height: "100%",
        snap: true
    });

    rendition.display();

    var keyListener = function (e) {

        // Left Key
        if ((e.keyCode || e.which) == 37) {
            rendition.prev();
        }

        // Right Key
        if ((e.keyCode || e.which) == 39) {
            rendition.next();
        }

    };

    rendition.on("keyup", keyListener);
    rendition.on("relocated", function (location) {
        console.log(location);
    });

    next.addEventListener("click", function (e) {
        console.log(rendition)
        rendition.next();
        e.preventDefault();
    }, false);

    prev.addEventListener("click", function (e) {
        rendition.prev();
        e.preventDefault();
    }, false);




    document.addEventListener("keyup", keyListener, false);
}
function playPause() {
    document.querySelectorAll('audio').forEach(audio => {
        audio.play();
        // audio.addEventListener('play', () => {

        //     const currentPlaying = getCurrentlyPlayingAudio();
        //     console.log('current playing audio:', currentPlaying);
        // });
    });
}