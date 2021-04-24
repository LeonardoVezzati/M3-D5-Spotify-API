let previousSearchQuery = ""
function updateSearch(element) {
    if (element.value.length < 3) return
    if (element.value === previousSearchQuery) return
    previousSearchQuery = element.value
    // #TODO: Rewrite everything here
    searchAPI(element.value)
}

function searchAPI(query) {
    query = query.toLowerCase()
    fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=" + query)
        .then(res => res.json())
        .then(res => {
            unPackdata(res)
        })
}

function unPackdata(result) {
    let parent = document.getElementById("album-spawn")
    parent.innerHTML = ""
    displayedAlbums = []
    for (const item of result.data) {
        getAlbumById(item.album.id)
    }
}

function getAlbumById(id) {
    fetch("https://striveschool-api.herokuapp.com/api/deezer/album/" + id)
        .then(res => res.json())
        .then(res => {
            populateAlbumEntry(res)
        })
}

function getArtistById(id) {
    fetch("https://striveschool-api.herokuapp.com/api/deezer/artist/" + id)
        .then(res => res.json())
        .then(res => {
            return res
        })
}

/*function stripDataFromAPI (data, type) {
    switch (type) {
        
        case "album":
            return data[0].album.id
        case "artist":
            return data[0].artist.id
        default:
            break;
    }
}*/

function populateAlbums(albums) {
    let finishedAlbums = []
    console.log(albums)
    for (const album of albums) {
        if (finishedAlbums.find(album) !== undefined) continue
        populateAlbumEntry(album)
        finishedAlbums.push(album)
    }
}

let displayedAlbums = []
function populateAlbumEntry(album) {
    let parent = document.getElementById("album-spawn")

    if (displayedAlbums.find(x => x === album.id)) return

    let template = `
    <!-- Start Template -->
        <div id="album${album.id}" class="col col-12 col-sm-6 col-md-4 col-lg-2 p-2">
        <a href='./albumpage.html?album=${album.id}'><img src="${album.cover_big}" class="img-fluid mb-1 homePageImage" /></a>
        <p class="mt-2 font-weight-bold">${album.title}</p>
        </div>
    <!-- End Template -->`
    parent.innerHTML += template
    displayedAlbums.push(album.id)
}
