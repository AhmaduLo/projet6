"use strict";

//Mettre le code JavaScript lié à la page photographer.html
var info_persso = document.querySelector(".info_persso");
var img = document.querySelector(".img");
var section = document.querySelector("section");
var like = document.querySelectorAll("ion-icon");

function getPhotographers() {
  var response, data, media, displayId, userID, picture, name, city, country, tagline;
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
          tagline = localStorage.getItem("tagline"); //console.log(userID);

          info_persso.innerHTML += "\n        <h2>".concat(name, "</h2>\n        <p>").concat(country, ",").concat(city, "</p>\n          <p>").concat(tagline, "</p>\n  ");
          img.innerHTML += " <img src=\"".concat(picture, "\" alt=\"\">");
          media.forEach(function (element) {
            var photographerId = element.photographerId;
            var thisId = element.id;

            if (userID == photographerId) {
              displayId.push(thisId);
            }

            if (displayId.includes(element.id)) {
              var fullName = name;
              var firstName = fullName.split(" ")[0]; // let totalLikes = 0;
              // totalLikes += element.likes;
              // console.log(totalLikes);
              //const picture = `assets/albumPhoto/${firstName}/${element.image}`;

              var _picture = "";
              var video = ""; //---------picture ajout---------------

              if (element.image) {
                _picture = "assets/albumPhoto/".concat(firstName, "/").concat(element.image);
              } //-----------video ajout--------------


              if (element.video) {
                video = "assets/albumPhoto/".concat(firstName, "/").concat(element.video);
              } // Maintenant, vérifiez si element.image est défini avant d'ajouter la balise img


              var imageElement = "";

              if (element.image) {
                imageElement = "\n      <div class=\"img_block\">\n        <img src=\"".concat(_picture, "\" alt=\"").concat(element.image, "\" />\n      </div>\n    ");
              } // Maintenant, vérifiez si element.video est défini avant d'ajouter la balise vidéo


              var videoElement = "";

              if (element.video) {
                videoElement = "\n      <video controls width=\"100%\" height=\"100% id=\"videoPlayer\">\n        <source src=\"".concat(video, "\" type=\"video/mp4\" />\n      </video>\n    ");
              } else {
                videoElement = '<video style="display: none;"></video>';
              }

              section.innerHTML += "\n      <div class=\"container\">\n      <div class=\"img_block\">\n      ".concat(imageElement, "\n      ").concat(videoElement, "\n      </div>\n      <div class=\"name_like\">\n      <div class=\"h3\">\n      <h3>").concat(element.title, "</h3>\n      </div>\n      <div class=\"nmberIcon\">\n      <p>").concat(element.likes, "</p>\n      <ion-icon class=\"like\" name=\"heart\"></ion-icon>\n      </div>\n      </div>\n      </div>\n\n      <div class=\"like_priceTotal\">\n      <div class=\"like_total\">\n        <p>12555485</p>\n        <ion-icon class=\"like\" name=\"heart\"></ion-icon>\n      </div>\n      <div class=\"prise_jour\">\n        <div class=\"prise\">300\xA3/jour</div>\n      </div>\n    </div>\n      ");
            }
          });

        case 19:
        case "end":
          return _context.stop();
      }
    }
  });
}

getPhotographers();