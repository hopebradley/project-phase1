
document.addEventListener('DOMContentLoaded', () => {

    let artworkContainer = document.querySelector('#artwork-container');

    //this function would take data from a fetch and the keyword the user typed in
   
    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=flowers`)
    .then(resp => resp.json())
    .then(data => {
        const objectArray = data.objectIDs;
        const randomID = Math.floor(Math.random() * 100);
        console.log(objectArray[randomID]);
        displayArtwork(objectArray[randomID], "flowers");
    });

    function displayArtwork(artworkID, keyword) {
        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${artworkID}`)
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            return buildArtwork(data, keyword);
        });
    }

    function buildArtwork(data, keyword) {
        if (artworkContainer.firstChild) {
            artworkContainer.removeChild(artworkContainer.firstChild);
        }
        const fullWork = document.createElement('div');
        const thisIsYourWord = document.createElement('p');
        const title = document.createElement('h2');
        const artist = document.createElement('h3');
        const medium = document.createElement('p');
        const picture = document.createElement('img');

        let nameOrNo = "";

        if (data.artistDisplayName) {
            nameOrNo = `By ${data.artistDisplayName}`;
        }
        else {
            nameOrNo = "Unknown Artist";
        }
        
        thisIsYourWord.innerHTML = `Here's a random artwork related to "${keyword}"!`;
        title.innerHTML = data.title;
        artist.innerHTML = nameOrNo;
        medium.innerHTML = data.medium;
        picture.src = data.primaryImage;

        fullWork.id = "full-work";
        fullWork.appendChild(thisIsYourWord);
        fullWork.appendChild(title);
        fullWork.appendChild(artist);
        fullWork.appendChild(medium);
        fullWork.appendChild(picture);

        artworkContainer.appendChild(fullWork);
    }









})