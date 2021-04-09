function Register() {
    document.getElementsByClassName("email")[0].style.display = "block";
    document.getElementById("authButton").innerHTML = "Register";
    document.getElementsByClassName("registerText")[0].style.display = "none";
    document.getElementsByClassName("loginText")[0].style.display = "block";
    var stars = document.querySelectorAll("label>span");
    for (i = 0; i < stars.length; i++)
        stars[i].style.display = "inline";
}

function Login() {
    document.getElementsByClassName("email")[0].style.display = "none";
    document.getElementById("authButton").innerHTML = "Login";
    document.getElementsByClassName("registerText")[0].style.display = "block";
    document.getElementsByClassName("loginText")[0].style.display = "none";
    var stars = document.querySelectorAll("label>span");
    for (i = 0; i < stars.length; i++)
        stars[i].style.display = "none";
}