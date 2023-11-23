const modal = document.getElementById("contact_modal");

function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}

const myForm = document.querySelector(".myForm");
const message = document.getElementById("message");
const inputs = document.querySelectorAll("input");

function submite() {
  myForm.addEventListener("submit", (event) => {
    event.preventDefault();
    inputs.forEach((iteme) => {
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
