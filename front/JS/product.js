// Parametrer l'URL avec l'id pour récuperer les informations qui correspondent au bon canapé

const url = new URL(window.location.href);
const urlParams = new URLSearchParams(url.search);
let id = urlParams.get("id");

//Afficher les données du produit
// Je fais appel à l'url du produit qui contient l'id qui correspond

fetch(`http://localhost:3000/api/products/${id}`)
  .then((response) => response.json())
  //Je nomme ma fonction products pour dispatcher les données sur les bons éléments
  .then((products) => {
    //création de l'élement <img> + création des variables Parents
    let image = document.createElement("img");
    image.src = products.imageUrl;
    image.alt = products.altTxt;
    const imgParent = document.querySelector(".item__img");
    imgParent.appendChild(image);

    document.querySelector("#title").innerHTML = products.name;
    document.querySelector("#price").innerHTML = products.price;
    document.querySelector("#description").innerHTML = products.description;

    const clrParent = document.querySelector("#colors");
    //boucle pour récupérer les données du tableau colors
    for (let color of products.colors) {
      let optionValue = document.createElement("option");

      optionValue.setAttribute("value", color);
      optionValue.textContent = color;

      clrParent.appendChild(optionValue);
    }
  });

//********************************************************************** */

//Ajout des produits au panier

//déclaration des variables
const btn = document.querySelector("#addToCart");
let canapeLocal = [];
let changeCanap = true;

//on écoute l'évènement au click sur le bouton et je crée les éléments nécessaires
btn.addEventListener("click", (e) => {
  let colors = document.querySelector("#colors").value;
  let quantity = document.querySelector("#quantity").value;
  //objet qui sera enregistré dans localStorage
  let dataCanap = {
    id,
    colors,
    quantity,
  };

  //initialise la lecture de locastorage et convertit les données en format JS avec .parse
  let canapeLocal = JSON.parse(localStorage.getItem("arrayCanapLocal"));

  //Si aucune données n'est rentrées return[] + alert
  if (colors == null || colors === "" || quantity == null || quantity == 0) {
    alert("Veuillez choisir une couleur et une quantité");
    return [];
  }

  // Si le tableau est vide alors on ajoute le produit et on convertit les données au format JSON avec .stringify
  if (canapeLocal == null) {
    canapeLocal = [];
    canapeLocal.push(dataCanap);
    localStorage.setItem("arrayCanapLocal", JSON.stringify(canapeLocal));
  } //S'il y a un produit dont l'ID et la couleurs sont les mêmes on change la qt sans changer de produit
  else if (canapeLocal != null) {
    canapeLocal.forEach((canap, ind) => {
      if (canap.id === id && canap.colors === colors) {
        canapeLocal[ind].quantity = quantity;
        localStorage.setItem("arrayCanapLocal", JSON.stringify(canapeLocal));
        changeCanap = false;
      }
    }); //sinon on ajoute un produit
    if (changeCanap) {
      canapeLocal.push(dataCanap);
      localStorage.setItem("arrayCanapLocal", JSON.stringify(canapeLocal));
      changeCanap = true;
    }
  }
  //on propose au client de se rendre sur la page panier
  if (confirm("Voulez vous aller à la page panier?")) {
    window.location.href = "../html/cart.html";
  } //on traduit le tableau en JS avec .parse
  return (canapeLocal = JSON.parse(localStorage.getItem("arrayCanapLocal")));
});
