var activeMenu = true;
var activeLog = true;

function showMenu() {
    var menu = document.getElementsByClassName("menu")[0];
    if (activeMenu == true) {
        menu.style.display = "flex";
        if (window.innerWidth >= 1150) {
            document.getElementsByClassName("content")[0].style.width = "calc(100% - 210px)";
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
    displayCards(serverMessage);
}

async function searchData() {
    const sel = document.getElementById("search-query");
    let text = sel.value;
    const response = await fetch(`http://127.0.0.1:5000/FrontEnd/search?search=${text}`);
    const serverMessage = await response.json();
    displayCards(serverMessage);
}


function displayCards(cardsArray) {

    const bigCardsContainer = document.getElementById("bigCardsContainer");
   
    if(cardsArray.length != 0 ){
      
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
    }else{ 
        if (document.getElementById("container-for-cards") !== null) {
            bigCardsContainer.removeChild(document.getElementById("container-for-cards"));     
        }
        const exitMessage = document.createElement("p");
        exitMessage.textContent = "No animal found in our database!";
        bigCardsContainer.appendChild(exitMessage);
    }
    
}