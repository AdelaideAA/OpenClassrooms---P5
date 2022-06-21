let canapArray = [];
let itemsLocal = [];
let dataItems = document.getElementById("cart__items");
let total = 0;
let numberProduct = 0;

if (
  localStorage.getItem("arrayCanapLocal") === null ||
  localStorage.getItem("arrayCanapLocal") < 1
) {
  console.log("votre panier est vide"); //à afficher sur la page et a styliser
} else {
  console.log("il y a des produits dans le panier");

  findFetch();
  getNumberProduct();
  
}

function findCanap() {
  itemsLocal = JSON.parse(localStorage.getItem("arrayCanapLocal"));
}

function findFetch() {
  fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((jsonListSofa) => {
      canapArray = jsonListSofa;

      findCanap();
      itemsLocal.forEach((itemInLocalStorage) => {
        const allItems = canapArray.find(
          (data) => data._id == itemInLocalStorage.id
        );

        dataItems.innerHTML += `<article class="cart__item" data-id="${itemInLocalStorage.id}" data-color="${itemInLocalStorage.colors}">
            <div class="cart__item__img">
              <img src=${allItems.imageUrl} alt=${allItems.altTxt}>
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>${allItems.name}</h2>
                <p>${itemInLocalStorage.colors}</p>
                <p>${allItems.price}</p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>Qté :</p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${itemInLocalStorage.quantity}>
                </div>
                <div class="cart__item__content__settings__delete">
                  <p class="deleteItem">Supprimer</p>
                </div>
              </div>
            </div>
          </article>`;

        //Calcul du prix
        total += itemInLocalStorage.quantity * allItems.price;
        document.getElementById("totalPrice").textContent = total;
        
          //Ecoute et conserve les nouvelles quantité
        let listDbtn = document.getElementsByClassName("itemQuantity");

        for (let index = 0; index < listDbtn.length; index++) {
          let element = listDbtn[index];
          element.addEventListener("change", (e) => {
            id = element.closest("[data-id]").dataset.id;
            color = element.closest("[data-color]").dataset.color;
            console.log(id);
            console.log(color);
            for (let i = 0; i < listDbtn.length; i++) {
              if (
                id == itemInLocalStorage.id &&
                color == itemInLocalStorage.colors
              ) {
                itemInLocalStorage.quantity = e.target.value;
                //document.location.reload(true);
                localStorage.setItem(
                  "arrayCanapLocal",
                  JSON.stringify(itemsLocal)
                );
              }
            }
          });
        }
        
        //Supprime le produit
        deleteArticle();
        
      });
      // .catch(function(err) {//il y a un message d'erreur sur la consonsole il faut changer ce catch
      //   console.log(err);
      // });
    });
}






//Supprime un article
function deleteArticle(){
  let deleteItem = document.querySelectorAll(".deleteItem");
  for (let i = 0; i < deleteItem.length; i++) {
    deleteItem[i].addEventListener("click", (event) => {
      event.preventDefault();
      itemsLocal.splice([i],1);
      document.location.reload();
      localStorage.setItem("arrayCanapLocal", JSON.stringify(itemsLocal));
    });
  }
}

//calcul le nombre d'article
function getNumberProduct() {
  findCanap();
  for (let product of itemsLocal) {
    numberProduct += Number(product.quantity);
  }
  document.getElementById("totalQuantity").textContent = numberProduct;
}

//*********************************             V2             ********************************************************** */
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
