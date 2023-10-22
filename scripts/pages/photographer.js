//Mettre le code JavaScript lié à la page photographer.html
const info_persso = document.querySelector(".info_persso");
const img = document.querySelector(".img");
const section = document.querySelector("section");
const like = document.querySelectorAll("ion-icon");

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
  //console.log(userID);
  info_persso.innerHTML += `
        <h2>${name}</h2>
        <p>${country},${city}</p>
          <p>${tagline}</p>
  `;

  img.innerHTML += ` <img src="${picture}" alt="">`;

  media.forEach((element) => {
    const photographerId = element.photographerId;
    let thisId = element.id;
    if (userID == photographerId) {
      displayId.push(thisId);
    }
    if (displayId.includes(element.id)) {
      var fullName = name;
      var firstName = fullName.split(" ")[0];
      // let totalLikes = 0;
      // totalLikes += element.likes;
      // console.log(totalLikes);
      //const picture = `assets/albumPhoto/${firstName}/${element.image}`;
      let picture = "";
      let video = "";
      //---------picture ajout---------------
      if (element.image) {
        picture = `assets/albumPhoto/${firstName}/${element.image}`;
      }
      //-----------video ajout--------------
      if (element.video) {
        video = `assets/albumPhoto/${firstName}/${element.video}`;
      }

      // Maintenant, vérifiez si element.image est défini avant d'ajouter la balise img
      let imageElement = "";
      if (element.image) {
        imageElement = `
      <div class="img_block">
        <img src="${picture}" alt="${element.image}" />
      </div>
    `;
      }
      // Maintenant, vérifiez si element.video est défini avant d'ajouter la balise vidéo
      let videoElement = "";
      if (element.video) {
        videoElement = `
      <video controls width="100%" height="100% id="videoPlayer">
        <source src="${video}" type="video/mp4" />
      </video>
    `;
      } else {
        videoElement = '<video style="display: none;"></video>';
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
      <p>${element.likes}</p>
      <ion-icon class="like" name="heart"></ion-icon>
      </div>
      </div>
      </div>

      <div class="like_priceTotal">
      <div class="like_total">
        <p>12555485</p>
        <ion-icon class="like" name="heart"></ion-icon>
      </div>
      <div class="prise_jour">
        <div class="prise">300£/jour</div>
      </div>
    </div>
      `;
    }
  });
}
getPhotographers();
