"use strict";

function displayModal() {
  var modal = document.getElementById("contact_modal");
  modal.style.display = "block";
}

function closeModal() {
  var modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

var myForm = document.querySelector(".myForm");
var prenom = document.getElementById("prenom");
var nom = document.getElementById("nom");
var email = document.getElementById("email");
var message = document.getElementById("message");
myForm.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log("Prenom = " + prenom.value);
  console.log("Nom = " + nom.value);
  console.log("Email = " + email.value);
  console.log("Message = " + message.value);
});