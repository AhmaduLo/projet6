"use strict";

media.forEach(function (element) {
  var picture = "assets/albumPhoto/mimi/".concat(element.image);
  var video = "assets/albumPhoto/".concat(name, "/").concat(element.video);
  console.log(picture); // const photographerId = element.photographerId;
  // let thisId = element.id;
  // if (userID == photographerId) {
  //   displayId.push(thisId);
  // }
  // if (displayId.includes(element.id)) {
  //   section.innerHTML += `
  // <div class="container">
  // <div class="img_block">
  // <img src="${picture}" alt="${element.image}" />
  // </div>
  // <div class="name_like">
  // <div class="h3">
  // <h3>${element.title}</h3>
  // </div>
  // <div class="nmberIcon">
  // <p>${element.likes}</p>
  // <ion-icon class="like" name="heart-outline"></ion-icon>
  // </div>
  // </div>
  // </div>
  // `;
  // }
});

for (var i = 0; i < likeIcons.length; i++) {
  var afterClickLike = void 0;
  likeIcons[i].addEventListener("click", function (e) {
    var nmberLike = e.target.parentElement.children[0].textContent;
    var number = parseFloat(nmberLike);

    if (e.target.classList.contains("liked")) {
      afterClickLike = e.target.parentElement.children[0].textContent = number - 1;
      e.target.classList.remove("liked");
    } else {
      afterClickLike = e.target.parentElement.children[0].textContent = number + 1;
      e.target.classList.add("liked");
    }
  });
}

Thelikes.push(element.likes);
var somme = 0;

for (var _i = 0; _i < Thelikes.length; _i++) {
  somme += Thelikes[_i];
} // Supprimer tous les éléments actuellement présents dans Thelikes


Thelikes.splice(0, Thelikes.length);

for (var a = 0; a < numberIcon.length; a++) {
  var TotalLikes = numberIcon[a].children[0].textContent; // Supprimez les éléments existants de Thelikes

  Thelikes.length = 0;
  Thelikes.push(TotalLikes);
  Thelikes.forEach(function (itemm) {
    var num = parseFloat(itemm);
    console.log(num);
  });
}

for (var _i2 = 0; _i2 < numberIcon.length; _i2++) {
  console.log(numberIcon[_i2].textContent = element.likes);
} //----------------------------
// Tableau pour stocker les données des photographes


var photographersData = []; // Fonction pour charger les données depuis le fichier JSON

function loadPhotographersData() {
  fetch("photographers.json") // Remplacez le chemin par le chemin correct vers votre fichier JSON
  .then(function (response) {
    return response.json();
  }).then(function (data) {
    photographersData = data;
    displayPhotographers();
  })["catch"](function (error) {
    console.error("Une erreur s'est produite : " + error);
  });
} // Fonction pour afficher les photographes et gérer les clics sur les icônes de cœur


function displayPhotographers() {
  photographersData.forEach(function (photographer) {
    var likeIcon = document.createElement("i");
    likeIcon.className = "fa fa-heart";
    var likeCount = document.createElement("span");
    likeCount.textContent = photographer.likes;
    likeIcon.addEventListener("click", function () {
      if (likeIcon.classList.contains("liked")) {
        // Si l'icône est déjà "aimée", décrémentez le like
        photographer.likes--;
        likeIcon.classList.remove("liked");
      } else {
        // Sinon, incrémente le like
        photographer.likes++;
        likeIcon.classList.add("liked");
      }

      likeCount.textContent = photographer.likes;
      updateTotalLikes();
    }); // Ajouter l'icône et le compteur de likes à la page

    var photographerDiv = document.getElementById("photographer-" + photographer.id);
    photographerDiv.appendChild(likeIcon);
    photographerDiv.appendChild(likeCount);
  }); // Mettre à jour l'affichage initial du total des likes

  updateTotalLikes();
} // Fonction pour mettre à jour le total des likes


function updateTotalLikes() {
  var totalLikes = photographersData.reduce(function (total, photographer) {
    return total + photographer.likes;
  }, 0);
  document.getElementById("totalLikes").textContent = totalLikes;
} // Charger les données des photographes au chargement de la page


window.onload = loadPhotographersData;