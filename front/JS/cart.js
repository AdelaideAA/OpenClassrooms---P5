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
  //console.log("il y a des produits dans le panier");

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
              console.log(listDbtn);
              if (
                id === itemInLocalStorage.id &&
                color === itemInLocalStorage.colors
              ) {
                itemInLocalStorage.quantity = e.target.value;
                document.location.reload(true);
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
function deleteArticle() {
  let deleteItem = document.querySelectorAll(".deleteItem");
  for (let i = 0; i < deleteItem.length; i++) {
    deleteItem[i].addEventListener("click", (event) => {
      event.preventDefault();
      itemsLocal.splice([i], 1);
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

//FORMULAIRE *************/regex addres à modifier

let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let address = document.getElementById("address");
let city = document.getElementById("city");
let email = document.getElementById("email");

//regex
let regExpName = new RegExp("^[A-Za-z'-àáâãäåçèéêëìíîïðòóôõöùúûüýÿ]{2,25}$");
let regExpEmail = new RegExp(
  "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"
);
let regExpAddress = new RegExp("^[a-zA-Z0-9,.'-/s*]+$"); //regex a corriger l'espace ne fonctionne pas

//Ecoute le changement et valide les champs du formulaire
firstName.addEventListener("change", () => {
  let p = document.getElementById("firstNameErrorMsg");

  if (regExpName.test(firstName.value)) {
    p.innerHTML = "Prénom valide";
  } else {
    p.innerHTML = "Prénom non valide";
  }
});

lastName.addEventListener("change", () => {
  let p = document.getElementById("lastNameErrorMsg");
  if (regExpName.test(lastName.value)) {
    p.innerHTML = "Nom valide";
  } else {
    p.innerHTML = "Nom non valide";
  }
});

address.addEventListener("change", () => {
  let p = document.getElementById("addressErrorMsg");

  if (regExpAddress.test(address.value)) {
    p.innerHTML = "Adresse valide";
  } else {
    p.innerHTML = "Adresse non valide";
  }
});

city.addEventListener("change", () => {
  let p = document.getElementById("cityErrorMsg");

  if (regExpName.test(city.value)) {
    p.innerHTML = "Ville valide";
  } else {
    p.innerHTML = "Ville non valide";
  }
});

email.addEventListener("change", () => {
  let p = document.getElementById("emailErrorMsg");

  if (regExpEmail.test(email.value)) {
    p.innerHTML = "Adresse Valide";
  } else {
    p.innerHTML = "Adresse non valide";
  }
});

// création de l'objet contact au click sur le bouton Commander

let order = document.getElementById("order");

order.addEventListener("click", (e) => {
  e.preventDefault();
  let contact = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    city: city.value,
    email: email.value,
  };
  //console.log(contact);
  if (
    firstName.value == "" ||
    lastName.value == "" ||
    address.value == "" ||
    city.value == "" ||
    email.value == ""
  ) {
    alert("Un des champs du formulaire n'est pas completé");
  } else if (
    regExpName.test(firstName.value) == false ||
    regExpName.test(lastName.value) == false ||
    regExpAddress.test(address.value) == false ||
    regExpName.test(city.value) == false ||
    regExpEmail.test(email.value) == false
  ) {
    alert("Un des champs du formulaire n'est pas valide !");
  } else {
    let products = [];

    itemsLocal.forEach((order) => {
      //console.log("log de items local", itemsLocal);
      products.push(order.id);
      //console.log("log de products", products);
      //console.log("log de order.id", order.id);
    });
    let confirmOrder = { contact, products };

    // je renvoi les données vers le serveur avec fetch et j'ajoute l'id de commande dans l'url
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(confirmOrder),
    })
      .then((response) => response.json())
      .then((data) => {
        window.location.href = "./confirmation.html?orderId=" + data.orderId;
        //console.log(data.orderId)
        window.localStorage.clear();
      })
      .catch((error) => {
        alert(
          "Le serveur ne répond pas, si ce problème persiste, contacter: support@name.com"
        );
      });
  }
});

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
