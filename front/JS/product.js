// Parametrer l'URL avec l'id pour récuperer les informations qui correspondent au bon canapé

const url = new URL(window.location.href);
const urlParams = new URLSearchParams(url.search);
let id = urlParams.get("id")

//Afficher les données du produit
// Je fais appel à l'url du produit qui contient l'id qui correspond 
fetch(`http://localhost:3000/api/products/${id}`)
    .then(response => response.json()) 
    //Je nomme ma fonction products 
    .then((products) =>{       
        //création de l'élement <img> + corespondance entre les données de products et les éléments + création des variables Parents
        let image = document.createElement("img")
        image.src = products.imageUrl
        image.alt = products.altTxt
        const imgParent = document.querySelector(".item__img")
        imgParent.appendChild(image);

        document.querySelector("#title").innerHTML = products.name;
        document.querySelector("#price").innerHTML = products.price;
        document.querySelector("#description").innerHTML = products.description;
        
        const clrParent = document.querySelector("#colors");
        //boucle pour récupérer les données du tableau colors  
        for (let color of products.colors){   
            let optionValue = document.createElement("option")
            
            optionValue.setAttribute('value', 'color')
            optionValue.textContent = color;
            
            clrParent.appendChild(optionValue);
        }
        
    });

//************************************************************ */

//sauvegarder le panier
function getCart(){
    let cart = localStorage.getItem(id);//lecture de localStorage grace à getItem
    if(cart == null){//lorsqu'on arrive sur la page le panier est vide donc [] vide
        return [];
    }else{
        return JSON.parse(id);//change en string
    }
}

//ajout lors du click
const btn = document.querySelector("#addToCart");
//console.log(btn);

btn.addEventListener("click",(e) =>{
    let colors = document.querySelector("#colors").value
    let quantity = document.querySelector("#quantity").value
    let data = [id = id, colors = colors, quantity = quantity];
    console.log(data);
    localStorage.setItem(id, JSON.stringify(data));//setItem ajoute data à localStorage
    if (colors == null || colors === "" || quantity == null || quantity == 0) {
        alert("Veuillez choisir une couleur et une quantité");  
    } 
        //addToCart(); Il faut que j'arrive a appeler mes fonctions
    });   

    //Ajout au panier 
function addToCart(product){
    let cart = getCart();
    let foundProduct = cart.find(p => p.id == product.id)//je cherche si un produit est = à un produit déjà ajouté
    if(foundProduct != undefined){ //si il trouve un élément
        foundProduct.quantity++;//il ajoute 1 à la quantité
    }else{
        product.quantity = 1; //sinon on le défini à 1
        cart.push(data);//ajouter un autre produit au panier
    }
  
    saveCart(cart);//avoir le nouveau contenu du panier
}

//pouvoir retirer un produit du panier
function removeFromCart(product){
    let cart = getCart();
    cart = cart.filter(p => p.id != product.id);//je filtre pour retrouver l'id différent de product.id
    saveCart(cart);
}

//Changer la quantité
function changeQuantity(product,quantity){
    let cart = getCart();
    let foundProduct = cart.find(p => p.id == product.id);
    if (foundProduct!= undefined){
        foundProduct.quantity += quantity;
        if(foundProduct.quantity <= 0){ //si la qt du produit est < ou = 0
            removeFromCart(foundProduct);//alors on supprime le produit du panier 
        } else{
            saveCart(cart);//si le produit n'est pas supprimé on enregistre le panier
        }
    }
    
}
//Retourner le nbr de produit du panier
function getNumberProduct(){
    let cart = getCart();
    let number = 0;
    for (let product of cart){
        number += product.quantity;
    }
    return number;
}

//Calculer le prix
function getTotalPrice(){
    let cart = getCart();
    let total = 0;
    for (let product of cart) {
        number += product.quantity * product.price;
    }
    return total;
}



//Ajout des produits dans le panier
// const addCart = document.querySelector("#addToCart");
// console.log(addCart);

// addCart.addEventListener("click",() =>{
//     let colors = document.querySelector("#colors").value;
//     let quantity = document.querySelector("#quantity").value;
    
//     if (colors == null || colors === "" || quantity == null || quantity == 0) {
//         alert("Veuillez choisir une couleur et une quantité");  
//     }
//     let arrayData = [id = id, colors = colors, quantity = quantity];
//     console.log(arrayData);
    
//     localStorage.setItem(id, JSON.stringify(arrayData));
      
//  



//DOCUMENTATION*******************************************
//monPanier = localStorage

//acceder à une donnée 
// localStorage.setItem('myCat', 'cookie');
// localStorage.setItem('myDog', 'Pepette');
// localStorage.setItem('myFish', 'Albert')
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
    
    



    





