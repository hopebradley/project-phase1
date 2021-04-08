
document.addEventListener('DOMContentLoaded', () => {

    let artworkContainer = document.querySelector('#artwork-container');
   
////UPON PAGE LOAD, DO THIS
    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=flowers`)
    .then(resp => resp.json())
    .then(data => {
        const objectArray = data.objectIDs;
        const randomID = Math.floor(Math.random() * 100);
        displayArtwork(objectArray[randomID], 'Current keyword: flowers!');
    });


////FUNCTIONS

////fetches a specific artwork using its ID and calls buildArtwork on the artwork's data, displaying the correct work on the page
    function displayArtwork(artworkID, message) {
        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${artworkID}`)
        .then(resp => resp.json())
        .then(data => {
            return buildArtwork(data, message);
        });
    }
////creates the visual 'card' with the artwork's information and credits and appends this card to the existing container
////if there's already an artwork in the container, it removes it so that only one at a time is displayed
    function buildArtwork(data, message) {
        if (artworkContainer.firstChild) {
            artworkContainer.removeChild(artworkContainer.firstChild);
        }
        const searchResults = document.createElement('div');
        const fullWork = document.createElement('div');
        const thisIsYourWord = document.createElement('p');
        const title = document.createElement('h2');
        const artist = document.createElement('h3');
        const medium = document.createElement('p');
        const picture = document.createElement('img');
        const credits = document.createElement('p');

        let nameOrNo = "";
        data.artistDisplayName ? nameOrNo = `By ${data.artistDisplayName}` : nameOrNo = "Unknown Artist";
        
        thisIsYourWord.innerHTML = message;
        thisIsYourWord.id = "this-is-your-keyword";
        title.innerHTML = data.title;
        artist.innerHTML = nameOrNo;
        medium.innerHTML = "Medium: " + data.medium;
        picture.src = data.primaryImage;
        credits.innerHTML = "All artwork is from the Metropolitan Museum of Art database."

        fullWork.id = "full-work";
        searchResults.id = "search-results";
        searchResults.appendChild(document.createElement('br'));
        searchResults.appendChild(thisIsYourWord);

        fullWork.appendChild(title);
        fullWork.appendChild(artist);
        fullWork.appendChild(medium);
        fullWork.appendChild(picture);
        fullWork.appendChild(document.createElement('br'));
        fullWork.appendChild(credits);

        searchResults.appendChild(fullWork);

        artworkContainer.appendChild(searchResults);
    }


////EVENT LISTENER RELATED STUFF:

    const searchByArtwork = document.querySelector('#search-by-keyword');
    const chooseDepartment = document.querySelector('#choose-category');

////adds event listeners to both search methods:
    searchByArtwork.addEventListener('submit', titleSearch);
    chooseDepartment.addEventListener('change', categorySearch);

////performs the keyword search:
    function titleSearch(e) {
        e.preventDefault();
        const artworkInput = document.querySelector('#keyword-input').value;
        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${artworkInput}`)
        .then(resp => resp.json())
        .then(data => {
            const objectArray = data.objectIDs;
            const randomID = Math.floor(Math.random() * objectArray.length);
            displayArtwork(objectArray[randomID], `Current keyword: ${artworkInput}!`);
        });

    }
////performs the drop-down menu search:
    function categorySearch(e) {
        e.preventDefault();
        const selected = e.target.options[e.target.selectedIndex]; 
        const department = selected.value;
        const depID = selected.id;
        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&departmentId=${depID}&q=e`)
        .then(resp => resp.json())
        .then(data => {
            const objectArray = data.objectIDs;
            const randomID = Math.floor(Math.random() * objectArray.length);
            displayArtwork(objectArray[randomID], `Current department: ${department}!`);
        });
    }




});
