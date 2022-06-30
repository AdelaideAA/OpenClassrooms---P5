//**********Afficher les produits sur la page panier*********/

//déclaration des variables globales
let canapArray = [];
let itemsLocal = [];
let dataItems = document.getElementById("cart__items");
let total = 0;
let numberProduct = 0;

//Si le panier est vide -> afficher un message sinon appel des fonctions pour afficher les produits
if (
  localStorage.getItem("arrayCanapLocal") === null ||
  JSON.parse(localStorage.getItem("arrayCanapLocal")).length < 1
) {
  document.querySelector("#cart__items").innerHTML = `
  <div class = 'cart__none'>
      <p id ='panierVide' style='text-align: center; font-weight: bold; font-size:25px; color: #FFFFF'>
      Votre panier est vide !</p>
  </div>`;
} else {
  findCanap();
  findFetch();
  getNumberProduct();
}

//récupère les produits stockés dans le localstorage
function findCanap() {
  itemsLocal = JSON.parse(localStorage.getItem("arrayCanapLocal"));
}

//Récupère les données de l'api pour completer celle du localstorage
function findFetch() {
  fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((jsonListSofa) => {
      canapArray = jsonListSofa;
      //boucle + méthode .find pour faire correspondre les produits grâce aux id
      itemsLocal.forEach((itemInLocalStorage) => {
        const allItems = canapArray.find(
          (data) => data._id == itemInLocalStorage.id
        );
        //Créer le contenu html en affichant les éléments de l'api et du localStorage
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

        changeQuantity();
        deleteArticle();
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

//Ecoute et conserve les nouvelles quantités
let listDeBtn = document.getElementsByClassName("itemQuantity");
function changeQuantity() {
  for (let index = 0; index < listDeBtn.length; index++) {
    let element = listDeBtn[index];
    element.addEventListener("change", (e) => {
      id = element.closest("[data-id]").dataset.id;
      color = element.closest("[data-color]").dataset.color;
      if(e.target.value>100){
        alert("La quantité est supérieure à 100, veuillez choisir une autre quantité.")
      }
      for (let i = 0; i < itemsLocal.length; i++) {
        if (id === itemsLocal[i].id && color === itemsLocal[i].colors && e.target.value<100) {
          itemsLocal[i].quantity = e.target.value;
          localStorage.setItem("arrayCanapLocal", JSON.stringify(itemsLocal));
          document.location.reload();
          
        }    
      }
    });
  }
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

//calcul le nombre d'articles
function getNumberProduct() {
  findCanap();
  for (let product of itemsLocal) {
    numberProduct += Number(product.quantity);
  }
  document.getElementById("totalQuantity").textContent = numberProduct;
}

//********************FORMULAIRE ***********************/
//Variables globales
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let address = document.getElementById("address");
let city = document.getElementById("city");
let email = document.getElementById("email");

//Variables de regexp
let regExpName = new RegExp(/^[A-Za-zàáâãäåçèéêëìíîïðòóôõöùúûüýÿ\s'-]+$/);
let regExpEmail = new RegExp(
  /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/
);
let regExpAddress = new RegExp(/^[a-zA-Z0-9\s-',]+$/);

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

// Ecoute le click sur le bouton "Commander" et crée un objet contact

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
  // Si le panier est vide ou si l'un des champs du formulaire est mal renseigné ou vide -> affiche une alerte
  if (
    firstName.value == "" ||
    lastName.value == "" ||
    address.value == "" ||
    city.value == "" ||
    email.value == ""
  ) {
    alert("Un des champs du formulaire n'est pas completé");
  } else if (
    localStorage.getItem("arrayCanapLocal") === null ||
    JSON.parse(localStorage.getItem("arrayCanapLocal")).length < 1
  ) {
    alert(
      "Votre panier est vide! Veuillez choisir des produits pour passer commande."
    );
  } else if (
    regExpName.test(firstName.value) == false ||
    regExpName.test(lastName.value) == false ||
    regExpAddress.test(address.value) == false ||
    regExpName.test(city.value) == false ||
    regExpEmail.test(email.value) == false
  ) {
    alert("Un des champs du formulaire n'est pas valide !");
  } //Sinon je crée un tableau qui va contenir les données du storage(vérification grâce à l'id)
  else {
    let products = [];

    itemsLocal.forEach((order) => {
      products.push(order.id);
    });
    //Je crée un objet où il y a les données du formulaire et les données du storage
    let confirmOrder = { contact, products };

    // et je renvoie cet objet en JSON vers le serveur avec fetch
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
        //j'ajoute l'id de commande dans l'url de la page de confirmation
        window.location.href = "./confirmation.html?orderId=" + data.orderId;
        // et j'efface le localstorage
        window.localStorage.clear();
      })
      .catch((error) => {
        console.log(error);
        alert(
          "Nous ne pouvons pas valider la commande, merci de réessayer plus tard"
        );
      });
  }
});
