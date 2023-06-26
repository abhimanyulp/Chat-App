const BaseServerURL = "http://localhost:4500/"
// const BaseServerURL = "http:///"



// <----------------Catching the Elements----------------->

//Local storage
let userAuthToken = localStorage.getItem("localAccessToken") || null;
let lsData = localStorage.getItem("username");

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
        display_container.style.display = "block";
    }
})


logoutBtn.addEventListener("click", (e) => {
    localStorage.setItem("username", "")
    localStorage.setItem("localAccessToken", "")

    location.reload()
})




const socket = io("http://localhost:4500/", { transports: ["websocket"] })

       

        let username = localStorage.getItem("username")

        // For checking connection on frontend
        socket.on("start", (message) => {
            console.log("connected to socket server");
        })

        //Count tag update
        socket.on("newuser", (msg) => {
            const count_tag = document.getElementById("usercount")
            count_tag.innerText = msg

        })


        //Handling Receiving Messages
        socket.on("usermsg", (message) => {

            const messages = document.querySelector('#messages')

            let otherdiv = document.createElement("div")
            otherdiv.setAttribute("class", "otherdiv")

            let innerdiv = document.createElement("div")
            innerdiv.setAttribute("class","innerdiv")

            let name = document.createElement("h4")
            name.innerText = message.name
            let msg = document.createElement("p")
            msg.innerText = message.message


            innerdiv.append(name, msg)
            otherdiv.append(innerdiv)
            messages.append(otherdiv)

        })



        //On Click function on send button to display own msg and emmit to others
        const sendMessage = () => {

            const text = document.getElementById("input").value
            const message = {name: username, message: text}
            socket.emit("message", message)


            const messages = document.querySelector('#messages')

            let mydiv = document.createElement("div")
            mydiv.setAttribute("class", "mydiv")

            let innerdiv = document.createElement("div")
            innerdiv.setAttribute("class","innerdiv")

            let name = document.createElement("h4")
            name.innerText = username
            let msg = document.createElement("p")
            msg.innerText = text

            innerdiv.append(name, msg)
            mydiv.append(innerdiv)
            messages.append(mydiv)

        }