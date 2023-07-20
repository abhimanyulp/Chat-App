// const baseServerURL = "http://localhost:4500"
const baseServerURL = "https://chat-app-e7l1.onrender.com"







// <----------------Catching the Elements----------------->

let emailIn = document.getElementById("emailIn");
let passwordIn = document.getElementById("passwordIn");
let submitBtn = document.getElementById("submitbtn");

let lsData = localStorage.getItem("username")

let nav_1 = document.getElementById("nav-dynamic-1")
let nav_2 = document.getElementById("nav-dynamic-2")
let username_display = document.getElementById("username-display")

let logoutBtn = document.getElementById("logout-btn");



let forgotBtn = document.getElementById("forgot-btn");

let otpEl = document.getElementById("otp-box");
let otpBtn = document.getElementById("input-btn");
let otp1 = document.getElementById("otp-1");
let otp2 = document.getElementById("otp-2");
let otp3 = document.getElementById("otp-3");
let otp4 = document.getElementById("otp-4");

let currentOtp;

let newPassEl = document.getElementById("new-pass-box")
let newPassBtn = document.getElementById("new-pass-btn");
let newPassIn1 = document.getElementById("pass1")
let newPassIn2 = document.getElementById("pass2")






//<----------------------Event Listeners--------------------->


window.addEventListener("load", (e) => {

    if (lsData) {
        nav_1.style.display = "none";
        nav_2.style.display = "flex";
        username_display.innerText = lsData;
    }
})


logoutBtn.addEventListener("click", (e) => {
    localStorage.setItem("username", "")
    localStorage.setItem("localAccessToken", "")
    location.reload()
})



submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    let userObj = {
        email: emailIn.value,
        pass: passwordIn.value
    }

    if (validate(userObj)) {

        fetch(`${baseServerURL}/users/login`, {
            method: "POST",
            body: JSON.stringify(userObj),
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {

                if (data.email) {
                    localStorage.setItem("email", data.email)
                    localStorage.setItem("username", data.username)
                    localStorage.setItem("localAccessToken", data.token);
                    alert(data.msg)
                    window.location.href = "./index.html"
                } else {
                    alert(data.msg)
                }

            })
            .catch(err => {
                console.log(err)
            })
    }
})



forgotBtn.addEventListener("click", (e)=>{

    e.preventDefault()

    if(validateUsername(emailIn.value)){

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
        newPassEl.style.display = "flex"

        // setTimeout(() => {
        //     window.location.href = "index.html"
        // }, 4000)


    } else {
        alert("Please Enter Correct OTP")
    }

})



newPassBtn.addEventListener("click", (e)=>{

    e.preventDefault()

    if(password (newPassIn1.value, newPassIn2.value)){
        
        newPassEl.style.display = "none"
        updatePass()

    }

})








// <-------------Functions---------------->

function validate(obj) {

    if (obj.username == "" || obj.password == "") {
        alert("Please Fill The Form")
        return false;
    } else {
        return true;
    }
}


function validateUsername(username) {

    if (username == "") {
        alert("Please Provide The Email")
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




function updatePass() {

    let userObj = {
        pass: newPassIn1.value,
    }

    fetch(`${baseServerURL}/users/update/${emailIn.value}`, {
        method: "PATCH",
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
