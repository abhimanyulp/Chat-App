// const baseServerURL = "http://localhost:4500"
const baseServerURL = "https://chat-app-backend-dep.up.railway.app"





// <----------------Catching the Elements----------------->

let emailIn = document.getElementById("emailIn");
let userIn = document.getElementById("userIn");
let passwordIn = document.getElementById("passwordIn");
let passwordIn2 = document.getElementById("passwordIn2");
let submitBtn = document.getElementById("submitbtn");


let lsData = localStorage.getItem("username")

let nav_1 = document.getElementById("nav-dynamic-1")
let nav_2 = document.getElementById("nav-dynamic-2")
let username_display = document.getElementById("username-display")

let logoutBtn = document.getElementById("logout-btn");


let otpEl = document.getElementById("otp-box");
let otpBtn = document.getElementById("input-btn");

let otp1 = document.getElementById("otp-1");
let otp2 = document.getElementById("otp-2");
let otp3 = document.getElementById("otp-3");
let otp4 = document.getElementById("otp-4");

let currentOtp;




//<----------------------Event Listeners--------------------->

window.addEventListener("load", (e) => {

    if (lsData) {
        nav_1.style.display = "none";
        nav_2.style.display = "flex";
        username_display.innerText = lsData;
    }
})


logoutBtn.addEventListener("click", (e) => {
    localStorage.setItem("email", "")
    localStorage.setItem("localAccessToken", "")
    location.reload()
})






//Register Submit button
submitBtn.addEventListener("click", (e) => {

    e.preventDefault()

    let userObj = {
        email: emailIn.value,
        pass: passwordIn.value,
        username: userIn.value
    }

    if (validate(userObj) && password(passwordIn.value,passwordIn2.value)) {

        currentOtp = GenerateOTP()
        OtpRequest(currentOtp)
        otpEl.style.display = "flex"

    }

})




//OTP button addEventListener
otpBtn.addEventListener("click", () => {

    let otpIn = otp1.value + otp2.value + otp3.value + otp4.value

    if (otpIn == currentOtp) {

        otpEl.style.display = "none"

        register()

        setTimeout(() => {
            window.location.href = "index.html"
        }, 4000)


    } else {
        alert("Please Enter Correct OTP")
    }

})






// <--------------Functions-------------------->

function OtpRequest(otp){

    let otpObj = {
        email: emailIn.value,
        otp: currentOtp
    }

    fetch(`${baseServerURL}/users/otp`, {
        method: "POST",
        body: JSON.stringify(otpObj),
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            alert(data.msg);
        })
        .catch(err => {
            console.log(err)
        })

}


function register(){

    let userObj = {
        email: emailIn.value,
        pass: passwordIn.value,
        username: userIn.value
    }

    fetch(`${baseServerURL}/users/register`, {
        method: "POST",
        body: JSON.stringify(userObj),
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            alert(data.msg);
        })
        .catch(err => {
            console.log(err)
        })
}




function validate(obj) {

    if (obj.email == "" || obj.age == "" || obj.location == "" || obj.pass == "") {
        alert("Please Fill The Form")
        return false;
    } else {
        return true;
    }
}


function password (value1,value2) {
    if(value1 == value2) {
        return true;
    } else {
        alert("Password does not match")
        return false;
    }
}




//OTP Generate function
function GenerateOTP() {
    var otp = []

    var digit1 = Math.floor(Math.random() * 9)
    var digit2 = Math.floor(Math.random() * 9)
    var digit3 = Math.floor(Math.random() * 9)
    var digit4 = Math.floor(Math.random() * 9)

    otp.push(digit1, digit2, digit3, digit4)

    return otp.join("")
}