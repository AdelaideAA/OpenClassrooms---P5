fetch("http://localhost:3000/api/products")
     .then(response => response.json())
     .then (jsonListSofa =>{
        let sofa="";
        jsonListSofa.map((values)=>{
           sofa+=`<a href=${values._id}>
           <article>
             <img src=${values.imageUrl} alt="Lorem ipsum dolor sit amet, Kanap name1">
             <h3 class="productName">${values.name}</h3>
             <p class="productDescription">${values.description}</p>
           </article>
         </a>`
        });
        document.getElementById("items").innerHTML=sofa;
        
     }).catch((err) => {
        console.log(err);
     });
   



