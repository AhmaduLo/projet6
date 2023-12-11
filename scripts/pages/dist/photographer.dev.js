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
var imgcontainer = document.querySelector(".imgcontainer");
var imgcontainer1None = document.querySelector(".imgcontainer1None");
var chevronplus = document.getElementsByClassName("chevronplus");
var chevronmoins = document.getElementsByClassName("chevronmoins");
var imgToSlide = document.getElementsByClassName("imgToSlide");
var ItemeTitle = document.getElementsByClassName("ItemeTitle");
var containt_all = document.getElementsByClassName("containt_all");
var containerBox = document.getElementsByName("container");
var elementTexteClique = document.getElementsByName("elementTexteClique");
var containerTrier = document.querySelector(".containerTrier");
var imgNone = document.getElementsByClassName("imgNone");
var photoSlide = [];
var somme = 0;
var totalLikes = 0;

function getPhotographers() {
  var response, data, media, displayId, userID, picture, name, city, country, tagline, price, Thelikes, containtTrie, chevron_ouvert, elementTexteClique, ArrayTries, addClickEventListeners, handleItemClick, i, currentIndex, focusableArray;
  return regeneratorRuntime.async(function getPhotographers$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          handleItemClick = function _ref2(e, index) {
            // Échangez l'élément cliqué avec celui à l'index 0 dans le tableau ArrayTries
            var clickedItem = ArrayTries[index];
            ArrayTries[index] = ArrayTries[0];
            ArrayTries[0] = clickedItem; // Réinitialisez le contenu de containerTrier

            containerTrier.innerHTML = ""; // Mise à jour du tableau ArrayTries

            var newArrayTries = ArrayTries.map(function (item) {
              return {
                name: item.name
              };
            });
            ArrayTries = newArrayTries; // Affichez les éléments dans containerTrier

            ArrayTries.forEach(function (item) {
              containerTrier.innerHTML += "\n             <div class=\"elementTexteClique\">".concat(item.name, "</div>\n             <span></span>\n         ");
            }); // Ajouter à nouveau les gestionnaires d'événements après la mise à jour

            addClickEventListeners(); //--------------------------------------------------------

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
              section.appendChild(photo); //console.log(photo.children[1].children[1].children[1]);
              //--------------click du like----------------

              var _loop = function _loop(i) {
                likeIcons[i].addEventListener("click", function (e) {
                  likeIcons[i].classList.add("color");
                  console.log(e);
                });
              };

              for (var i = 0; i < likeIcons.length; i++) {
                _loop(i);
              }
            });
          };

          addClickEventListeners = function _ref() {
            var elementTexteClique = document.querySelectorAll(".elementTexteClique");
            elementTexteClique.forEach(function (element, index) {
              element.addEventListener("click", function (e) {
                handleItemClick(e, index);
              });
            });
          };

          _context.next = 4;
          return regeneratorRuntime.awrap(fetch("http://127.0.0.1:5501/data/photographers.json"));

        case 4:
          response = _context.sent;

          if (response.ok) {
            _context.next = 7;
            break;
          }

          throw new Error("Erreur lors de la récupération des photographes");

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(response.json());

        case 9:
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

          ArrayTries = [];
          ArrayTries = [{
            name: "Populaire"
          }, {
            name: "Date"
          }, {
            name: "Titre"
          }];
          ArrayTries.forEach(function (item) {
            containerTrier.innerHTML += " \n    <div class=\"elementTexteClique\">".concat(item.name, " </div>\n    <span></span>\n    ");
          }); //---------- Add click event listener to each element---populaire-----

          addClickEventListeners(); //------------chevron du trie--------------------

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
              var maPropreKey;

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

                section.innerHTML += "\n      <div class=\"container\" data-likes=".concat(element.likes, " data-date=").concat(element.date, ">\n      <div class=\"img_block\">\n      ").concat(imageElement, "\n      ").concat(videoElement, "\n      </div>\n      <div class=\"name_like\">\n      <div class=\"h3\">\n      <h3 class=\"title\">").concat(element.title, "</h3> \n      </div>\n      <div class=\"nmberIcon\">\n      <p class=\"paraNumbIcon\">").concat(element.likes, "</p>\n      <span><ion-icon class=\"like\" name=\"heart\"></ion-icon></span>\n      </div>\n      </div>\n      </div>\n      "); //--------------click du like----------------

                var _loop2 = function _loop2(_i) {
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
                  _loop2(_i);
                }

                photoSlide.push(element); //--------------click sur photo------------------

                var _loop3 = function _loop3(_i2) {
                  var cont = 0;
                  var sourceImg = "";
                  maPropreKey = 0;
                  var sourcevideo = "";

                  imageDisplayClick[_i2].addEventListener("click", function (e) {
                    photoSlide.forEach(function (iteme) {
                      if (iteme.image === e.target.alt) {
                        var _imgNone = document.getElementsByClassName("imgNone");

                        cont = containt_all.length + 0;
                        imgcontainer.style.display = "none";

                        if (iteme.image) {
                          sourceImg = "assets/albumPhoto/".concat(firstName, "/").concat(iteme.image);
                          imgcontainer1None.innerHTML += "                               \n                <img id=\"imgNone\"  src=\"".concat(sourceImg, "\" alt=\"").concat(e.target.alt, "\">            \n                <h3 class=\"ItemeTitle\">").concat(iteme.title, "</h3>                        \n                ");
                        } else if (iteme.video) {
                          sourcevideo = "assets/albumPhoto/".concat(firstName, "/").concat(iteme.video);
                          imgcontainer1None.innerHTML += "                               \n                <video class=\"imageDisplay\" controls width=\"100%\" height=\"100% id=\"videoPlayer\">\n                <source src=\"".concat(sourcevideo, "\"type=\"video/mp4\" /></video>          \n                <h3 class=\"ItemeTitle\">").concat(iteme.title, "</h3>                        \n                ");
                        }
                      }

                      if (iteme.image) {
                        sourceImg = "assets/albumPhoto/".concat(firstName, "/").concat(iteme.image);
                        imgcontainer.innerHTML += "\n                <div class=\"containt_all\">\n                <img class=\"imgToSlide\" src=\"".concat(sourceImg, "\" alt=\"").concat(e.target.alt, "\">\n                <h3 class=\"ItemeTitle\">").concat(iteme.title, "</h3>\n                </div>\n                ");
                      } else if (iteme.video) {
                        sourcevideo = "assets/albumPhoto/".concat(firstName, "/").concat(iteme.video);
                        imgcontainer.innerHTML += "\n              <div class=\"containt_all\">\n              <video class=\"imageDisplay\" controls width=\"100%\" height=\"100% id=\"videoPlayer\">\n              <source src=\"".concat(sourcevideo, "\"type=\"video/mp4\" /></video>\n              <h3 class=\"ItemeTitle\">").concat(iteme.title, "</h3>\n              </div>\n              ");
                      }
                    }); //----------------slide >----------------------

                    chevronplus[0].addEventListener("click", function () {
                      imgcontainer1None.style.display = "none";
                      imgcontainer.style.display = "block";
                      containt_all[cont].classList.remove("active");

                      if (cont < containt_all.length - 1) {
                        cont++;
                      } else {
                        cont = 0;
                      }

                      containt_all[cont].classList.add("active");
                    }); //  //----------------slide <----------------------

                    chevronmoins[0].addEventListener("click", function () {
                      containt_all[cont].classList.remove("active");

                      if (cont > 0) {
                        cont--;
                      } else {
                        cont = containt_all.length - 1;
                      }

                      containt_all[cont].classList.add("active");
                    }); //----------------click avec fleche-----------------------

                    document.addEventListener("keydown", function (event) {
                      if (event.key === "ArrowRight") {
                        imgcontainer1None.style.display = "none";
                        imgcontainer.style.display = "block";
                        containt_all[cont].classList.remove("active");

                        if (cont < containt_all.length - 1) {
                          cont++;
                        } else {
                          cont = 0;
                        }

                        containt_all[cont].classList.add("active");
                      } else if (event.key === "ArrowLeft") {
                        containt_all[cont].classList.remove("active");

                        if (cont > 0) {
                          cont--;
                        } else {
                          cont = containt_all.length - 1;
                        }

                        containt_all[cont].classList.add("active");
                      } else if (event.key === "Enter") {
                        closeModule[0].click();
                      }
                    }); //----------------open module---------------------

                    noneAll.classList.add("none");
                    modalPhoto.classList.add("afficheModalPhoto"); //--------------close module photo------------------

                    closeModule[0].addEventListener("click", function () {
                      noneAll.classList.remove("none");
                      modalPhoto.classList.remove("afficheModalPhoto");
                      modalPhoto.innerHTML = "";
                      location.reload();
                    });
                  });
                };

                for (var _i2 = 0; _i2 < imageDisplayClick.length; _i2++) {
                  _loop3(_i2);
                }
              })();
            }
          });

          for (i = 0; i < Thelikes.length; i++) {
            somme += Thelikes[i];
          }

          like_priceTotal.innerHTML += "\n  <div class=\"like_total\">\n      <p class=\"likeTotalPara\">".concat(somme, "</p>\n      <ion-icon name=\"heart\"></ion-icon>\n      </div>\n      <div class=\"prise_jour\">\n        <div class=\"prise\">").concat(price, "\xA3/ jour</div>\n      </div>\n  "); //------------depklacer avec les fleche---------------------

          currentIndex = 0;
          document.addEventListener("keydown", function (event) {
            var focusableElements = document.querySelectorAll("div, h1, h2, h3, p,span,button,input,textarea"); // Filtrer les éléments visibles (display: block)

            var visibleElements = Array.from(focusableElements).filter(function (element) {
              return window.getComputedStyle(element).display !== "none";
            });
            focusableArray = visibleElements;

            if (currentIndex === -1) {
              currentIndex = 0;
              focusableArray[currentIndex].classList.add("activeOne");
              focusableArray[currentIndex].focus();
            }

            switch (event.key) {
              case "ArrowLeft":
                navigate(-1);
                break;

              case "ArrowRight":
                navigate(1);
                break;

              case "ArrowUp":
                navigate(-5);
                break;

              case "ArrowDown":
                navigate(5);
                break;

              case "Enter":
                clickActiveContainer();
                break;
            }

            function navigate(direction) {
              focusableArray[currentIndex].classList.remove("activeOne");
              currentIndex += direction;
              currentIndex = Math.max(0, Math.min(currentIndex, focusableArray.length - 1));
              focusableArray[currentIndex].classList.add("activeOne");
              focusableArray[currentIndex].focus();
              focusableArray[currentIndex].scrollIntoView({
                behavior: "smooth",
                block: "center"
              }); //--------ouverture du triee-------------

              var currentElement = focusableArray[currentIndex];
              var classesList = Array.from(currentElement.classList);
              classesList.forEach(function (classe) {
                if (classe === "containtTrie") {
                  console.log("yes");
                  containtTrie.classList.toggle("afterclick");
                  chevron_ouvert[0].classList.toggle("rotate");
                }
              });
            }

            function clickActiveContainer() {
              var elementToClick = focusableArray[currentIndex];

              if (elementToClick) {
                //console.log(elementToClick);
                elementToClick.children[0].click();
              }
            }
          }); // Observer les changements dans le DOM (par exemple, les changements de display)
          // const observer = new MutationObserver((mutations) => {
          //   // Mettez à jour la liste des éléments focusables lorsque des mutations sont détectées
          //   const updatedVisibleElements = Array.from(focusableArray).filter(
          //     (element) => window.getComputedStyle(element).display !== "none"
          //   );
          //   focusableArray = updatedVisibleElements;
          // });
          // // Configuration de l'observateur
          // const observerConfig = { attributes: true, childList: true, subtree: true };
          // // Commencer l'observation du DOM
          // observer.observe(document.body, observerConfig);

        case 35:
        case "end":
          return _context.stop();
      }
    }
  });
}

getPhotographers();