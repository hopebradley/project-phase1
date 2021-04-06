
document.addEventListener('DOMContentLoaded', () => {

    let artworkContainer = document.querySelector('#artwork-container');

    //this function would take data from a fetch and the keyword the user typed in
   
    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=flowers`)
    .then(resp => resp.json())
    .then(data => {
        const objectArray = data.objectIDs;
        const randomID = Math.floor(Math.random() * 100);
        console.log(objectArray[randomID]);
    })









})