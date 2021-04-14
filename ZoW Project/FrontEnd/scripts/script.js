//console.log("Script pagina principala!");

var displayMenu = false;
var displaySettings = false;

function showMenu() {
    var menu = document.getElementById('menu');
    if (!displayMenu) {
        menu.style.display = "block";
        displayMenu = true;
    } else {
        displayMenu = false;
        menu.style.display = "none";
    }
}

function showSettings() {
    var settings = document.getElementById('settings');
    if (!displaySettings) {
        settings.style.display = "block";
        displaySettings = true;
    } else {
        settings.style.display = "none";
        displaySettings = false;
    }
}
