"use strict";

function photographerTemplate(data) {
  var name = data.name,
      portrait = data.portrait,
      country = data.country,
      city = data.city,
      tagline = data.tagline,
      price = data.price,
      id = data.id;
  var picture = "assets/profil/".concat(portrait);

  function getUserCardDOM() {
    var article = document.createElement("article");
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
    h2.addEventListener("click", function () {
      var userID = id;
      localStorage.setItem("userID", userID);
      localStorage.setItem("name", name);
      localStorage.setItem("country", country);
      localStorage.setItem("city", city);
      localStorage.setItem("tagline", tagline);
      localStorage.setItem("picture", picture);
      localStorage.setItem("price", price);
      window.location.href = "photographer.html";
    });
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