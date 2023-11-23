"use strict";

var modal = document.getElementById("contact_modal");

function displayModal() {
  var modal = document.getElementById("contact_modal");
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}

var myForm = document.querySelector(".myForm");
var message = document.getElementById("message");
var inputs = document.querySelectorAll("input");

function submite() {
  myForm.addEventListener("submit", function (event) {
    event.preventDefault();
    inputs.forEach(function (iteme) {
      if (iteme.value == "") {
        console.log("les champs son vide");
      } else {
        console.log(iteme.value);
        console.log(message.value);
        modal.style.display = "none";
      }
    });
  });
}

submite();