console.log("running script")
var passwordInput = document.getElementById("password");
var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var length = document.getElementById("length");

passwordInput.onfocus=function(){
    console.log("displaying message")
    document.getElementById("message").style.display = "block";
} 