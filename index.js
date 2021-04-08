
document.addEventListener('DOMContentLoaded', () => {

    let artworkContainer = document.querySelector('#artwork-container');
   
    //UPON LOAD
    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=flowers`)
    .then(resp => resp.json())
    .then(data => {
        const objectArray = data.objectIDs;
        const randomID = Math.floor(Math.random() * 100);
        // console.log(objectArray[randomID]);
        displayArtwork(objectArray[randomID], "flowers");
    });


    /////USED FOR LOADING ART
    function displayArtwork(artworkID, keyword) {
        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${artworkID}`)
        .then(resp => resp.json())
        .then(data => {
            // console.log(data);
            return buildArtwork(data, keyword);
        });
    }

    function buildArtwork(data, keyword) {
        if (artworkContainer.firstChild) {
            // console.log("I have a first child");
            artworkContainer.removeChild(artworkContainer.firstChild);
            // console.log(artworkContainer.childNodes);
        }
        const searchResults = document.createElement('div');
        const fullWork = document.createElement('div');
        const lineBreak = document.createElement('br');
        const thisIsYourWord = document.createElement('p');
        const title = document.createElement('h2');
        const artist = document.createElement('h3');
        const medium = document.createElement('p');
        const picture = document.createElement('img');

        let nameOrNo = "";
        data.artistDisplayName ? nameOrNo = `By ${data.artistDisplayName}` : nameOrNo = "Unknown Artist";
        
        thisIsYourWord.innerHTML = `Random artwork related to "${keyword}"!`;
        thisIsYourWord.id = "this-is-your-keyword";
        title.innerHTML = data.title;
        artist.innerHTML = nameOrNo;
        medium.innerHTML = "Medium: " + data.medium;
        picture.src = data.primaryImage;

        fullWork.id = "full-work";
        searchResults.id = "search-results";
        searchResults.appendChild(lineBreak);
        searchResults.appendChild(thisIsYourWord);
        fullWork.appendChild(title);
        fullWork.appendChild(artist);
        fullWork.appendChild(medium);
        fullWork.appendChild(picture);
        searchResults.appendChild(fullWork);

        artworkContainer.appendChild(searchResults);
    }
    //////////////////////


 ///////////////EVENT LISTENER RELATED STUFF

    const searchByArtwork = document.querySelector('#search-by-keyword');
    const chooseDepartment = document.querySelector('#choose-category');

    searchByArtwork.addEventListener('submit', titleSearch);
    // console.log("Hi");

    chooseDepartment.addEventListener('change', categorySearch);

    function titleSearch(e) {
        e.preventDefault();
        const artworkInput = document.querySelector('#keyword-input').value;
        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${artworkInput}`)
        .then(resp => resp.json())
        .then(data => {
            const objectArray = data.objectIDs;
            const randomID = Math.floor(Math.random() * objectArray.length);
            // console.log(objectArray[randomID]);
            // console.log(artworkInput);
            displayArtwork(objectArray[randomID], artworkInput);
        });

    }

    function categorySearch(e) {
        e.preventDefault();
        const artworkInput = e.target.value;
        const selected = e.target.options[e.target.selectedIndex]; 
        console.log(selected);
        const department = selected.value;
        const depID = selected.id;
        console.log(department.id);
        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=${depID}&q=e`)
        .then(resp => resp.json())
        .then(data => {
            const objectArray = data.objectIDs;
            const randomID = Math.floor(Math.random() * objectArray.length);
            console.log(objectArray[randomID]);
            // console.log(artworkInput);
            displayArtwork(objectArray[randomID], artworkInput);
        });


    }





});
