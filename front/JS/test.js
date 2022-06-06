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


//Récuperer les données
fetch("http://localhost:3000/api/products")
     .then(response => response.json())
     .then (jsonListSofa => addProducts(jsonListSofa)) 

function addProducts (listSofa){
   
   const elementId = listSofa[0]._id
   const altTxt = listSofa[0].altTxt
   console.log (elementId)
   console.log(altTxt)
   
   const anchor = document.createElement("a")
   anchor.href = elementId
   anchor.txt = altTxt
   
   const items = document.getElementById("items")
   items.appendChild(anchor)
}