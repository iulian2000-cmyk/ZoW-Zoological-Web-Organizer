window.onload = function() {
    var modal = document.getElementById("aboutModal");

    var btn = document.getElementById("aboutBtn");

    var span = document.getElementsByClassName("close")[0];

    btn.onclick = () => {
        modal.style.display = "block";
        if (document.getElementsByClassName("navBar")) {
            document.getElementsByClassName("navBar")[0].style.zIndex = -1;
        }
    }
    span.onclick = () => {
        modal.style.display = "none";
        document.getElementsByClassName("navBar")[0].style.zIndex = 2;
    }
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
            document.getElementsByClassName("navBar")[0].style.zIndex = 2;
        }
    }
}