document.addEventListener("keydown", function (event) {
    // Récupérer le code de la touche
    var keyCode = event.keyCode;
    // Gérer la navigation en fonction de la touche pressée
    switch (event.key) {
      case "ArrowUp":
        moveFocus(-1);
        break;
      case "ArrowDown":
        moveFocus(1);
        break;
      case "ArrowLeft":
        moveFocus(-1);
        break;
      case "ArrowRight":
        moveFocus(1);
        break;
      case "Enter":
        //clickActiveArticle();
        //console.log(event);
        break;
    }
  });
  function moveFocus(direction) {
    // Récupérer tous les éléments interactifs
    var interactiveElements = document.querySelectorAll("article");
  
    // Trouver l'élément actuellement focalisé
    var currentElement = document.activeElement;
    var currentIndex = Array.from(interactiveElements).indexOf(
      currentElement
    );
  
    // Déplacer le focus vers l'élément précédent ou suivant
    var newIndex = currentIndex + direction;
    if (newIndex < 0) {
      newIndex = interactiveElements.length - 1;
    } else if (newIndex >= interactiveElements.length) {
      newIndex = 0;
    }
  
    // Retirer la classe "active" de tous les éléments interactifs
    interactiveElements.forEach(function (element) {
      element.classList.remove("active");
    });
    // Appliquer la classe "active" à l'élément en cours de mise au point
    interactiveElements[newIndex].classList.add("active");
  
    // Déplacer le focus
    interactiveElements[newIndex].focus();
    console.log(interactiveElements);
  }
  // function clickElement() {
  //   // Simuler un clic sur l'élément actuellement focalisé
  //   var currentElement = document.activeElement;
  //   if (currentElement) {
  //     currentElement.click();
  //   }
  // }

   // function navigeWithKeyBoard() {
  //   let currentIndex = 0;
  //   document.addEventListener("keydown", (event) => {
  //     const boxes = section.children;
  //     const containers = document.querySelectorAll(".container");
  //     switch (event.key) {
  //       case "ArrowUp":
  //         navigate(-2);
  //         break;
  //       case "ArrowDown":
  //         navigate(2);
  //         break;
  //       case "ArrowLeft":
  //         navigate(-1);
  //         break;
  //       case "ArrowRight":
  //         navigate(1);
  //         break;
  //       case "Enter":
  //         clickAtiveContainer();
  //         break;
  //     }
  //     function navigate(direction) {
  //       currentIndex += direction;
  //       // Assurez-vous que l'index reste dans les limites des articles
  //       currentIndex = Math.max(
  //         0,
  //         Math.min(currentIndex, containers.length - 1)
  //       );
  //       //Supprimer toute classe « active » existante
  //       containers.forEach((container, index) => {
  //         container.classList.remove("active");
  //         if (index === currentIndex) {
  //           // Ajouter une classe 'active' à l'article actuel
  //           container.classList.add("active");
  //           // Faire défiler la page pour rendre le conteneur actif visible
  //           container.scrollIntoView({ behavior: "smooth", block: "center" });
  //         }
  //       });
  //     }
  //     function clickAtiveContainer() {
  //       // Simuler un clic sur l'article actif
  //       const activeContainer = containers[currentIndex];
  //       if (activeContainer) {
  //         const clickimg = activeContainer.children[0].children[0].children[0];
  //         clickimg.click();
  //       }
  //     }
  //   });
  // }
  // navigeWithKeyBoard();