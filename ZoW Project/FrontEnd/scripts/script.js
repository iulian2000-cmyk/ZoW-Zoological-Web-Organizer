//console.log("Script pagina principala!");


function showMenu() {
    document.getElementById('menu').innerHTML = '<div class="usermenu">' +
        '<p> <strong> <i> User menu </i> </strong> </p> <br> <br> <br> ' +
        '<p> <strong> <i>  &nbsp; Habitat </i> </strong> </p> <br> <br> ' +
        '<select name=\"habitat\" id=\"habitat\">' +
        '<option value=\"val1\">val1</option>' +
        '<option value=\"val2\">val2</option>' +
        '</select>' +
        '<p> <strong> <i> &nbsp; &nbsp; Tip </i> </strong> </p> <br> <br> <br>' +
        '<select name=\"tip\" id=\"tip\">' +
        '<option value=\"val1\">val1</option>' +
        '<option value=\"val2\">val2</option>' +
        '</select>' +
        '<p> <strong> <i>Longevitate </i> </strong> </p> <br> <br><br><br>' +
        '<select name=\"longevitate\" id=\"longevitate\">' +
        '<option value=\"val1\">val1</option>' +
        '<option value=\"val2\">val2</option>' +
        '</select>' +
        '<button type=\"button\" id=\"generateAlbum\"> Generate album </button>' +
        '<button type=\"button\" id=\"generateStats\"> Generate statistics </button>' +
        '<br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br>' +
        '<p> <strong <i> Choose album </i> </strong> </p> <br> <br> <br>' +
        '<select name=\"chooseAlbum\" id=\"choosealbum\">' +
        '<option value=\"Pasari\">Pasari</option>' +
        '<option value=\"Mamifere\"> Mamifere</option>' +
        '<option value=\"Acvatice\"> Acvatice </option>' +
        '<option value=\"Reptile\"> Reptile </option>' +
        '</select>' +
        '<br> <br>' +
        '<p> <strong> <i> My albums </i> </strong> </p> <br> <br> <br>' +
        '<select name=\"chooseMyAlbum\" id=\"chooseMyalbum\">' +
        '<option value=\"Album1\">Album1</option>' +
        '<option value=\"Album2\"> Album2</option>' +
        '</select>' +
        '<br> <br> <br> ' +
        '<button type=\"button\" id=\"ShowAlbum\"> Show album </button>'
    '</div>';
}