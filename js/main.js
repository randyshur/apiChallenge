/*
API Challenge

songsterr
http://www.songsterr.com/a/ra/songs.xml?pattern=Marley
http://www.songsterr.com/a/ra/songs/byartists.xml?artists=Metallica,"Led%20Zeppelin"

if we have artist only
    need byartist.json
else use basic string with pattern

important to make spaces %20 (function ?)
quote strings, separate by comma

*/

let baseURL = "http://www.songsterr.com/a/ra/songs"
let songSearch = ".json?pattern="
let artistSearch = "/byartists.json?artists="

function displayError(msg) {
    document.getElementById("formError").style.display = 'block';
    document.getElementById("formError").innerText = msg;
}

function displayResults(json) {

    var size = Object.keys(json).length;

    let i = 1;
    for (x of json) {
        document.getElementById("p" + i).innerHTML = x.title.substring(0,40) + '<br>by ' + x.artist.name.substring(0,20);
        i++;
    }

}

function submitForm(song, artist) {

    let searchMessage = '';
    let url = '';
    let formattedSong = '"' + song.replace(' ', '%20') + '"';
    let formattedArtist = '"' + artist.replace(' ', '%20') + '"';

    // Different url if we specify song
    if (song != '') {
        url = baseURL + songSearch + formattedSong + ',' + formattedArtist;
    } else {
        url = baseURL + artistSearch + formattedArtist;
    }

    // Display search nessage
    if (song != '') {
        searchMessage = "Song contains " + song;
    }
    if (artist != '') {
        searchMessage += " Artist contains " + artist;
    }
    document.getElementById("formError").style.display = 'block';
    document.getElementById("formError").innerText = searchMessage;

    // clear search
    document.getElementById("song").value = '';
    document.getElementById("artist").value = '';

    fetch(url)
        .then(function (result) {
            console.log(result)
            return result.json();
        })
        .then(function (json) {
            console.log(json);
            displayResults(json);
        })

}
document.getElementById("myForm").addEventListener("submit", event => {
    event.preventDefault();
    document.getElementById("formError").style.display = 'none';

    let song = document.getElementById("song").value.trim();
    let artist = document.getElementById("artist").value.trim();

    if (song == '' && artist == '') {
        displayError('Song or Artist Required');
    } else {
        submitForm(song, artist);
    }

});