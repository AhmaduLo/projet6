//Mettre le code JavaScript lié à la page photographer.html
const info_persso = document.querySelector(".info_persso");
const img = document.querySelector(".img");
const section = document.querySelector("section");
const likeIcons = document.getElementsByClassName("like");
const likeTotalPara = document.querySelector(".likeTotalPara");
const like_priceTotal = document.querySelector(".like_priceTotal");
const imageDisplayClick = document.getElementsByClassName("imageDisplay");
const noneAll = document.querySelector(".noneAll");
const closeModule = document.getElementsByClassName("closeModule");
const modalPhoto = document.querySelector(".modalPhoto");
const imgcontainer = document.querySelector(".imgcontainer");
const chevronplus = document.getElementsByClassName("chevronplus");
const chevronmoins = document.getElementsByClassName("chevronmoins");
const imgToSlide = document.getElementsByClassName("imgToSlide");
const ItemeTitle = document.getElementsByClassName("ItemeTitle");
const containt_all = document.getElementsByClassName("containt_all");
const photoSlide = [];

let somme = 0;
let totalLikes = 0;
async function getPhotographers() {
  const response = await fetch("http://127.0.0.1:5501/data/photographers.json");
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des photographes");
  }
  const data = await response.json();
  const media = data.media;
  const displayId = [];
  // Récupérer l'ID depuis le localStorage
  const userID = localStorage.getItem("userID");
  const picture = localStorage.getItem("picture");
  const name = localStorage.getItem("name");
  const city = localStorage.getItem("city");
  const country = localStorage.getItem("country");
  const tagline = localStorage.getItem("tagline");
  const price = localStorage.getItem("price");
  const Thelikes = [];
  //console.log(userID);
  info_persso.innerHTML += `
        <h2>${name}</h2>
        <p>${country},${city}</p>
          <p>${tagline}</p>
  `;

  img.innerHTML += ` <img src="${picture}" alt="">`;
  //----------partie filtre--------------
  const containtTrie = document.querySelector(".containtTrie");
  const chevron_ouvert = document.getElementsByClassName("chevron_ouvert");
  const elementTexteClique = document.getElementsByClassName(
    "elementTexteClique"
  );

  //-------------tableau des element a trier-----
  let ArrayTries = [{ name: "Populaire" }, { name: "Date" }, { name: "Titre" }];
  //console.log(ArrayTries);
  ArrayTries.forEach((item) => {
    containtTrie.innerHTML += `
    <div class="elementTexteClique">${item.name} </div>
    <span></span>
    `;
  });
  chevron_ouvert[0].addEventListener("click", () => {
    containtTrie.classList.toggle("afterclick");
    chevron_ouvert[0].classList.toggle("rotate");
  });

  //-----------medie foreach--------------------
  media.forEach((element) => {
    const photographerId = element.photographerId;
    let thisId = element.id;
    if (userID == photographerId) {
      displayId.push(thisId);
    }

    if (displayId.includes(element.id)) {
      //----decoupe les noms---------
      var fullName = name;
      var firstName = fullName.split(" ")[0];

      //------------------------------------
      let picture = "";
      let video = "";
      //---------picture ajout---------------
      if (element.image) {
        picture = `assets/albumPhoto/${firstName}/${element.image}`;
        // photoSlide.push(element.image);
      }

      //-----------video ajout--------------
      if (element.video) {
        video = `assets/albumPhoto/${firstName}/${element.video}`;
        //photoSlide.push(element.video);
      }

      // Maintenant, vérifiez si element.image est défini avant d'ajouter la balise img
      let imageElement = "";
      if (element.image) {
        imageElement = `
      <div class="img_block">
        <img src="${picture}" class="imageDisplay" alt="${element.image}" />
      </div>
    `;
      }
      // Maintenant, vérifiez si element.video est défini avant d'ajouter la balise vidéo
      let videoElement = "";
      if (element.video) {
        videoElement = `
      <video class="imageDisplay" controls width="100%" height="100% id="videoPlayer">
        <source src="${video}"  alt="${element.video}" type="video/mp4" />
      </video>
    `;
      } else {
        videoElement = '<video style="display: none;"></video>';
      }

      //------------------------------------

      //--------addition des likes--------------
      Thelikes.push(element.likes);
      let somme = 0;
      for (let i = 0; i < Thelikes.length; i++) {
        somme += Thelikes[i];
      }

      section.innerHTML += `
      <div class="container">
      <div class="img_block">
      ${imageElement}
      ${videoElement}
      </div>
      <div class="name_like">
      <div class="h3">
      <h3>${element.title}</h3>
      </div>

      <div class="nmberIcon">
      <p class="paraNumbIcon">${element.likes}</p>
      <ion-icon class="like" name="heart"></ion-icon>
      </div>
      </div>
      </div>
      `;

      //--------------click du like----------------
      for (let i = 0; i < likeIcons.length; i++) {
        likeIcons[i].addEventListener("click", (e) => {
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
          }
          // Mettez à jour le texte affiché avec la nouvelle valeur de somme
          like_priceTotal.children[0].children[0].textContent = somme;
          element.likes = e.target.parentElement.children[0].textContent;
        });
      }

      photoSlide.push(element);
      //--------------click sur photo------------------
      for (let i = 0; i < imageDisplayClick.length; i++) {
        let cont = 0;
        let sourceImg = "";

        let sourcevideo = "";
        imageDisplayClick[i].addEventListener("click", (e) => {
          photoSlide.forEach((iteme) => {
            if (iteme.image) {
              sourceImg = `assets/albumPhoto/${firstName}/${iteme.image}`;
              // if (sourceImg === e.target.alt) {
              //   console.log(sourceImg);
              // }
              imgcontainer.innerHTML += ` 
              <div class="containt_all">          
              <img class="imgToSlide" src="${sourceImg}" alt="${e.target.alt}">            
              <h3 class="ItemeTitle">${iteme.title}</h3>  
              </div> 
              `;
            } else if (iteme.video) {
              sourcevideo = `assets/albumPhoto/${firstName}/${iteme.video}`;
              imgcontainer.innerHTML += `
            <div class="containt_all">
            <video class="imageDisplay" controls width="100%" height="100% id="videoPlayer">
            <source src="${sourcevideo}"type="video/mp4" /></video>
            <h3 class="ItemeTitle">${iteme.title}</h3>
            </div>
            `;
            }
          });
          //----------------slide >----------------------
          chevronplus[0].addEventListener("click", () => {
            containt_all[cont].classList.remove("active");
            if (cont < containt_all.length - 1) {
              cont++;
            } else {
              cont = 0;
            }
            containt_all[cont].classList.add("active");
          });
          //----------------slide <----------------------
          chevronmoins[0].addEventListener("click", () => {
            containt_all[cont].classList.remove("active");
            if (cont > 0) {
              cont--;
            } else {
              cont = containt_all.length - 1;
            }
            containt_all[cont].classList.add("active");
          });
          //----------------open module---------------------
          noneAll.classList.add("none");
          modalPhoto.classList.add("afficheModalPhoto");
          //--------------close module photo------------------
          closeModule[0].addEventListener("click", () => {
            noneAll.classList.remove("none");
            modalPhoto.classList.remove("afficheModalPhoto");
            modalPhoto.innerHTML = "";
            location.reload();
          });
        });
      }
    }
  });
  for (let i = 0; i < Thelikes.length; i++) {
    somme += Thelikes[i];
  }
  like_priceTotal.innerHTML += `
  <div class="like_total">
      <p class="likeTotalPara">${somme}</p>
      <ion-icon name="heart"></ion-icon>
      </div>
      <div class="prise_jour">
        <div class="prise">${price}£/ jour</div>
      </div>
  `;
}

getPhotographers();
