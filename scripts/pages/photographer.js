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
const imgcontainer1None = document.querySelector(".imgcontainer1None");
const chevronplus = document.getElementsByClassName("chevronplus");
const chevronmoins = document.getElementsByClassName("chevronmoins");
const imgToSlide = document.getElementsByClassName("imgToSlide");
const ItemeTitle = document.getElementsByClassName("ItemeTitle");
const containt_all = document.getElementsByClassName("containt_all");
const containerBox = document.getElementsByName("container");
const elementTexteClique = document.getElementsByName("elementTexteClique");
const containerTrier = document.querySelector(".containerTrier");
const imgNone = document.getElementsByClassName("imgNone");

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
  let ArrayTries = [];
  ArrayTries = [{ name: "Populaire" }, { name: "Date" }, { name: "Titre" }];
  ArrayTries.forEach((item) => {
    containerTrier.innerHTML += ` 
    <div class="elementTexteClique">${item.name} </div>
    <span></span>
    `;
  });

  //---------- Add click event listener to each element---populaire-----
  function addClickEventListeners() {
    const elementTexteClique = document.querySelectorAll(".elementTexteClique");

    elementTexteClique.forEach((element, index) => {
      element.addEventListener("click", (e) => {
        handleItemClick(e, index);
      });
    });
  }
  function handleItemClick(e, index) {
    // Échangez l'élément cliqué avec celui à l'index 0 dans le tableau ArrayTries
    const clickedItem = ArrayTries[index];
    ArrayTries[index] = ArrayTries[0];
    ArrayTries[0] = clickedItem;
    // Réinitialisez le contenu de containerTrier
    containerTrier.innerHTML = "";
    // Mise à jour du tableau ArrayTries
    const newArrayTries = ArrayTries.map((item) => ({ name: item.name }));
    ArrayTries = newArrayTries;
    // Affichez les éléments dans containerTrier
    ArrayTries.forEach((item) => {
      containerTrier.innerHTML += `
             <div class="elementTexteClique">${item.name}</div>
             <span></span>
         `;
    });
    // Ajouter à nouveau les gestionnaires d'événements après la mise à jour
    addClickEventListeners();
    //--------------------------------------------------------
    const photos = Array.from(section.getElementsByClassName("container"));

    if (e.target.textContent == "Populaire") {
      // Triez les photos en fonction du nombre de likes
      photos.sort(function (a, b) {
        const likesA = parseInt(a.getAttribute("data-likes"));
        const likesB = parseInt(b.getAttribute("data-likes"));
        return likesB - likesA; // Triez de manière décroissante
      });
    } else if (e.target.textContent == "Date") {
      photos.sort(function (a, b) {
        const dateA = parseInt(a.getAttribute("data-date"));
        const dateB = parseInt(b.getAttribute("data-date"));
        return dateB - dateA; // Triez de manière décroissante
      });
    } else {
      photos.sort(function (a, b) {
        const titleA = a.querySelector(".title").textContent;
        const titleB = b.querySelector(".title").textContent;
        return titleA.localeCompare(titleB); // Triez de manière alphabétique
      });
    }
    // Supprimez toutes les photos du conteneur
    section.innerHTML = "";
    // Ajoutez les photos triées au conteneur
    photos.forEach(function (photo) {
      section.appendChild(photo);
      //console.log(photo.children[1].children[1].children[1]);
      //--------------click du like----------------
      for (let i = 0; i < likeIcons.length; i++) {
        likeIcons[i].addEventListener("click", (e) => {
          likeIcons[i].classList.add("color");
          console.log(e);
        });
      }
    });
  }
  addClickEventListeners();
  //------------chevron du trie--------------------
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
      <div class="container" data-likes=${element.likes} data-date=${element.date}>
      <div class="img_block">
      ${imageElement}
      ${videoElement}
      </div>
      <div class="name_like">
      <div class="h3">
      <h3 class="title">${element.title}</h3> 
      </div>
      <div class="nmberIcon">
      <p class="paraNumbIcon">${element.likes}</p>
      <span><ion-icon class="like" name="heart"></ion-icon></span>
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
        var maPropreKey = 0;
        let sourcevideo = "";
        imageDisplayClick[i].addEventListener("click", (e) => {
          photoSlide.forEach((iteme) => {
            if (iteme.image === e.target.alt) {
              const imgNone = document.getElementsByClassName("imgNone");
              cont = containt_all.length + 0;
              imgcontainer.style.display = "none";
              if (iteme.image) {
                sourceImg = `assets/albumPhoto/${firstName}/${iteme.image}`;
                imgcontainer1None.innerHTML += `                               
                <img id="imgNone"  src="${sourceImg}" alt="${e.target.alt}">            
                <h3 class="ItemeTitle">${iteme.title}</h3>                        
                `;
              } else if (iteme.video) {
                sourcevideo = `assets/albumPhoto/${firstName}/${iteme.video}`;
                imgcontainer1None.innerHTML += `                               
                <video class="imageDisplay" controls width="100%" height="100% id="videoPlayer">
                <source src="${sourcevideo}"type="video/mp4" /></video>          
                <h3 class="ItemeTitle">${iteme.title}</h3>                        
                `;
              }
            }
            if (iteme.image) {
              sourceImg = `assets/albumPhoto/${firstName}/${iteme.image}`;
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
            imgcontainer1None.style.display = "none";
            imgcontainer.style.display = "block";
            containt_all[cont].classList.remove("active");
            if (cont < containt_all.length - 1) {
              cont++;
            } else {
              cont = 0;
            }
            containt_all[cont].classList.add("active");
          });
          //  //----------------slide <----------------------
          chevronmoins[0].addEventListener("click", () => {
            containt_all[cont].classList.remove("active");
            if (cont > 0) {
              cont--;
            } else {
              cont = containt_all.length - 1;
            }
            containt_all[cont].classList.add("active");
          });
          //----------------click avec fleche-----------------------
          document.addEventListener("keydown", (event) => {
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

  //------------depklacer avec les fleche---------------------
  let currentIndex = 0;
  let focusableArray;
  document.addEventListener("keydown", (event) => {
    const focusableElements = document.querySelectorAll(
      "div, h1, h2, h3, p,span,button,input,textarea"
    );
    // Filtrer les éléments visibles (display: block)
    const visibleElements = Array.from(focusableElements).filter(
      (element) => window.getComputedStyle(element).display !== "none"
    );
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
      currentIndex = Math.max(
        0,
        Math.min(currentIndex, focusableArray.length - 1)
      );

      focusableArray[currentIndex].classList.add("activeOne");
      focusableArray[currentIndex].focus();
      focusableArray[currentIndex].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      //--------ouverture du triee-------------
      const currentElement = focusableArray[currentIndex];
      const classesList = Array.from(currentElement.classList);
      classesList.forEach((classe) => {
        if (classe === "containtTrie") {
          console.log("yes");
          containtTrie.classList.toggle("afterclick");
          chevron_ouvert[0].classList.toggle("rotate");
        }
      });
    }
    function clickActiveContainer() {
      const elementToClick = focusableArray[currentIndex];
      if (elementToClick) {
        //console.log(elementToClick);
        elementToClick.children[0].click();
      }
    }
  });
  // Observer les changements dans le DOM (par exemple, les changements de display)
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
}

getPhotographers();
