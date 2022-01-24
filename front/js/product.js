import Basket from './Basket.js'
let panier = new Basket(); //mise à disposition du panier contenant les commandes

//Déclaration des variables nécessaires à l'utilisation de l'api
let url = new URL(window.location.href); //adresse contenant l'id du meuble choisi
let search_params = new URLSearchParams(url.search); //recherche de l'id dans l'url
let idCanap;
let fetchURL = 'http://localhost:3000/api/products/'; //adresse de l'api pour les produits
let leCanap; //contiendra le choix de meuble faites par l'utilisateur sur la page index.html

//Déclaration des variables contenant les accès aux différentes sections du dom pour la page product.html
let imagePresentation = document.querySelector('.item__img');
let titreDeCanape = document.getElementById('title');
let description = document.getElementById('description');
let selectionCouleur = document.getElementById('colors');
let prix = document.getElementById('price');
let lesQuantités = document.getElementById('quantity');
let boutonAchat = document.getElementById('addToCart');


/**
 * @name Canape
 * @param {colors} - couleur choisi par l'utilisateur pour le meuble
 * @param {id} - id du meuble choisi
 * @param {name} - nom du meuble choisi
 * @param {price} - prix du meuble choisi
 * @param {imageUrl} - image du meuble choisi
 * @param {description} - description du meuble choisi
 * @param {altTxt} - texte alt pour l'image du meuble choisi
 * La classe Canape est faite pour rendre les informations lié au choix de meuble de l'utilisateur plus lisible
 */
class Canape
{
    constructor(colors,id,name,price,imageUrl,description,altTxt)
    {
        this.colors = colors;
        this.id = id;
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl ;
        this.description = description;
        this.altTxt = altTxt ;
    }
}


/**
 * @name launchCommand
 * Une fois la commande faites (choix de couleur et nombres de meubles), le client valide sa commande et
 * est envoyé sur la page récapitulative de toutes ses commandes: cart.html.
 * Si la commande est mal effectuée, que les champs sont mal remplis, alors l'utilisateur reste sur la page et se doit
 * de mettre de bonnes informations
 */
function launchCommand(){
    
    boutonAchat.addEventListener('click',()=>{

        if(lesQuantités.reportValidity() && !(selectionCouleur.value==""))
        {
            panier.addBasket(idCanap,lesQuantités.value,selectionCouleur.value);
            window.location.assign('cart.html');
        }

    })
}


//Calcul principal, récupération de l'id dans l'url et envoie de la commande
if(search_params.has('id')) {
    idCanap = search_params.get('id');
    fetchURL = fetchURL.concat(idCanap);

    //récupération du meuble choisi par l'utilisateur et affichage du produit sur la page
    fetch(fetchURL).then(data=>data.json())
    .then(data=>{ leCanap = new Canape(data['colors'],data['_id'],data['name'],data['price'],data['imageUrl'],data['description'],data['altTxt']);
    prix.textContent = leCanap['price']
    imagePresentation.innerHTML = `<img src="${leCanap.imageUrl}" alt="${leCanap.altTxt}">`;
    titreDeCanape.textContent = leCanap['name'];
    description.textContent =  leCanap['description'];
    leCanap['colors'].forEach(element => {
        selectionCouleur.innerHTML+=`<option value="${element}">${element}</option>`;//création des différentes options de couleur
        
    });
    }
);
launchCommand();//envoie de la commande
}
else{
    alert('Mauvais accès sur la page');//au cas où une erreur se produit un message d'alerte est envoyé à l'utilisateur
}



