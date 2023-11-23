"use strict";

//-------------tableau des element a trier-----
var ArrayTries = [];
ArrayTries = [{
  name: "Populaire"
}, {
  name: "Date"
}, {
  name: "Titre"
}];
ArrayTries.forEach(function (item) {
  containtTrie.innerHTML += "\n   <div class=\"elementTexteClique\">".concat(item.name, " </div>\n   <span></span>\n   ");
}); //---------- Add click event listener to each element---populaire-----

function filter() {
  ArrayTries.forEach(function (itemArray, index) {
    for (var i = 0; i < elementTexteClique.length; i++) {
      elementTexteClique[index].addEventListener("click", function (e) {
        // Échangez l'élément cliqué avec celui à l'index 0 dans le tableau ArrayTries
        var clickedItem = ArrayTries[index];
        ArrayTries[index] = ArrayTries[0];
        ArrayTries[0] = clickedItem; //-----------------------------------

        containtTrie.innerHTML = "";
        ArrayTries = ArrayTries.map(function (item) {
          return {
            name: item.name
          };
        });
        console.log(ArrayTries);
        ArrayTries.forEach(function (item) {
          containtTrie.innerHTML += "\n            <ion-icon class=\"chevron_ouvert\" name=\"chevron-down-outline\"></ion-icon>\n          <div class=\"elementTexteClique\">".concat(item.name, " </div>\n          <span></span>\n          ");
        }); //------------------------

        var photos = Array.from(section.getElementsByClassName("container"));

        if (e.target.textContent == "Populaire") {
          // Triez les photos en fonction du nombre de likes
          photos.sort(function (a, b) {
            var likesA = parseInt(a.getAttribute("data-likes"));
            var likesB = parseInt(b.getAttribute("data-likes"));
            return likesB - likesA; // Triez de manière décroissante
          });
        } else if (e.target.textContent == "Date") {
          photos.sort(function (a, b) {
            var dateA = parseInt(a.getAttribute("data-date"));
            var dateB = parseInt(b.getAttribute("data-date"));
            return dateB - dateA; // Triez de manière décroissante
          });
        } else {
          photos.sort(function (a, b) {
            var titleA = a.querySelector(".title").textContent;
            var titleB = b.querySelector(".title").textContent;
            return titleA.localeCompare(titleB); // Triez de manière alphabétique
          });
        } // Supprimez toutes les photos du conteneur


        section.innerHTML = ""; // Ajoutez les photos triées au conteneur

        photos.forEach(function (photo) {
          section.appendChild(photo);
        });
      });
    }
  });
}

filter();

var _loop = function _loop(i) {
  likeIcons[i].addEventListener("click", function (e) {
    if (likeIcons[i].classList.contains("liked")) {
      e.target.parentElement.children[0].textContent--;
      somme--;
      likeIcons[i].classList.remove("liked");
      likeIcons[i].classList.remove("color");
    } else {
      e.target.parentElement.children[0].textContent++;
      somme++;
      likeIcons[i].classList.add("liked");
      likeIcons[i].classList.add("color");
    } // Mettez à jour le texte affiché avec la nouvelle valeur de somme


    like_priceTotal.children[0].children[0].textContent = somme;
    element.likes = e.target.parentElement.children[0].textContent;
  });
};

for (var i = 0; i < likeIcons.length; i++) {
  _loop(i);
}