window.onload = function() {
    var modalEle = document.querySelector(".modal");
    var modalImage = document.querySelector(".modalImage");

    Array.from(document.querySelectorAll(".ImgGallery")).forEach(item => {

        item.addEventListener("click", event => {
            modalEle.style.display = "block";
            modalImage.src = event.target.src;
        });
    });

    document.querySelector(".close").addEventListener("click", () => {
        modalEle.style.display = "none";
    });
    document.querySelector(".modal").addEventListener("click", () => {
        modalEle.style.display = "none";
    });




    var modal = document.getElementById("aboutModal");

    var btn = document.getElementById("aboutBtn");

    var span = document.getElementsByClassName("closebutton")[0];

    btn.onclick = () => modal.style.display = "block";

    span.onclick = () => modal.style.display = "none";

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

}