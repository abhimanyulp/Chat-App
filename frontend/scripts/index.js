const baseServerURL = "http://localhost:4500"



// <----------------Catching the Elements----------------->

//Local storage
let userAuthToken = localStorage.getItem("localAccessToken") || null;
let lsData = localStorage.getItem("email");

//Navbar elements
let nav_1 = document.getElementById("nav-dynamic-1");
let nav_2 = document.getElementById("nav-dynamic-2");
let username_display = document.getElementById("username-display");
let logoutBtn = document.getElementById("logout-btn");


let welcome_container = document.getElementById("welcome-container");
let display_container = document.getElementById("display-container");







//<----------------------Event Listeners--------------------->


//Navbar dynamic elements
window.addEventListener("load", (e) => {

    if (lsData) {
        nav_1.style.display = "none";
        nav_2.style.display = "flex";
        username_display.innerText = lsData;

        welcome_container.style.display = "none";
        display_container.style.display = "flex";
    }
})


logoutBtn.addEventListener("click", (e) => {
    localStorage.setItem("email", "")
    localStorage.setItem("localAccessToken", "")

    location.reload()
})



