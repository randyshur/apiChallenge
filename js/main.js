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
    document.getElementById("formError").innerText = msg
}

function displayResults(json) {

     console.log('Display Results', json);
     var size = Object.keys(json).length;
     //let songList =  json['title'];
     //song = JSON.parse(json[0]);
     let i=1;
     for (x of json) {
        //console.log(json[0].title);
        //console.log(json[0].artist.name)
        document.getElementById("cell"+i).innerHTML = '<p>' + x.title +  '<br>by ' x.artist.name + '</p>'
        console.log(x.title);
        console.log(x.artist.name)
        i++;
     }

}

function submitForm(song, artist) {
    document.getElementById("formButton").style.display = 'none';
    document.getElementById("formSubmit").style.display = 'block';

    ////////////

    let url = '';
    let formattedSong = '"' + song.replace(' ','%20') + '"';
    let formattedArtist = '"' + artist.replace(' ','%20') + '"';

    //console.log(formattedSong);

    // Different url if we specify song
    if (song != '') {
        url = baseURL + songSearch + formattedSong + ',' + formattedArtist;
    } else {
        url = baseURL + artistSearch + formattedArtist;
    }
    
    console.log('URL:', url);

    fetch(url)
        .then(function (result) {
            console.log(result)
            return result.json();
        })
        .then(function (json) {
            console.log(json);
            displayResults(json);
        })

    /////////


}
document.getElementById("myForm").addEventListener("submit", event => {
    event.preventDefault();
    document.getElementById("formError").style.display = 'none';

    let song = document.getElementById("song").value.trim();
    let artist = document.getElementById("artist").value.trim();

    //console.log('xxx' + document.getElementById("song").value);
    //console.log('yyy' + song);

    if (song == '' && artist == '') {
        displayError('Song or Artist Required');
    } else {
        submitForm(song, artist);
    }

});