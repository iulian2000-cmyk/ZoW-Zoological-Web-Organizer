var activeMenu = true;
var activeLog = true;
var cardsToSort = [];
var propertyForFilters;

window.onload = function() {
    var modal = document.getElementById("aboutModal");


    var span = document.getElementsByClassName("close")[0];


    span.onclick = () => {
        modal.style.display = "none";
        document.getElementsByClassName("navBar")[0].style.display = "flex";
        document.getElementsByClassName("navBar")[0].style.zIndex = 2;
    }

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
            document.getElementsByClassName("navBar")[0].style.display = "flex";
            document.getElementsByClassName("navBar")[0].style.zIndex = 2;
        }
    }
}

function showMenu() {
    var menu = document.getElementsByClassName("menu")[0];
    if (activeMenu == true) {
        menu.style.display = "flex";
        if (window.innerWidth >= 1150) {
            document.getElementsByClassName("content")[0].style.width = "calc(100% - 220px)";
        }
        activeMenu = false;

    } else {
        menu.style.display = "none";
        if (window.innerWidth >= 1150) {
            document.getElementsByClassName("content")[0].style.width = "100%";
        }
        activeMenu = true;
    }
}

function showLog() {
    var log = document.getElementsByClassName("log")[0];
    if (activeLog == true) {
        log.style.display = "flex";
        activeLog = false;
    } else {
        log.style.display = "none";
        activeLog = true;
    }
}

async function loadAlbum() {
    const sel = document.getElementById("defaultAlbumsId");
    let text = sel.options[sel.selectedIndex].text.toLowerCase();
    const response = await fetch(`http://127.0.0.1:5000/FrontEnd/load?defaultAlbums=${text}`);
    const serverMessage = await response.json();
    document.getElementById("title").innerHTML = text.toUpperCase();
    document.getElementsByClassName("filters")[0].style.display = "flex";
    document.getElementById("mainImage").style.display = "none";
    document.getElementsByClassName("saveAndshare")[0].style.display = "none";
    displayCards(serverMessage);
    cardsToSort = serverMessage;
}

async function loadSavedAlbum(){
    const sel = document.getElementById("saved-albums-select");
    let text = sel.options[sel.selectedIndex].text;
    if(text !== "Select album"){
        const response = await fetch(`http://127.0.0.1:5000/FrontEnd/load_saved_album?savedAlbums=${text}`);
        const serverMessage = await response.json();
        document.getElementById("title").innerHTML = text;
        document.getElementsByClassName("filters")[0].style.display = "flex";
        document.getElementById("mainImage").style.display = "none";
        document.getElementsByClassName("saveAndshare")[0].style.display = "flex";
        displayCards(serverMessage);
        cardsToSort = serverMessage;
    }
}

async function generateAlbum() {
    const sel1 = document.getElementById("generateCategory");
    const sel2 = document.getElementById("generateDomesticity");
    const sel3 = document.getElementById("generateEdibility");
    const sel4 = document.getElementById("generateLongevity");
    let textSel1 = sel1.options[sel1.selectedIndex].text.toLowerCase();
    let textSel2 = sel2.options[sel2.selectedIndex].text.toLowerCase();
    let textSel3 = sel3.options[sel3.selectedIndex].text.toLowerCase();
    let textSel4 = sel4.options[sel4.selectedIndex].text;
    const response = await fetch(`http://127.0.0.1:5000/FrontEnd/generate?category=${textSel1}&domesticity=${textSel2}&edibility=${textSel3}&longevity=${textSel4}`);
    const serverMessage = await response.json();
    if (serverMessage.length > 0) {
        document.getElementById("title").innerHTML = "Album generated";
        displayCards(serverMessage);
        cardsToSort = serverMessage;
        document.getElementsByClassName("filters")[0].style.display = "flex";
        document.getElementById("mainImage").style.display = "none";
        if (document.getElementById("userLabel").innerHTML.length > 0) {
            document.getElementsByClassName("saveAndshare")[0].style.display = "flex";
        } else {
            document.getElementsByClassName("saveAndshare")[0].style.display = "none";
        }
    } else {
        if (document.getElementById("container-for-cards") !== null) {
            bigCardsContainer.removeChild(document.getElementById("container-for-cards"));
        }
        document.getElementById("title").innerHTML = "No animals found based on the selected properties";
        document.getElementsByClassName("filters")[0].style.display = "none";
        document.getElementsByClassName("saveAndshare")[0].style.display = "none";
    }
}

async function searchData() {
    const sel = document.getElementById("search-query");
    let text = sel.value;
    const response = await fetch(`http://127.0.0.1:5000/FrontEnd/search?search=${text}`);
    const serverMessage = await response.json();
    if (serverMessage.length > 0) {
        document.getElementById("title").innerHTML = text.toUpperCase();
        document.getElementById("mainImage").style.display = "none";
        displayCards(serverMessage);
    } else {
        if (document.getElementById("container-for-cards") !== null) {
            bigCardsContainer.removeChild(document.getElementById("container-for-cards"));
        }
        document.getElementById("title").innerHTML = `No results found for "${text}"`;
    }
    document.getElementsByClassName("filters")[0].style.display = "none";
    document.getElementsByClassName("saveAndshare")[0].style.display = "none";
}


function displayCards(cardsArray) {

    const bigCardsContainer = document.getElementById("bigCardsContainer");


    if (document.getElementById("container-for-cards") !== null) {
        bigCardsContainer.removeChild(document.getElementById("container-for-cards"));
    }

    const cardsContainer = document.createElement("div");
    cardsContainer.className = "cardsContainer";
    cardsContainer.id = "container-for-cards";
    const cardHref = document.createElement("a");
    cardHref.class = "cardHref";
    const card = document.createElement("div");
    card.className = "card";
    const cardBackground = document.createElement("img");
    cardBackground.className = "cardBackground";
    cardBackground.alt = "";
    const cardInfo = document.createElement("div");
    cardInfo.className = "cardInfo";
    const likes = document.createElement("div");
    likes.className = "likes";
    const animalImage = document.createElement("img");
    animalImage.className = "animalImage";
    animalImage.alt = "";
    const animalName = document.createElement("div");
    animalName.className = "animalName";
    const pName = document.createElement("p");
    const likesIcon = document.createElement("img");
    likesIcon.className = "likesIcon";
    likesIcon.alt = "";
    likesIcon.src = "./images/icons/likeIcon.svg";
    const numberOfLikes = document.createElement("span");
    numberOfLikes.className = "numberOfLikes";

    likes.appendChild(likesIcon)
    likes.appendChild(numberOfLikes);
    animalName.appendChild(pName);
    cardInfo.appendChild(animalImage)
    cardInfo.appendChild(animalName);
    card.appendChild(cardBackground)
    card.appendChild(cardInfo)
    card.appendChild(likes);
    cardHref.appendChild(card);

    for (let i = 0; i < cardsArray.length; i++) {
        cardHref.href = `pages/animal_${cardsArray[i].id_animal}.html`;
        cardBackground.src = cardsArray[i].imagePath1;
        animalImage.src = cardsArray[i].imagePath1;
        numberOfLikes.innerHTML = cardsArray[i].likes;
        pName.innerHTML = cardsArray[i].animalName;
        cardsContainer.appendChild(cardHref.cloneNode(true));
    }

    bigCardsContainer.appendChild(cardsContainer);
}

function filterCards() {
    if (cardsToSort.length > 0) {
        if (document.getElementById('f1').checked) {
            propertyForFilters = document.getElementById('f1').value;
        }
        if (document.getElementById('f2').checked) {
            propertyForFilters = document.getElementById('f2').value;
        }
        if (document.getElementById('f3').checked) {
            propertyForFilters = document.getElementById('f3').value;
        }
        if (document.getElementById('f4').checked) {
            propertyForFilters = document.getElementById('f4').value;
        }
        if (document.getElementById('f5').checked) {
            propertyForFilters = document.getElementById('f5').value;
        }
        displayCards(cardsToSort.sort(compareCardsByProperty));
    }
}

function compareCardsByProperty(card1, card2) {
    if (card1[propertyForFilters] > card2[propertyForFilters]) {
        return 1;
    } else if (card1[propertyForFilters] < card2[propertyForFilters]) {
        return -1;
    } else {
        return 0;
    }
}

async function saveAlbum() {
    let albumName = prompt("Enter a name for the album (it must contain only letters and numbers):", "");
    let regex = /[a-zA-Z0-9]+/;
    if (regex.test(albumName) && albumName) {
        const objToSend = {
            username: "",
            animals: [],
            album: albumName
        };
        objToSend.username = document.getElementById("userLabel").textContent;
        for (let obj of cardsToSort) {
            objToSend.animals.push(obj.id_animal);
        }
        const response = await fetch(`http://127.0.0.1:5000/FrontEnd/save`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(objToSend)
            })
            .then(response => {
                if (response.ok) {
                    alert("Album saved successfully!");
                    const option = document.createElement("option");
                    option.value = albumName;
                    option.innerHTML = albumName;
                    const sel = document.getElementById("saved-albums-select");
                    sel.appendChild(option);
                } else {
                    alert("Failed - You already have an album with this name!");
                }
            })
            .catch(error => alert(`${error}`));
    } else {
        if (albumName) {
            alert("Invalid name, please try again.");
        }
    }
}

async function shareAlbum() {
    let albumName = prompt("Enter a name for the album (it must contain only letters and numbers):", "");
    var userName = prompt("With who do you want to share ?");
    let regex = /[a-zA-Z0-9]+/;
    if (regex.test(albumName) && albumName) {
        const objToSend = {
            user1: "",
            user2: "",
            album: albumName
        };
        objToSend.user1 = document.getElementById("userLabel").textContent;
        objToSend.user2 = userName;
        const response = await fetch(`http://127.0.0.1:5000/FrontEnd/share`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(objToSend)
            })
            .then(response => {
                if (response.ok) {
                    alert("Album shared successfully!");
                } else {
                    alert("OOOP");
                }
            })
            .catch(error => alert(`${error}`));
    } else {
        if (albumName) {
            alert("Invalid name, please try again.");
        }
    }
}