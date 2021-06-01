var slideIndex = 1;

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

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("Slides");
    var dots = document.getElementsByClassName("demo");

    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }


    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";

    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    dots[slideIndex - 1].className += " active";
    slides[slideIndex - 1].style.display = "block";
}

