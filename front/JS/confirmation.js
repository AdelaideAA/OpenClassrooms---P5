//Afficher le n° de commande en récupérant l'id dans l'url
let orderId = document.getElementById('orderId');

let url = new URL(window.location.href); 

let urlId = url.searchParams.get("orderId"); 

orderId.innerHTML = urlId; 