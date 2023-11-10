// for (let i = 0; i < imageDisplayClick.length; i++) {
//   let cont = 0;
//   let sourceImg = "";
//   let sourcevideo = "";
//   imageDisplayClick[i].addEventListener("click", (e) => {
//     photoSlide.forEach((iteme) => {
//       if (iteme.image === e.target.alt) {
//         if (iteme.image) {
//           sourceImg = `assets/albumPhoto/${firstName}/${iteme.image}`;
//           //console.log(sourceImg.length++);
//           modalPhoto.innerHTML += `
//       <ion-icon class="closeModule" name="close-outline"></ion-icon>
//       <ion-icon class="chevronmoins" name="chevron-back-outline"></ion-icon>
//       <div class="imgcontainer"><img class="imgToSlide" src="${sourceImg}" alt="${e.target.alt}"></div>   
//       <ion-icon class="chevronplus" name="chevron-forward-outline"></ion-icon>
//       <h3>${iteme.title}</h3>
//     `;
//         }
//         if (iteme.video) {
//           sourcevideo = `assets/albumPhoto/${firstName}/${iteme.video}`;
//           modalPhoto.innerHTML += `
//           <ion-icon class="closeModule" name="close-outline"></ion-icon>
//           <ion-icon class="chevronmoins" name="chevron-back-outline"></ion-icon>
//           <div class="blockVideo"> <video class="imageDisplay" controls width="100%" height="100% id="videoPlayer">
//           <source src="${sourcevideo}"type="video/mp4" /></video></div>   
//           <ion-icon class="chevronplus" name="chevron-forward-outline"></ion-icon>
//           <h3>${iteme.title}</h3>
//         `;
//         }
//         noneAll.classList.add("none");
//         modalPhoto.classList.add("afficheModalPhoto");
//       }
//     });
//     chevronplus[0].addEventListener("click", () => {
//       const imgcontainer = document.querySelector(".imgcontainer");
//       //console.log(imgcontainer);
//       imgcontainer[cont].classList.add('active')
//       if (cont < photoSlide.length - 1) {
//         cont++;
//       } else {
//         cont = 0;
//       }
//       // imgcontainer[0][cont].classList.add('active')
//       console.log(cont);
//     });

//     // chevronmoins[0].addEventListener("click", () => {
//     //   console.log("moins");
//     // });
//     //--------------close module photo------------------
//      if (iteme.image === e.target.alt) {
//               console.log(iteme.image);

//               if (iteme.image) {
//                 sourceImg = `assets/albumPhoto/${firstName}/${iteme.image}`;
//                 imgcontainer.innerHTML += ` 
//               <div class="containt_all">          
//               <img class="imgToSlide" src="${sourceImg}" alt="${e.target.alt}">            
//               <h3 class="ItemeTitle">${iteme.title}</h3>  
//               </div> 
//               `;
//               }
//               //    else if (iteme.video) {
//               //     sourcevideo = `assets/albumPhoto/${firstName}/${iteme.video}`;
//               //     imgcontainer.innerHTML += `
//               // <div class="containt_all">
//               // <video class="imageDisplay" controls width="100%" height="100% id="videoPlayer">
//               // <source src="${sourcevideo}"type="video/mp4" /></video>
//               // <h3 class="ItemeTitle">${iteme.title}</h3>
//               // </div>
//               // `;
//               //   }
//             }