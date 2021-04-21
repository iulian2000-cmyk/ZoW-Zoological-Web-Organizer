var activeMenu = true;
var activeLog = true;

function showMenu() {
    var menu = document.getElementsByClassName("menu")[0];
    if (activeMenu == true) {
        menu.style.display = "flex";
        document.getElementsByClassName("content")[0].style.width = "calc(100% - 210px)";
        activeMenu = false;

    } else {
        menu.style.display = "none";
        document.getElementsByClassName("content")[0].style.width = "100%";
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