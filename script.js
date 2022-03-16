var url = "https://api.lyrics.ovh/suggest/";

const loadingLyrics = (name, title) => {
    fetch(`https://api.lyrics.ovh/v1/${title}/${name}`)
        .then(res => res.json())
        .then(data => {
            if (data.lyrics == undefined) {

                document.getElementById('LyricsReader').innerHTML = 'sorry not found';
            }
            else {
                document.getElementById('LyricsReader').innerText = data.lyrics;
            }
        })
}

//---show datas
const showData = (lyricsdata) => {
    const { data } = lyricsdata;
    let html = "";

    data.forEach(element => {
        const { artist, title, id, preview } = element;
        html += `<div id="resultsShow">  
                   <div class="lyricsSearchings">
                     <p id="lyricsInfo"> <span class="lyricsName">
                       <img src="${artist.picture_small}"> ${artist.name} </span> ${id} ${title}</img> 
                     </p>
                   </div>
                   <div class = "audioLyrics"> 
                    <audio controls>
                     <source src=${preview} type="audio/mpeg">
                    </audio>
                   </div>
                  <button id="lyricsDetails" onclick="loadingLyrics('${title}','${artist.name}')">  
                    get Lyrics </button> 
                 </div>
                        `
        show.innerHTML = " " + html;
    });
}

//async loading promise 
async function loadingData() {
    var inputs = document.getElementById("inputs").value;
    const response = await fetch(url + `${inputs}`);
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
    const lyricsdata = await response.json();
    showData(lyricsdata)
}