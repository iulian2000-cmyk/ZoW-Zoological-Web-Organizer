//console.log("Script pagina principala!");

var displayMenu = 0;
var displaySettings = 0;

function showMenu() {
    var menu = document.getElementById('menu');
    menu.innerHTML = '<div class="sidenav">' +
        '<p> USER MENU </p>' +
        '<button id="generateStats">Generate stats </button>' +
        '<button id="generateOrder">Generate clasament</button>' +
        '<button class="habitat"> HABITAT ' +
        '<form>' +
        '<select id="habitat" > ' +
        '<option val=1> value1 </option>' +
        '<option val=2> value2</option>' +
        '</select>' +
        '</form>' +
        '</button> <br> ' +
        '<button class="type"> TYPE' +
        '<form>' +
        '<select id="type" > ' +
        '<option val=1> value1 </option>' +
        '<option val=2> value2</option>' +
        '</select>' +
        '</form>' +
        '</button> <br> ' +
        '<button class="longevitate">  LONGEVITATE' +
        '<form>' +
        '<select id="longevitate" > ' +
        '<option val=1> value1 </option>' +
        '<option val=2> value 2</option>' +
        '</select>' +
        '</form>' +
        '</button> <br> ' +
        '<button id="generateAlbum"> Generare album </button>' +
        '<div class="dropdown1">' +
        '<button id="predefinedAlbums"> Albume predefinite </button>' +
        '<div class="dropdown-content1">' +
        '<a href="#"> Pasari </a>' +
        '<a href="#"> Reptile </a>' +
        '<a href="#"> Mamifere </a>' +
        '<a href="#"> Acvatice </a>' +
        '</div>' +
        '</div>' +
        '<div class="dropdown2">' +
        '<button id="myAlbums"> Albumele mele </button>' +
        '<div class="dropdown-content2">' +
        '<a href="#"> Album1  </a>' +
        '<a href="#"> Album2 </a>' +
        '</div>' +
        '</div>' +
        '</div>';
    if (displayMenu == 0) {
        menu.style.display = "none";
        displayMenu = 1;
    } else {
        displayMenu = 0;
        menu.style.display = "block";
    }
}

function showSettings() {
    var settings = document.getElementById('settings');
    settings.innerHTML = '<a href="#"> <strong> Logout </strong> </a>';
    if (displaySettings == 0) {
        settings.style.display = "none";
        displaySettings = 1;
    } else {
        settings.style.display = "block";
        displaySettings = 0;
    }
}