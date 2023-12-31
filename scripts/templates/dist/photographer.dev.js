"use strict";

function photographerTemplate(data) {
  var name = data.name,
      portrait = data.portrait,
      country = data.country,
      city = data.city,
      tagline = data.tagline,
      price = data.price,
      id = data.id; // Vérifie si vous êtes sur la page d'accueil (home)

  if (window.location.pathname === "/") {
    // Efface tout le contenu du local storage
    localStorage.clear();
  }

  var picture = "assets/profil/".concat(portrait);
  var article = document.createElement("article");

  function getUserCardDOM() {
    article.className = "articleContainer";
    var img_div = document.createElement("div");
    var img = document.createElement("img");
    img_div.className = "img_div";
    img.setAttribute("src", picture);
    var h2 = document.createElement("h2");
    var h3 = document.createElement("h3");
    var para1 = document.createElement("p");
    var para2 = document.createElement("p");
    h2.textContent = name;
    h3.textContent = country + " , " + city;
    para1.textContent = tagline;
    para2.textContent = price + "£/jour";
    article.appendChild(img_div);
    img_div.appendChild(img);
    article.appendChild(h2);
    article.appendChild(h3);
    article.appendChild(para1);
    article.appendChild(para2);
    img_div.style.cursor = "pointer";

    function pagePhotographer() {
      var userID = id;
      localStorage.setItem("userID", userID);
      localStorage.setItem("name", name);
      localStorage.setItem("country", country);
      localStorage.setItem("city", city);
      localStorage.setItem("tagline", tagline);
      localStorage.setItem("picture", picture);
      localStorage.setItem("price", price);
      window.location.href = "photographer.html";
    }

    img_div.addEventListener("click", function () {
      pagePhotographer();
    });
    var currentIndex = 0; // document.addEventListener("keydown", (event) => {
    //   const articles = document.querySelectorAll(".articleContainer");
    //   switch (event.key) {
    //     case "ArrowUp":
    //       navigate(-3);
    //       break;
    //     case "ArrowDown":
    //       navigate(3);
    //       break;
    //     case "ArrowLeft":
    //       navigate(-1);
    //       break;
    //     case "ArrowRight":
    //       navigate(1);
    //       break;
    //     case "Enter":
    //       clickActiveArticle();
    //       //console.log(event);
    //       break;
    //   }
    //   function navigate(direction) {
    //     currentIndex += direction;
    //     // Assurez-vous que l'index reste dans les limites des articles
    //     currentIndex = Math.max(0, Math.min(currentIndex, articles.length - 1));
    //     //Supprimer toute classe « active » existante
    //     articles.forEach((article, index) => {
    //       article.classList.remove("active");
    //       if (index === currentIndex) {
    //         // Ajouter une classe 'active' à l'article actuel
    //         article.classList.add("active");
    //       }
    //     });
    //   }
    //   function clickActiveArticle() {
    //     // Simuler un clic sur l'article actif
    //     const activeArticle = articles[currentIndex];
    //     if (activeArticle) {
    //       const clickEvenement = activeArticle.children[0];
    //       clickEvenement.click();
    //     }
    //   }
    // });
    //pagePhotographer();

    return article;
  }

  return {
    name: name,
    picture: picture,
    country: country,
    city: city,
    tagline: tagline,
    price: price,
    id: id,
    getUserCardDOM: getUserCardDOM
  };
}

var currentIndex = 0;
document.addEventListener("keydown", function (event) {
  var focusableElements = document.querySelectorAll("div, h1, h2, h3, p");
  var focusableArray = Array.from(focusableElements);

  if (currentIndex === -1) {
    currentIndex = 0; // Définit sur le premier élément si currentIndex est -1

    focusableArray[currentIndex].classList.add("active");
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
      clickElement();
      break;
  }

  function navigate(direction) {
    // Supprime la classe 'active' de l'élément actuellement sélectionné
    focusableArray[currentIndex].classList.remove("activeOne");
    currentIndex += direction;
    currentIndex = Math.max(0, Math.min(currentIndex, focusableArray.length - 1)); // Ajoute la classe 'active' à l'élément actuellement sélectionné

    focusableArray[currentIndex].classList.add("activeOne"); // Donne le focus à l'élément actuellement sélectionné

    focusableArray[currentIndex].focus();
  }

  function clickElement() {
    // Simuler un clic sur l'élément actuellement focalisé
    var elementToClick = focusableArray[currentIndex];

    if (elementToClick) {
      elementToClick.click();
    }
  }
});