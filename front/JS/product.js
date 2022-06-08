// Parametrer l'URL avec l'id pour récuperer les informations qui correspondent au bon canapé

const url = new URL(window.location.href);
const urlParams = new URLSearchParams(url.search);
let id = urlParams.get("id")
console.log (id)

// Je fais appel à l'url du produit qui contient l'id qui correspond 
fetch(`http://localhost:3000/api/products/${id}`)
    .then(response => response.json())  
    .then((products) =>{       
        //création de l'élement <img> + corespondance entre les données de products et les éléments + création des variables Parents
        let image = document.createElement("img")
        image.src = products.imageUrl
        image.alt = products.altTxt
        const imgParent = document.getElementsByClassName("item__img")
        imgParent.appendChild(image);

        document.getElementById("title").innerHTML = products.name;
        document.getElementById("price").innerHTML = products.price;
        document.getElementById("description").innerHTML = products.description;
        
        const clrParent = document.getElementById("colors");
         //boucle pour récupérer les données du tableau colors
        for (let color of products.colors){   
            let optionValue = document.createElement("option")
            
            optionValue.setAttribute('value', 'color')
            optionValue.textContent = color;
            
            clrParent.appendChild(optionValue);
        }
        
    });
    



    





