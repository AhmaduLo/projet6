//  //-------------tableau des element a trier-----
//  let ArrayTries = [];
//  ArrayTries = [{ name: "Populaire" }, { name: "Date" }, { name: "Titre" }];
//  ArrayTries.forEach((item) => {
//    containtTrie.innerHTML += `
//    <div class="elementTexteClique">${item.name} </div>
//    <span></span>
//    `;
//  });
//  //---------- Add click event listener to each element---populaire-----

//  function filter() {
//    ArrayTries.forEach((itemArray, index) => {
//      for (let i = 0; i < elementTexteClique.length; i++) {
//        elementTexteClique[index].addEventListener("click", (e) => {
//          // Échangez l'élément cliqué avec celui à l'index 0 dans le tableau ArrayTries
//          const clickedItem = ArrayTries[index];
//          ArrayTries[index] = ArrayTries[0];
//          ArrayTries[0] = clickedItem;
//          //-----------------------------------
//          containtTrie.innerHTML = "";
//          ArrayTries = ArrayTries.map((item) => ({ name: item.name }));
//          console.log(ArrayTries);
//          ArrayTries.forEach((item) => {
//            containtTrie.innerHTML += `
//             <ion-icon class="chevron_ouvert" name="chevron-down-outline"></ion-icon>
//           <div class="elementTexteClique">${item.name} </div>
//           <span></span>
//           `;
//          });
//          //------------------------
//          const photos = Array.from(
//            section.getElementsByClassName("container")
//          );
//          if (e.target.textContent == "Populaire") {
//            // Triez les photos en fonction du nombre de likes
//            photos.sort(function (a, b) {
//              const likesA = parseInt(a.getAttribute("data-likes"));
//              const likesB = parseInt(b.getAttribute("data-likes"));
//              return likesB - likesA; // Triez de manière décroissante
//            });
//          } else if (e.target.textContent == "Date") {
//            photos.sort(function (a, b) {
//              const dateA = parseInt(a.getAttribute("data-date"));
//              const dateB = parseInt(b.getAttribute("data-date"));
//              return dateB - dateA; // Triez de manière décroissante
//            });
//          } else {
//            photos.sort(function (a, b) {
//              const titleA = a.querySelector(".title").textContent;
//              const titleB = b.querySelector(".title").textContent;
//              return titleA.localeCompare(titleB); // Triez de manière alphabétique
//            });
//          }

//          // Supprimez toutes les photos du conteneur
//          section.innerHTML = "";
//          // Ajoutez les photos triées au conteneur
//          photos.forEach(function (photo) {
//            section.appendChild(photo);
//          });
//        });
//      }
//    });
//  }
//  filter();

//  for (let i = 0; i < likeIcons.length; i++) {
//   likeIcons[i].addEventListener("click", (e) => {
//     if (likeIcons[i].classList.contains("liked")) {
//       e.target.parentElement.children[0].textContent--;
//       somme--;
//       likeIcons[i].classList.remove("liked");
//       likeIcons[i].classList.remove("color");
//     } else {
//       e.target.parentElement.children[0].textContent++;
//       somme++;
//       likeIcons[i].classList.add("liked");
//       likeIcons[i].classList.add("color");
//     }
//     // Mettez à jour le texte affiché avec la nouvelle valeur de somme
//     like_priceTotal.children[0].children[0].textContent = somme;
//     element.likes = e.target.parentElement.children[0].textContent;
//   });
// }

// useEffect(() => {
//   if(api){
//     refetch()
//   }

// }, [input])

// const DocumentList = ({
//   documents,
//   isAdmin,
//   }: {
//   documents: IDocument[]
//    isAdmin: boolean 
//    nbrOfColumn: number
//   }) => {}