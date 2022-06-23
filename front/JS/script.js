//récuperer les données de l'API et les dispatché dans le dom avec une boucle .map
fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((jsonListSofa) => {
    let sofa = "";
    jsonListSofa.map((values) => {
      sofa += `<a href=./product.html?id=${values._id}>
           <article>
             <img src=${values.imageUrl} alt=${values.altTxt}>
             <h3 class="productName">${values.name}</h3>
             <p class="productDescription">${values.description}</p>
           </article>
         </a>`;
    });
    document.getElementById("items").innerHTML = sofa;
  })
  .catch((err) => {
    console.log(err);
    document.querySelector('#items').innerHTML =`
  <div class = 'cart__none'>
      <p id ='errRequete' style='text-align: center; font-size:25px; color: #FFFFF'>
      Nous ne pouvons afficher nos produits pour le moment.<br> Veuillez revenir plus tard.</p>
  </div>`;
  });
