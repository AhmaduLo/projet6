"use strict";

function getPhotographers() {
  var response, data, media, displayId, userID, picture, name, city, country, tagline, price, Thelikes, containtTrie, chevron_ouvert, ArrayTries, i;
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
          chevron_ouvert = document.getElementsByClassName("chevron_ouvert"); //-------------tableau des element a trier-----

          ArrayTries = ["populaire", "Date", "Titre"];
          ArrayTries.forEach(function (item) {
            containtTrie.innerHTML += "\n    <div>".concat(item, " </div>\n    <span></span>\n    ");
            item.addEventListener("click", function (e) {
              console.log(e.target.textContent);
            });
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
                  picture = "assets/albumPhoto/".concat(firstName, "/").concat(element.image);
                } //-----------video ajout--------------


                if (element.video) {
                  video = "assets/albumPhoto/".concat(firstName, "/").concat(element.video);
                } // Maintenant, vérifiez si element.image est défini avant d'ajouter la balise img


                var imageElement = "";

                if (element.image) {
                  imageElement = "\n      <div class=\"img_block\">\n        <img src=\"".concat(picture, "\" class=\"imageDisplay\" alt=\"").concat(element.image, "\" />\n      </div>\n    ");
                } // Maintenant, vérifiez si element.video est défini avant d'ajouter la balise vidéo


                var videoElement = "";

                if (element.video) {
                  videoElement = "\n      <video controls width=\"100%\" height=\"100% id=\"videoPlayer\">\n        <source src=\"".concat(video, "\" type=\"video/mp4\" />\n      </video>\n    ");
                } else {
                  videoElement = '<video style="display: none;"></video>';
                } //--------addition des likes--------------


                Thelikes.push(element.likes);
                var somme = 0;

                for (var i = 0; i < Thelikes.length; i++) {
                  somme += Thelikes[i];
                }

                section.innerHTML += "\n      <div class=\"container\">\n      <div class=\"img_block\">\n      ".concat(imageElement, "\n      ").concat(videoElement, "\n      </div>\n      <div class=\"name_like\">\n      <div class=\"h3\">\n      <h3>").concat(element.title, "</h3>\n      </div>\n      \n      <div class=\"nmberIcon\">\n      <p class=\"paraNumbIcon\">").concat(element.likes, "</p>\n      <ion-icon class=\"like\" name=\"heart\"></ion-icon>\n      </div>\n      </div>\n      </div>\n      "); //--------------click du like----------------

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
              })();
            }
          });

          for (i = 0; i < Thelikes.length; i++) {
            somme += Thelikes[i];
          }

          like_priceTotal.innerHTML += "\n  <div class=\"like_total\">\n      <p class=\"likeTotalPara\">".concat(somme, "</p>  \n      <ion-icon name=\"heart\"></ion-icon>\n      </div>\n      <div class=\"prise_jour\">\n        <div class=\"prise\">").concat(price, "\xA3/ jour</div>\n      </div>\n  ");

        case 28:
        case "end":
          return _context.stop();
      }
    }
  });
}