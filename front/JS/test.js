//Appeler l'api -> fonctionne
// fetch("http://localhost:3000/api/products")
//     .then(data => data.json())    
//     .then (jsonListSofa => {
//         console.log(jsonListSofa);
//     });

//Appeler l'api -> fonctionne
// fetch("http://localhost:3000/api/products")
//     .then(response => response.json())
//     .then(json => console.log(json));

// Appeler l'api -> fonctionne
//fetch("http://localhost:3000/api/products")
// .then(function(res) {
//     if (res.ok) {
//       return res.json();
//     }
//   })
//   .then(function(value) {
//     console.log(value);
//   })
//   .catch(function(err) {
//     // Une erreur est survenue
//   });

//*******************************************************************************************************************************************
//Récuperer les données -> fonctionne
// fetch("http://localhost:3000/api/products")
//    .then(response => response.json())
//    .then (jsonListSofa => {
//       console.log(jsonListSofa)
//       return addProducts(jsonListSofa)
//    }) 

// function addProducts (listSofa){
//    console.log(listSofa)
//    //soit j'utilise boucle for -> for (let i = 0;i < listSofa.length;i++ ){console.log("canapé numéro", i, listSofa[i])} 
//    //soit boucle foreach
//    listSofa.forEach((sofa) => {
//       console.log("canapé", sofa)
   

//       const { _id, imageUrl, altTxt, name, description } = sofa //destructuring
//       const anchor = makeAnchor(_id)
//       const article = document.createElement("article")
//       const image = makeImage(imageUrl, altTxt)
//       const h3 = makeH3(name)
//       const p = makeParagraph(description)

//       appendElementToArticle(article, image, h3, p)
//       appendArticleToAnchor(anchor, article)
//    })
// }

// function appendElementToArticle(article, image, h3, p ) {
//    // Array.forEach((items) =>{
//    //    article.appendChild(items)
//    // })
//    article.appendChild(image)
//    article.appendChild(h3)
//    article.appendChild(p)
// }

// function makeAnchor(id) {
//    const anchor = document.createElement("a")
//    anchor.href = "./product.html?id=" + id
//    return anchor
// }

// function appendArticleToAnchor(anchor, article){
//    const items = document.getElementById("items")
//    if (items != null) {
//       items.appendChild(anchor)
//       anchor.appendChild(article)
//       console.log("éléments ajoutés à items", items)
//    } 
// }

// function makeImage(imageUrl, altTxt){
//    const image = document.createElement("img")
//    image.src = imageUrl
//    image.alt = altTxt
//    image.removeAttribute("title")
//    image.removeAttribute("style")
//    return image
// }

// function makeH3(name){
//    const h3 =document.createElement("h3")
//    h3.textContent = name
//    h3.classList.add("productName")
//    return h3 
// }
// function makeParagraph(description) {
//    const p =document.createElement("p")
//    p.textContent = description
//    p.classList.add("productDescription")
//    return p 
// }
   
//***************************************************************************************************************************

//paramétrer l'url (faire appel à l'id pour avoir le bon tableau de données dans la page produit)

//Ne fonctionne pas
// const adress = "http://localhost:3000/api/products";
// const url = new URL(adress);
// const searchParams = new URLSearchParams(url.search); 
// if(searchParams.get('id')) {
//   const id = searchParams.get('id');
//   console.log(id)
// }else{
//     console.log("err")
// }

//fonctionne
// const url = new URL(window.location.href);
// const searchParam = new URLSearchParams(url.search);
// let id = "";
// if (searchParam.get("id")) {
//   id = searchParam.get("id");
// } else {
//     if (confirm("pas de produits selectionner un produit")) {
//       window.location.href = "index.html";
//     }
//   }
//   console.log(id);

//   fetch(`http://localhost:3000/api/products/${id}`)
//   .then(response => response.json())
//   .then((res) => console.log(res))

//****************************************************************************************************************************** 
//Récuperer les données sur la page produit avec des fonctions

//fonctionne
// fetch(`http://localhost:3000/api/products/${id}`)
//     .then(response => response.json())
//     .then((products) =>{       
//         return product (products)
//     })
    
// function product(data){
    
//     const { imageUrl, altTxt, name, price, description, colors } = data;
//     const image =  appendImage(imageUrl, altTxt);
//     const title = appendTitle(name);
//     const prices = appendPrice(price);
//     const descriptions = appendContent(description);
//     const color = appendColor(colors);

// };

// function appendImage(imageUrl, altTxt){
//     let image = document.createElement("img")
    
//     image.src = imageUrl
//     image.alt = altTxt
    
//     const eltParent = document.querySelector(".item__img")
//     eltParent.appendChild(image)  
// };


// function appendTitle(name){
//     let title = document.querySelector("#title")
//     title.textContent = name
// }

// function appendPrice(price){
//     let prices = document.getElementById("price")
//     prices.textContent = price
// }

// function appendContent(description){
//     let content = document.querySelector("#description")
//     content.textContent = description
// }

//****************************************************************************** */
// Ajouter au panier

//DOCUMENTATION
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

//sauvegarder le panier
// let canapeLocal = [];
// const btn = document.querySelector("#addToCart");

// function getCart(){
//     let cart = localStorage.getItem("arrayCanapLocal");//lecture de localStorage grace à getItem
//     if(cart == null){//lorsqu'on arrive sur la page le panier est vide donc [] vide
//         return [];
//     }else{
//         return JSON.parse("arrayCanapLocal");//change en string
//     }
// };

// //ajout lors du click
// btn.addEventListener("click",(e) =>{
//     let colors = document.querySelector("#colors").value
//     let quantity = document.querySelector("#quantity").value
//     let data = {
//         id,
//         colors,
//         quantity
//     };
//     if (colors == null || colors === "" || quantity == null || quantity == 0) {
//         alert("Veuillez choisir une couleur et une quantité");
//     }
//     if(localStorage.getItem("arrayCanapLocal")){//lecture de localStorage grace à getItem
//         canapeLocal.push(localStorage.setItem("arrayCanapLocal", JSON.stringify(data)));//setItem ajoute data à localStorage
//         console.log("le canapé est ajouté !")
//     };

//      addToCart(); //Il faut que j'arrive a appeler mes fonctions
// });

// //Ajout au panier
// function addToCart(product){
//     let cart = getCart();
//     let foundProduct = cart.find(p => p.id == product.id)//je cherche si un produit est = à un produit déjà ajouté
//     if(foundProduct != undefined){ //si il trouve un élément
//         foundProduct.quantity++;//il ajoute 1 à la quantité
//     }else{
//         product.quantity = 1; //sinon on le défini à 1
//         cart.push(cart);//ajouter un autre produit au panier
//     }

//     //saveCart(cart);//avoir le nouveau contenu du panier
// }

// // //pouvoir retirer un produit du panier
// function removeFromCart(product){
//     let cart = getCart();
//     cart = cart.filter(p => p.id != product.id);//je filtre pour retrouver l'id différent de product.id
//     saveCart(cart);
// };

// // //Changer la quantité
// function changeQuantity(product,quantity){
//     let cart = getCart();
//     let foundProduct = cart.find(p => p.id == product.id);
//     if (foundProduct!= undefined){
//         foundProduct.quantity += quantity;
//         if(foundProduct.quantity <= 0){ //si la qt du produit est < ou = 0
//             removeFromCart(foundProduct);//alors on supprime le produit du panier
//         } //else{
//         //     saveCart(cart);//si le produit n'est pas supprimé on enregistre le panier
//         // }
//     }

// }
// // //Retourner le nbr de produit du panier
// function getNumberProduct(){
//     let cart = getCart();
//     let number = 0;
//     for (let product of cart){
//         number += product.quantity;
//     }
//     return number;
// };

// //Calculer le prix
// function getTotalPrice(){
//     let cart = getCart();
//     let total = 0;
//     for (let product of cart) {
//         number += product.quantity * product.price;
//     }
//     return total;
// }
// else{

  //     }
  // }

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

  //********************************************************************************************* */