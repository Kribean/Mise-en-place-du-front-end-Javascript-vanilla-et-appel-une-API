let tabKeys = Object.keys(localStorage);
let sectionArticle = document.getElementById('cart__items');

let totalQuant = document.getElementById('totalQuantity');
let totalPrice = document.getElementById('totalPrice');
let numTotalQuant = 0;
let numTotalPrice = 0;
totalQuant.textContent = numTotalQuant;
totalPrice.textContent = numTotalPrice;

let prenom = document.getElementById('firstName');
let nom = document.getElementById('lastName');
let adresse = document.getElementById('address');
let ville = document.getElementById('city');
let email = document.getElementById('email');
let commande = document.getElementById('order');
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


tabKeys.forEach(async (e) =>
    {
        let fetchURL = 'http://localhost:3000/api/products/';
        fetchURL = fetchURL.concat(e);
        let article = await fetch(fetchURL).then(data=>data.json()).then(data => {return data}).catch(function(err) {
          sectionArticle.innerHTML = '<h2> Une erreur est survenue. Veuillez actualiser. Si l\' erreur persiste, contactez-nous</h2>'
        });
        
        let objLinea = localStorage.getItem(e);
        let objJson = JSON.parse(objLinea);

        sectionArticle.innerHTML += ` <article class="cart__item" data-id="${e}" data-color="${objJson.color}">
        <div class="cart__item__img">
          <img src="${article.imageUrl}" alt="${article.altTxt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${article.name}</h2>
            <p>${objJson.color}</p>
            <p>${article.price} €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100"  value=${objJson.quantity}>
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`;


      let modifierNbr = document.querySelectorAll('.itemQuantity');
      modifierNbr.forEach((x)=>{
          x.addEventListener('change',(r)=>{
            if(x.reportValidity())
            {
              let currentComand = localStorage.getItem(r.currentTarget.closest('.cart__item').getAttribute("data-id"));
              let currentComandJson = JSON.parse(objLinea);
              currentComandJson.quantity= r.currentTarget.value;
              let currentComandLinea = JSON.stringify(currentComandJson);
              localStorage.setItem(r.currentTarget.closest('.cart__item').getAttribute("data-id"),currentComandLinea);
  
              numTotalPrice = 0;
              numTotalQuant = 0;
              tabKeys.forEach(async (e) =>
              {
                  let fetchURL = 'http://localhost:3000/api/products/';
                  fetchURL = fetchURL.concat(e);
                  let article = await fetch(fetchURL).then(data=>data.json()).then(data => {return data});
                  
                  let objLinea = localStorage.getItem(e);
                  let objJson = JSON.parse(objLinea);
                  numTotalPrice += article.price*objJson.quantity;
                  numTotalQuant += parseInt(objJson.quantity);
                  totalQuant.textContent = numTotalQuant;
                  totalPrice.textContent = numTotalPrice;
              })
            }


            
          })       
  
      })

        let supprimerBtn = document.querySelectorAll('.deleteItem');
        supprimerBtn.forEach((x)=>{
            x.addEventListener('click',(y)=>{
                y.currentTarget.closest('.cart__item').remove();
                localStorage.removeItem(y.currentTarget.closest('.cart__item').getAttribute("data-id"));
                tabKeys = Object.keys(localStorage);
                if (tabKeys.length == 0)
                {
                  window.location.href = 'index.html';
                }

                numTotalPrice = 0;
                numTotalQuant = 0;
                tabKeys.forEach(async (e) =>
                {
                    let fetchURL = 'http://localhost:3000/api/products/';
                    fetchURL = fetchURL.concat(e);
                    let article = await fetch(fetchURL).then(data=>data.json()).then(data => {return data});
                    
                    let objLinea = localStorage.getItem(e);
                    let objJson = JSON.parse(objLinea);
                    numTotalPrice += article.price*objJson.quantity;
                    numTotalQuant += parseInt(objJson.quantity);
                    totalQuant.textContent = numTotalQuant;
                    totalPrice.textContent = numTotalPrice;
                })
            })       
    
        })
    
        numTotalPrice += article.price*objJson.quantity;
        numTotalQuant += parseInt(objJson.quantity);
        totalQuant.textContent = numTotalQuant;
        totalPrice.textContent = numTotalPrice;


    })


commande.addEventListener('click', (e)=>
{
    e.preventDefault();
    let lesValiditeDeChamps = true
    if ((parseInt(totalQuant.textContent)>0) && (parseInt(totalPrice.textContent)>0))
    {
      for (let input of document.querySelectorAll(".cart__order__form input"))
      {
        if(input.getAttribute('type')!='submit')
        {
          if(!(input.reportValidity()))
          {
            lesValiditeDeChamps = false;
            document.getElementById(input.getAttribute('id').concat('ErrorMsg')).textContent="Vous avez mal complété ce champ";
          }
          else
          {
            document.getElementById(input.getAttribute('id').concat('ErrorMsg')).textContent="";
          };

          
        }

      }

    let client = new Contact(prenom.value,nom.value,adresse.value,ville.value,email.value);
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
            products: tabKeys})
    })
    .then(data=>data.json())
    .then(data => {
  
        if(lesValiditeDeChamps)
        {
          window.location.href = 'confirmation.html?id='.concat(data.orderId);
        }
       
    
    });

    }
    else
    {
        alert("erreur de panier")
    }
})