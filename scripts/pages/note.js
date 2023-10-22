media.forEach((element) => {
    const picture = `assets/albumPhoto/mimi/${element.image}`;
    const video = `assets/albumPhoto/${name}/${element.video}`;

    console.log(picture);

    // const photographerId = element.photographerId;
    // let thisId = element.id;
    // if (userID == photographerId) {
    //   displayId.push(thisId);
    // }

    // if (displayId.includes(element.id)) {
    //   section.innerHTML += `
    // <div class="container">
    // <div class="img_block">
    // <img src="${picture}" alt="${element.image}" />
    // </div>
    // <div class="name_like">
    // <div class="h3">
    // <h3>${element.title}</h3>
    // </div>
    // <div class="nmberIcon">
    // <p>${element.likes}</p>
    // <ion-icon class="like" name="heart-outline"></ion-icon>
    // </div>
    // </div>
    // </div>
    // `;
    // }
  });