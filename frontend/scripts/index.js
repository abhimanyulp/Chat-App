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


//Get
let submitBtn_get = document.getElementById("submitbtn-get");

//Add
let title_add = document.getElementById("title-add");
let body_add = document.getElementById("body-add");
let sub_add = document.getElementById("sub-add");
let submitBtn_add = document.getElementById("submitbtn-add");

//Delete
let noteid_delete = document.getElementById("noteid-delete");
let submitBtn_delete = document.getElementById("submitbtn-delete");

//Update
let title_update = document.getElementById("title-update");
let body_update = document.getElementById("body-update");
let sub_update = document.getElementById("sub-update");
let noteid_update = document.getElementById("noteid-update")
let submitbtn_update = document.getElementById("submitbtn-update");

let welcome_container = document.getElementById("welcome-container");
let display_container = document.getElementById("display-container");

let tbodyEl = document.querySelector("tbody");





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




//Fetching Notes
submitBtn_get.addEventListener("click", (e) => {

    e.preventDefault();

    fetch(`${baseServerURL}/notes/`, {
        method: "GET",
        headers: {
            'Content-type': 'application/json',
            "Authorization": `Bearer ${userAuthToken}`
        }
    })
        .then(res => res.json())
        .then(data => {
            Display(data)
        })
        .catch(err => {
            console.log(err)
        })
})


//Add Note
submitBtn_add.addEventListener("click", (e) => {
    e.preventDefault();


    let noteObj = {
        title: title_add.value,
        body: body_add.value,
        sub: sub_add.value
    }


    fetch(`${baseServerURL}/notes/add`, {
        method: "POST",
        body: JSON.stringify(noteObj),
        headers: {
            'Content-type': 'application/json',
            "Authorization": `Bearer ${userAuthToken}`
        }
    })
        .then(res => res.json())
        .then(data => {
            alert(data.msg)
        })
        .catch(err => {
            console.log(err)
        })
})



//Delete particular note
submitBtn_delete.addEventListener("click", (e) => {
    e.preventDefault();

    fetch(`${baseServerURL}/notes/delete/${noteid_delete.value}`, {
        method: "DELETE",
        headers: {
            'Content-type': 'application/json',
            "Authorization": `Bearer ${userAuthToken}`
        }
    })
        .then(res => res.json())
        .then(data => {
            alert(data.msg);
        })
        .catch(err => {
            console.log(err)
        })
})



//Update Note
submitbtn_update.addEventListener("click", (e) => {
    e.preventDefault();

    let userObj = {
        title: title_update.value,
        body: body_update.value,
        sub: sub_update.value
    }

    fetch(`${baseServerURL}/notes/update/${noteid_update.value}`, {
        method: "PATCH",
        body: JSON.stringify(userObj),
        headers: {
            'Content-type': 'application/json',
            "Authorization": `Bearer ${userAuthToken}`
        }
    })
        .then(res => res.json())
        .then(data => {
            alert(data.msg);
        })
        .catch(err => {
            console.log(err)
        })
})





// <-------------------Functions------------------>



function Display(data) {

    tbodyEl.innerHTML = null;

    data.forEach((element, index) => {
        let tr = document.createElement("tr");

        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");


        td1.innerText = element._id;
        td2.innerText = element.title;
        td3.innerText = element.body;
        td4.innerText = element.sub;


        tr.append(td1, td2, td3, td4);
        tbodyEl.append(tr);
    })

}