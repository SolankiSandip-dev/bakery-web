
document.getElementById("loginForm").addEventListener("submit", function(event) {

    event.preventDefault();

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    let error = document.getElementById("error");

    if (email === "" || password === "") {

        error.innerHTML = "Please enter Email and Password!";
        error.style.color = "red";

    } 
    else {

        sessionStorage.setItem("loggedIn", "true");

        window.location.href = "main.html";

    }

});
