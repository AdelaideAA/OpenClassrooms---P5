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