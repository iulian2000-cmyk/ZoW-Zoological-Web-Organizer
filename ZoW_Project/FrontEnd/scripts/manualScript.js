var activeLog = true;
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

