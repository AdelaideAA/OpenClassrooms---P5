let dataItems = document.getElementById("cart__items");

function displayData (){
  let itemsLocal = JSON.parse(localStorage.getItem("arrayCanapLocal"));
  if (itemsLocal != null){
    for (let i = 0; i < items.length; i++) {
      let id = itemsLocal[i][0];
      let colors = itemsLocal[i][1];
      let quantity = itemsLocal[i][2];
      fetch(`http://localhost:3000/api/products/`)//il faut que je précise l'id
      .then(response => response.json())
      .then (itemsFetch => {
        if (itemsFetch.id === itemsLocal.id){
          let dataItems="";
      
          dataItems.innerHTML += 
          `<article class="cart__item" data-id="${id}" data-color="${colors}">
             <div class="cart__item__img">
                <img src=${itemsFetch.imageUrl} alt=${itemsFetch.altTxt}>
              </div>
              <div class="cart__item__content">
                <div class="cart__item__content__description">
                  <h2>${itemsFetch.name}</h2>
                  <p>${colors}</p>
                  <p>${itemsFetch.price}</p>
                </div>
                <div class="cart__item__content__settings">
                  <div class="cart__item__content__settings__quantity">
                    <p>Qté :</p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${quantity} >
                  </div>
                  <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                  </div>
                </div>
              </div>
            </article>`
        }

      })
  
  
  
    }

  }
}


//******************************************************************************************* */
//initialise la lecture du localstorage et récupère les données en format JS

// function productsLocal(itemLocal){
//   let itemsLocal = JSON.parse(localStorage.getItem("arrayCanapLocal"));
//   if (itemsLocal != null){
//     console.log("Il y a des canapés");
//     //return JSON.parse(itemsLocal); Le return ne fonctionne pas 
//   }else{
//     console.log("Le panier est vide !");//J'aimerai afficher ce texte sur la page
//   } 

//   //ajouter une boucle pour récuperer les données?? 
//   //for (let i = 0; i < itemsLocal.length; i++);
      
// };



// // // //récuperer les données de fetch
// function productsFetch(itemsFetch){
//   fetch(`http://localhost:3000/api/products/`)
//   .then(response => response.json())
//   .then (itemsFetch => console.log(itemsFetch));
//   //Il faudrait que j'ajoute un catch(err)
// }
    


// function displayData (itemsFetch, itemLocal){
//   productsFetch(); 
//   productsLocal();
  
//   if (itemsFetch.id === itemLocal.id){
//     let dataItems="";
    
//     dataItems.innerHTML = `<article class="cart__item" data-id="${itemLocal.id}" data-color="${itemLocal.colors}">
//     <div class="cart__item__img">
//       <img src=${itemsFetch.imageUrl} alt=${itemsFetch.altTxt}>
//     </div>
//     <div class="cart__item__content">
//       <div class="cart__item__content__description">
//         <h2>${itemsFetch.name}</h2>
//         <p>${itemLocal.colors}</p>
//         <p>${itemsFetch.price}</p>
//       </div>
//       <div class="cart__item__content__settings">
//         <div class="cart__item__content__settings__quantity">
//           <p>Qté :</p>
//           <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${itemLocal.quantity} >
//         </div>
//         <div class="cart__item__content__settings__delete">
//           <p class="deleteItem">Supprimer</p>
//         </div>
//       </div>
//     </div>
//   </article>`
//   document.getElementById("cart__items").innerHTML = dataItems;
//   }

// }


//********************************************************************************************** */

// let itemsLocal = JSON.parse(localStorage.getItem("arrayCanapLocal"));
//   if (itemsLocal != null){
//     console.log("Il y a des canapés");
//     //return JSON.parse(itemsLocal); Le return ne fonctionne pas 
//   }else{
//     console.log("Le panier est vide !");//J'aimerai afficher ce texte sur la page
//   } 


// let dataItemsLocal = "";
// itemsLocal.map((values) =>{
//     dataItemsLocal+=  
//         `<article class="cart__item" data-id="${values.id}" data-color="${values.colors}">
//              <div class="cart__item__img">
//                <img src=${values.imageUrl} alt=${values.altTxt}>
//              </div>
//              <div class="cart__item__content">
//                <div class="cart__item__content__description">
//                  <h2>${values.name}</h2>
//                  <p>${values.colors}</p>
//                  <p>${values.price}</p>
//               </div>
//                <div class="cart__item__content__settings">
//                  <div class="cart__item__content__settings__quantity">
//                    <p>Qté :</p>
//                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${values.quantity} >
//                  </div>
//                  <div class="cart__item__content__settings__delete">
//                    <p class="deleteItem">Supprimer</p>
//                  </div>
//                </div>
//              </div>
//            </article>`
           
//           document.getElementById("cart__items").innerHTML = dataItemsLocal; 
    
// })




//faire une fonction pour récuperer localstorage
//faire une fonction pour récuperer fetch
//faire une boucle pour vérifier si l'id est le même sur fetch et localstorage
//assembler le html avec les bonnes valeurs
//il faut a nouveau pouvoir changer la qt
//faire une fonction pour faire fonctionner le bouton supprimer
//faire une fonction pour additionner les prix
// //documentation
// //const text = "apparait"
// //div1.textContent = `c'est moi qui ${text}!`