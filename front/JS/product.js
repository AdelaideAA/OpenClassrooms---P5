// Parametrer l'URL avec l'id pour récuperer les informations qui correspondent au bon canapé

const url = new URL(window.location.href);
const urlParams = new URLSearchParams(url.search);
let id = urlParams.get("id");

//Afficher les données du produit
// Je fais appel à l'url du produit qui contient l'id qui correspond

fetch(`http://localhost:3000/api/products/${id}`)
  .then((response) => response.json())
  //Je nomme ma fonction products
  .then((products) => {
    //création de l'élement <img> + correspondance entre les données de products et les éléments + création des variables Parents
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

//Ajout d'un produit au panier
const btn = document.querySelector("#addToCart");
let canapeLocal = [];
let product = '';
let changeQuantity = false;

btn.addEventListener("click", (e) => {
  let colors = document.querySelector("#colors").value;
  let quantity = document.querySelector("#quantity").value;
  let dataCanap = {
    id,
    colors,
    quantity,
  };

  //initialise la lecture de locastorage et converti les données en format JS avec .parse
  let canapeLocal = JSON.parse(localStorage.getItem("arrayCanapLocal"));
  
  //Si aucune données n'est rentrées return[] + alert
  if (colors == null || colors === "" || quantity == null || quantity == 0) {
    alert("Veuillez choisir une couleur et une quantité");
    return [];
  }

  //Avec la fonction à l'interieur
  if (canapeLocal == null){
    canapeLocal = [];
    canapeLocal.push(dataCanap);
    localStorage.setItem("arrayCanapLocal", JSON.stringify(canapeLocal));
    console.log(canapeLocal);
  } else if (canapeLocal != null){
      if(product.id === id && product.colors === colors){
        for (let product of dataCanap){ 
          product.newQuantity += quantity;
          changeQuantity = true; 
          console.log("quantité changée");
          localStorage.setItem("arrayCanapLocal", JSON.stringify(canapeLocal));     
        }

      }else if (changeQuantity == false){
        canapeLocal.push(dataCanap);
        localStorage.setItem("arrayCanapLocal", JSON.stringify(canapeLocal));
        (canapeLocal = JSON.parse(localStorage.getItem("arrayCanapLocal")));
      }
    }

//Avec la fonction à l'exterieur
  // if(product.id === id && product.colors === colors){
  //   for (let product of dataCanap){
  //     product.quantity += quantity;
  //     changeQuantity = true;
  //     console.log("la boucle marche");
  //     return product.quantity;
    
  //   }
  //   localStorage.setItem("arrayCanapLocal", JSON.stringify(canapeLocal));
    
  // }  


  

  //création d'une condition pour changer la qt sans ajouter un nouvel objet
  //let changeQuantity = false;
  //let product = '';
   
// avec cette fonction dataCanap n'est pas itérable
  // if(product.id === id && product.colors === colors){
  //   for (let product of dataCanap){
  //     product.quantity += quantity;
  //     changeQuantity = true;
  //     console.log("la boucle marche");
  //     return product.quantity;
    
  //   }
  //   localStorage.setItem("arrayCanapLocal", JSON.stringify(canapeLocal));
    
  // }

  //test avec object.keys
  // for (let product of Object.keys (dataCanap)){
  //   let changeQuantity = dataCanap[product]
  //   if(product.id == id && product.colors == colors){
  //     product.changeQuantity += quantity;
  //     //changeQuantity = true;
  //     localStorage.setItem("arrayCanapLocal", JSON.stringify(canapeLocal));
  //     console.log ("la boucle marche")
  //   }
  // }

  //test avec object.entries

  //for (const[ product, quantity] of Object.entries(dataCanap)){
  //     if(product.id === id && product.colors === colors){
  //       product.changeQuantity += quantity;
  //       changeQuantity = true;
  //       localStorage.setItem("arrayCanapLocal", JSON.stringify(canapeLocal));
  //       console.log ("la boucle marche")
  //     }
  //   }

 

  // if (canapeLocal = [] || changeQuantity == false){
  //   canapeLocal = [];
  //   canapeLocal.push(dataCanap);
  //   localStorage.setItem("arrayCanapLocal", JSON.stringify(canapeLocal));
  
  
  // else if(canapeLocal != null){
  //   for (i=0; i<canapeLocal.length; i++){
  //     let foundProduct = canapeLocal.find(p => p.id == canapeLocal.id && p.colors == canapeLocal.colors)
  //   if (foundProduct!= undefined){
  //     foundProduct.quantity += quantity;
  //     localStorage.setItem("arrayCanapLocal", JSON.stringify(canapeLocal)),
  //     (canapeLocal = JSON.parse(localStorage.getItem("arrayCanapLocal")))
  //   }
    
  //   }
  // }

  // else if( canapeLocal != null){
  //   for (i=0; i<canapeLocal.length; i++){
  //     if(canapeLocal[i].id == id && canapeLocal[i].colors == colors){
  //       return(
  //         canapeLocal[i].quantity += quantity,
  //         localStorage.setItem("arrayCanapLocal", JSON.stringify(canapeLocal)),
  //         (canapeLocal = JSON.parse(localStorage.getItem("arrayCanapLocal")))
  //       );       
  //     }else {
  //       canapeLocal.push(dataCanap);
  //       localStorage.setItem("arrayCanapLocal", JSON.stringify(canapeLocal))
  //     }
  //   }
  // } 
 
  
  //s'il y a des données on ajoute celles ci au localstorage en format JSON (.stringify)

  // if(canapeLocal && changeQuantity == false){
  //   canapeLocal.push(dataCanap);
  //   localStorage.setItem("arrayCanapLocal", JSON.stringify(canapeLocal));
         
  // }
  
  // //si le panier et vide on ajoute les données au localstorage en format JSON (.stringify)
  // else {
  //   canapeLocal = [];
  //   // changeQuantity==false;
  //   canapeLocal.push(dataCanap);
  //   localStorage.setItem("arrayCanapLocal", JSON.stringify(canapeLocal));
  // }

  // if (confirm("Voulez vous aller à la page panier?")){
  //   window.location.href = "../cart.html";
  // }
  return (canapeLocal = JSON.parse(localStorage.getItem("arrayCanapLocal")));
  
  
});

  //********************************************************************************** */

  //Ajout d'une condition pour changer la qt sans ajouter un nouvel objet
//   let changeQuantity = false;
//   let product = '';
//   if(product.id === id && product.colors === colors){
//     for (let product of dataCanap){
//       changeQuantity = true;
//       product.quantity += quantity;
//     }
//   }

//   //s'il y a des données on ajoute celles ci au localstorage en format JSON (.stringify)
  
//   if(changeQuantity == false){
//     canapeLocal = [];
//     canapeLocal.push(dataCanap);
//     localStorage.setItem("arrayCanapLocal", JSON.stringify(canapeLocal));
//       //console.log(canapeLocal);
//   }
  
 



//DOCUMENTATION*******************************************
//monPanier = localStorage

//acceder à une donnée
// localStorage.setItem('myCat', 'cookie');
// localStorage.setItem('myDog', 'Pepette');
// localStorage.setItem('myFish', 'Albert');
// //récuperer une donnée
// let cat = localStorage.getItem('myCat');
// console.log(cat)
// //supprimer une donnée
// localStorage.removeItem('myDog');

//pour obtenir le nbr de clé
//localStorage.length;

//pour obtenir les clés
// for( let i = 0; i < localStorage.length; i++){
//     localStorage.key(i);
// }

//stockage des données
//let objJson = {
//     prenom : "dany",
//     age : 30,
//     taille : 170
// }
// let objLinea = JSON.stringify(objJson); la fonction JSON.stringify permet de transformer l'objet js en format Json
// localStorage.setItem("obj",objLinea); La méthode setItem() de l'interface Storage, lorsque lui sont passées le duo clé-valeur, les ajoute à l'emplacement de stockage, sinon elle met à jour la valeur si la clé existe déjà.

//faire un [array] du panier qui contiendra : l'id + la qt + la couleur
//localStorage (est une api) pour pouvoir acceder au tableau depuis la page panier
//si on ajoute(.push) un produit dans le panier on l'ajoute au [tableau]
//si on ajoute un produit existant on incrémente la qt du produit qui est dans l'array

// documentation Martin
// dataCanape: [
//     {colors: "Black/Yellow"
//     id: "415b7cacb65d43b2b5c1ff70f3393ad1"
//     quantity: "1"},
//     {colors: "Green"
//     id: "4gdfhdfghdfgh54545d43b2b5c1ff70f3393ad1"
//     quantity: "2"},
// ]

// dataCanape.length === 0 || null

// let canapeLocal = []
// variable global
