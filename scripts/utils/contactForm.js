function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

const myForm = document.querySelector(".myForm");
const prenom = document.getElementById("prenom");
const nom = document.getElementById("nom");
const email = document.getElementById("email");
const message = document.getElementById("message");
myForm.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("Prenom = " + prenom.value);
  console.log("Nom = " + nom.value);
  console.log("Email = " + email.value);
  console.log("Message = " + message.value);
});
