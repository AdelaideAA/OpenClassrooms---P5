//récuperer les données de l'API avec .map
fetch("http://localhost:3000/api/products")
     .then(response => response.json())
     .then (jsonListSofa =>{
        let sofa="";
        jsonListSofa.map((values)=>{
           sofa+=`<a href=./product.html?id=${values._id}>
           <article>
             <img src=${values.imageUrl} alt=${values.altTxt}>
             <h3 class="productName">${values.name}</h3>
             <p class="productDescription">${values.description}</p>
           </article>
         </a>`
        });
        document.getElementById("items").innerHTML=sofa;
        
     }).catch((err) => {
        console.log(err);
     });



