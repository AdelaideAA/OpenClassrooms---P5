// Parametrer l'URL avec l'id pour récuperer les informations qui correspondent au bon canapé

const url = new URL(window.location.href);
const urlParams = new URLSearchParams(url.search);
let id = urlParams.get("id")
console.log (id)

fetch(`http://localhost:3000/api/products/${id}`)
    .then(response => response.json())
    .then((products) =>{       
        return product (products)
    })
    
    


function product(data){
    
    const { imageUrl, altTxt, name, price, description, colors } = data;
    const image =  appendImage(imageUrl, altTxt);
    const title = appendTitle(name);
    const prices = appendPrice(price);
    const descriptions = appendContent(description);
    const color = appendColor([colors]);
    //console.log(colors)  tous OK

};

function appendImage(imageUrl, altTxt){
    const image = document.createElement("img")
    
    image.src = imageUrl
    image.alt = altTxt
    
    const eltParent = document.querySelector(".item__img")
    eltParent.appendChild(image)  
};


function appendTitle(name){
    let title = document.querySelector("#title")
    title.textContent = name
}

function appendPrice(price){
    let prices = document.getElementById("price")
    prices.textContent = price
}

function appendContent(description){
    let content = document.querySelector("#description")
    content.textContent = description
}

// function appendColor([colors]){
//     let color = document.getElementById("colors")
//     color.textContent = [colors]
//     console.log(color)
// }

    





