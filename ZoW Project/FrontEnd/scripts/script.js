//console.log("Script pagina principala!");


function showMenu() {
    document.getElementById('menu').innerHTML = '<p id="menuIntroduction"> <i> &nbsp; &nbsp; &nbsp; User menu </i> </p> ';
    document.getElementById('menu').innerHTML += '<button type="button" id="generateAlbums"> Generate albums </button>';
    document.getElementById('menu').innerHTML += '<br> <br> <button type="button" id="showStats"> Generate statistics </button>';

    document.getElementById('menu').innerHTML += '<p id="generateAlbum"> &nbsp; &nbsp; <b> <i> Generate Album <i> <b> </p>';
    document.getElementById('menu').innerHTML += '<p id="Habitat"> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Habitat </p> ';
    document.getElementById('menu').innerHTML += "&nbsp; &nbsp; &nbsp; &nbsp;" +
        "<select name=\"habitat\" id=\"habitat\">" +
        "<option value=\"val1\">val1</option>" +
        "<option value=\"val2\">val2</option>" +
        "</select>";

    document.getElementById('menu').innerHTML += '<p id="Type"> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Type </p>';
    document.getElementById('menu').innerHTML += "&nbsp; &nbsp; &nbsp; &nbsp; <select name=\"type\" id=\"type\">" +
        "<option value=\"val1\"> val1 </option>" +
        "<option value=\"value2\"> val2 </option>" +
        "</select>";


    document.getElementById('menu').innerHTML += '<p id="longevitate"> &nbsp; &nbsp; &nbsp; &nbsp; Longevitate </p>';
    document.getElementById('menu').innerHTML += "&nbsp; &nbsp; &nbsp; &nbsp;" +
        "<select name=\"longevitate\" id=\"longevitate\">" +
        "<option value=\"val1\">val1</option>" +
        "<option value=\"val2\">val2</option>" +
        "</select>";

    document.getElementById('menu').innerHTML += '<p id="choosealbum"> &nbsp; &nbsp; &nbsp; <strong><i> Choose album </i><strong> </p> ';
    document.getElementById('menu').innerHTML += "<form action=\"\ id=\"chooseAlbum \">" +
        "<input type=\"radio\" name=\"gender\" value=\"mamifere\" id=\"chooseAlbum1\" > &nbsp; &nbsp; Mamifere <br> <br>" +
        "<input type=\"radio\" name=\"gender\" value=\"Pasari\"   id=\"chooseAlbum2\"> &nbsp; &nbsp; Pasari <br> <br>" +
        "<input type=\"radio\" name=\"gender\" value=\"Reptile\"  id=\"chooseAlbum3\"> &nbsp; &nbsp; Reptile <br> <br>" +
        "<input type=\"radio\" name=\"gender\" value=\"Acvatice\" id=\"chooseAlbum4\"> &nbsp; &nbsp; Acvatice <br> <br>" +
        "</form>";
}