import Basket from './Basket.js'
let panier = new Basket();
//Déclaration des tableaux et variables liées au panier
let tabKeys = panier.getKeys();
let totalQuant = document.getElementById('totalQuantity');
let totalPrice = document.getElementById('totalPrice');
let numTotalQuant = 0;
let numTotalPrice = 0;
totalQuant.textContent = numTotalQuant;
totalPrice.textContent = numTotalPrice;

//Déclaration des variables contenant les accès aux différentes sections du dom pour la page cart.html
let sectionArticle = document.getElementById('cart__items');
let prenom = document.getElementById('firstName');
let nom = document.getElementById('lastName');
let adresse = document.getElementById('address');
let ville = document.getElementById('city');
let email = document.getElementById('email');
let commande = document.getElementById('order');


/**
 * @name Contact
 * @param {this.prenom} -string correspondant au prenom du client, la regex a été mise dans le html
 * @param {this.nom} -string correspondant au nom du client
 * @param {this.adresse} -string correspondant à l'adresse du client
 * @param {this.ville} -string correspondant à la ville du client
 * @param {this.email} -string correspondant à l'email du client
 */
class Contact
{
    constructor(leprenom,lenom,laddresse,laville,lemail)
    {
        this.prenom = leprenom;
        this.nom = lenom;
        this.adresse = laddresse;
        this.ville = laville;
        this.email = lemail;
    }
}

/**
 * @name showQuantPrice
 * @param {*} meubleCatalogue -correspond à la fiche du meuble sourcé directement via l'api. Elle contient notemment le prix unitaire d'un meuble
 * @param {*} quantiteDeCommandes -correspond au nombre de meuble souhaité par le client
 * @returns cette fonction a pour but d'updater et calculer le prix pour un même article qui sera acheté par le client
 */
function showQuantPrice(meubleCatalogue,quantiteDeCommandes)
{
  numTotalPrice += meubleCatalogue.price*quantiteDeCommandes;
  numTotalQuant += parseInt(quantiteDeCommandes);
  totalQuant.textContent = numTotalQuant;
  totalPrice.textContent = numTotalPrice;
}

/**
 * @name calculateQuantPrice
 * @param {*} tableau - cette input correspond aux tableaux décrivant chaque article du panier 
 * @returns cette fonction a pour but d'updater et calculer le prix total et le nombre d'articles total qui sera acheté par le client
 */
function calculateQuantPrice(tableau)
{
  numTotalPrice = 0;
  numTotalQuant = 0;
  tableau.forEach(async (e) =>
  {
      let fetchURL = 'http://localhost:3000/api/products/';
      fetchURL = fetchURL.concat(e.id);
      let article = await fetch(fetchURL).then(data=>data.json()).then(data => {return data});
      
      showQuantPrice(article,e.quantity);

  })
}

/*Update de la page cart.html. Cette section permet à l'utilisateur de voir ses commandes, les modifier ou les supprimer*/
panier.basket.forEach(async (e) =>
    {
        let fetchURL = 'http://localhost:3000/api/products/';
        fetchURL = fetchURL.concat(e.id);
        let article = await fetch(fetchURL).then(data=>data.json()).then(data => {return data}).catch(function(err) {
          sectionArticle.innerHTML = '<h2> Une erreur est survenue. Veuillez actualiser. Si l\' erreur persiste, contactez-nous</h2>'
        });
        

        //Mise en place des différentes cartes correspondantes aux achats souhaités par le client
        sectionArticle.innerHTML += ` <article class="cart__item" data-id="${e.id}" data-color="${e.color}">
        <div class="cart__item__img">
          <img src="${article.imageUrl}" alt="${article.altTxt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${article.name}</h2>
            <p>${e.color}</p>
            <p>${article.price} €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100"  value=${e.quantity}>
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`;

      //Permet à l'utisateur sur la page cart.js de modifier ses commandes
      let modifierNbr = document.querySelectorAll('.itemQuantity');
      modifierNbr.forEach((x)=>{
          x.addEventListener('change',(r)=>{
            if(x.reportValidity())
            {
              panier.changeQuantity(r.currentTarget.closest('.cart__item').getAttribute("data-id"),r.currentTarget.value,r.currentTarget.closest('.cart__item').getAttribute("data-color"));
              
              calculateQuantPrice(panier.basket);
            }


            
          })       
  
      })

      //Permet à l'utisateur sur la page cart.js de supprimer ses commandes
        let supprimerBtn = document.querySelectorAll('.deleteItem');
        supprimerBtn.forEach((x)=>{
            x.addEventListener('click',(y)=>{
                y.currentTarget.closest('.cart__item').remove();//supprime la carte html
                panier.removeFromBasket(y.currentTarget.closest('.cart__item').getAttribute("data-id"),y.currentTarget.closest('.cart__item').getAttribute("data-color"));//supprime l'élément dans le panier 

                //si l'utilisateur supprime tous les articles, la page cart.js ne présente plus d'article. On renvoie donc l'utilisateur sur la page principale
                if (panier.basket.length == 0)
                {
                  window.location.assign('index.html');
                }

                calculateQuantPrice(panier.basket);
            })       
    
        })
    
        showQuantPrice(article,e.quantity);


    })

/*cette section permet à l'utilisateur une fois ses commandes faites d'envoyer au site le bon de commande comprenant
les meubles souhaités mais aussi les coordonnées du client */
commande.addEventListener('click', (e)=>
{
    e.preventDefault();
    let lesValiditeDeChamps = true;
    //Ce bloc vérifie si les données entrées par l'utilisateur sont valides
    if ((parseInt(totalQuant.textContent)>0) && (parseInt(totalPrice.textContent)>0))
    {
      for (let input of document.querySelectorAll(".cart__order__form input")) //parcours tout les champ input (nom,prenom,...)
      {
        if(input.getAttribute('type')!='submit')
        {
          if(!(input.reportValidity()))
          {
            //Si une information entrée par l'utilisateur n'est pas valide, on lui envoie un message d'erreur
            lesValiditeDeChamps = false; //booléen permettant si les informations sont valides d'envoyer l'utilisateur sur la page de confirmation
            document.getElementById(input.getAttribute('id').concat('ErrorMsg')).textContent="Vous avez mal complété ce champ";
          }
          else
          {
            document.getElementById(input.getAttribute('id').concat('ErrorMsg')).textContent="";
          };

          
        }

      }
    //construction de la fiche client
    let client = new Contact(prenom.value,nom.value,adresse.value,ville.value,email.value);
    
    //création de la liste d'id qui sera envoyé à l'API.
    let tabKeysPost = panier.getKeys();

    fetch("http://localhost:3000/api/products/order/", {
	method: 'POST',
	headers: { 
    'Accept': 'application/json', 
    'Content-Type': 'application/json' 
    },
        body: JSON.stringify({contact: {
            firstName: client.prenom,
            lastName: client.nom,
            address: client.adresse,
            city: client.ville,
            email: client.email
            },
            products: tabKeysPost})
    })
    .then(data=>data.json())
    .then(data => {
  
        if(lesValiditeDeChamps)
        {
          //envoie l'utilisateur sur la page de confirmation une fois toutes les informations validées
          window.location.assign('confirmation.html?id='.concat(data.orderId));
        }
       
    
    });

    }
    else
    {
      //si une erreur se passe sur la page
        alert("erreur de panier")
    }
})