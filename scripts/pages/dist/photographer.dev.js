"use strict";

//Mettre le code JavaScript lié à la page photographer.html
var info_persso = document.querySelector(".info_persso");
var img = document.querySelector(".img");
var section = document.querySelector("section");
var likeIcons = document.getElementsByClassName("like");
var likeTotalPara = document.querySelector(".likeTotalPara");
var like_priceTotal = document.querySelector(".like_priceTotal");
var imageDisplayClick = document.getElementsByClassName("imageDisplay");
var noneAll = document.querySelector(".noneAll");
var closeModule = document.getElementsByClassName("closeModule");
var modalPhoto = document.querySelector(".modalPhoto");
var chevronplus = document.getElementsByClassName("chevronplus");
var chevronmoins = document.getElementsByClassName("chevronmoins");
var imgToSlide = document.getElementsByClassName("imgToSlide");
var photoSlide = [];
var somme = 0;
var totalLikes = 0;

function getPhotographers() {
  var response, data, media, displayId, userID, picture, name, city, country, tagline, price, Thelikes, containtTrie, chevron_ouvert, elementTexteClique, ArrayTries, i;
  return regeneratorRuntime.async(function getPhotographers$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch("http://127.0.0.1:5501/data/photographers.json"));

        case 2:
          response = _context.sent;

          if (response.ok) {
            _context.next = 5;
            break;
          }

          throw new Error("Erreur lors de la récupération des photographes");

        case 5:
          _context.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
          data = _context.sent;
          media = data.media;
          displayId = []; // Récupérer l'ID depuis le localStorage

          userID = localStorage.getItem("userID");
          picture = localStorage.getItem("picture");
          name = localStorage.getItem("name");
          city = localStorage.getItem("city");
          country = localStorage.getItem("country");
          tagline = localStorage.getItem("tagline");
          price = localStorage.getItem("price");
          Thelikes = []; //console.log(userID);

          info_persso.innerHTML += "\n        <h2>".concat(name, "</h2>\n        <p>").concat(country, ",").concat(city, "</p>\n          <p>").concat(tagline, "</p>\n  ");
          img.innerHTML += " <img src=\"".concat(picture, "\" alt=\"\">"); //----------partie filtre--------------

          containtTrie = document.querySelector(".containtTrie");
          chevron_ouvert = document.getElementsByClassName("chevron_ouvert");
          elementTexteClique = document.getElementsByClassName("elementTexteClique"); //-------------tableau des element a trier-----

          ArrayTries = [{
            name: "Populaire"
          }, {
            name: "Date"
          }, {
            name: "Titre"
          }]; //console.log(ArrayTries);

          ArrayTries.forEach(function (item) {
            containtTrie.innerHTML += "\n    <div class=\"elementTexteClique\">".concat(item.name, " </div>\n    <span></span>\n    ");
          });
          chevron_ouvert[0].addEventListener("click", function () {
            containtTrie.classList.toggle("afterclick");
            chevron_ouvert[0].classList.toggle("rotate");
          }); //-----------medie foreach--------------------

          media.forEach(function (element) {
            var photographerId = element.photographerId;
            var thisId = element.id;

            if (userID == photographerId) {
              displayId.push(thisId);
            }

            if (displayId.includes(element.id)) {
              var fullName;
              var firstName;

              (function () {
                //----decoupe les noms---------
                fullName = name;
                firstName = fullName.split(" ")[0]; //------------------------------------

                var picture = "";
                var video = ""; //---------picture ajout---------------

                if (element.image) {
                  picture = "assets/albumPhoto/".concat(firstName, "/").concat(element.image); // photoSlide.push(element.image);
                } //-----------video ajout--------------


                if (element.video) {
                  video = "assets/albumPhoto/".concat(firstName, "/").concat(element.video); //photoSlide.push(element.video);
                } // Maintenant, vérifiez si element.image est défini avant d'ajouter la balise img


                var imageElement = "";

                if (element.image) {
                  imageElement = "\n      <div class=\"img_block\">\n        <img src=\"".concat(picture, "\" class=\"imageDisplay\" alt=\"").concat(element.image, "\" />\n      </div>\n    ");
                } // Maintenant, vérifiez si element.video est défini avant d'ajouter la balise vidéo


                var videoElement = "";

                if (element.video) {
                  videoElement = "\n      <video class=\"imageDisplay\" controls width=\"100%\" height=\"100% id=\"videoPlayer\">\n        <source src=\"".concat(video, "\"  alt=\"").concat(element.video, "\" type=\"video/mp4\" />\n      </video>\n    ");
                } else {
                  videoElement = '<video style="display: none;"></video>';
                } //------------------------------------
                //--------addition des likes--------------


                Thelikes.push(element.likes);
                var somme = 0;

                for (var i = 0; i < Thelikes.length; i++) {
                  somme += Thelikes[i];
                }

                section.innerHTML += "\n      <div class=\"container\">\n      <div class=\"img_block\">\n      ".concat(imageElement, "\n      ").concat(videoElement, "\n      </div>\n      <div class=\"name_like\">\n      <div class=\"h3\">\n      <h3>").concat(element.title, "</h3>\n      </div>\n\n      <div class=\"nmberIcon\">\n      <p class=\"paraNumbIcon\">").concat(element.likes, "</p>\n      <ion-icon class=\"like\" name=\"heart\"></ion-icon>\n      </div>\n      </div>\n      </div>\n      "); //--------------click du like----------------

                var _loop = function _loop(_i) {
                  likeIcons[_i].addEventListener("click", function (e) {
                    if (likeIcons[_i].classList.contains("liked")) {
                      e.target.parentElement.children[0].textContent--;
                      somme--;

                      likeIcons[_i].classList.remove("liked");

                      likeIcons[_i].classList.remove("color");
                    } else {
                      e.target.parentElement.children[0].textContent++;
                      somme++;

                      likeIcons[_i].classList.add("liked");

                      likeIcons[_i].classList.add("color");
                    } // Mettez à jour le texte affiché avec la nouvelle valeur de somme


                    like_priceTotal.children[0].children[0].textContent = somme;
                    element.likes = e.target.parentElement.children[0].textContent;
                  });
                };

                for (var _i = 0; _i < likeIcons.length; _i++) {
                  _loop(_i);
                }

                photoSlide.push(element); //--------------click sur photo------------------

                var _loop2 = function _loop2(_i2) {
                  var sourceImg = "";
                  var sourcevideo = "";

                  imageDisplayClick[_i2].addEventListener("click", function (e) {
                    //console.log(e.srcElement.children[0].alt);
                    photoSlide.forEach(function (iteme) {
                      console.log(photoSlide);

                      if (iteme.image === e.target.alt) {
                        if (iteme.image) {
                          sourceImg = "assets/albumPhoto/".concat(firstName, "/").concat(iteme.image);
                        }

                        if (iteme.video) {
                          sourcevideo = "assets/albumPhoto/".concat(firstName, "/").concat(iteme.video);
                        }

                        noneAll.classList.add("none");
                        modalPhoto.classList.add("afficheModalPhoto");
                        modalPhoto.innerHTML += "\n            <ion-icon class=\"closeModule\" name=\"close-outline\"></ion-icon>\n            <ion-icon class=\"chevronmoins\" name=\"chevron-back-outline\"></ion-icon>\n            <div class=\"imgcontainer\"><img class=\"imgToSlide\" src=\"".concat(sourceImg, "\" alt=\"").concat(e.target.alt, "\"></div> \n           <ion-icon class=\"chevronplus\" name=\"chevron-forward-outline\"></ion-icon>\n            <h3>").concat(iteme.title, "</h3>\n\n          ");
                      }
                    });
                    chevronplus[0].addEventListener("click", function () {
                      console.log("plus");
                    });
                    chevronmoins[0].addEventListener("click", function () {
                      console.log("moins");
                    }); //--------------close module photo------------------

                    closeModule[0].addEventListener("click", function () {
                      noneAll.classList.remove("none");
                      modalPhoto.classList.remove("afficheModalPhoto");
                      modalPhoto.innerHTML = "";
                    });
                  });
                };

                for (var _i2 = 0; _i2 < imageDisplayClick.length; _i2++) {
                  _loop2(_i2);
                }
              })();
            }
          });

          for (i = 0; i < Thelikes.length; i++) {
            somme += Thelikes[i];
          }

          like_priceTotal.innerHTML += "\n  <div class=\"like_total\">\n      <p class=\"likeTotalPara\">".concat(somme, "</p>\n      <ion-icon name=\"heart\"></ion-icon>\n      </div>\n      <div class=\"prise_jour\">\n        <div class=\"prise\">").concat(price, "\xA3/ jour</div>\n      </div>\n  ");

        case 29:
        case "end":
          return _context.stop();
      }
    }
  });
}

getPhotographers();