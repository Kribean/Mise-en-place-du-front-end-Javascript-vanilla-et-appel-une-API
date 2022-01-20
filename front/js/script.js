//Déclaration des variables liées à l'accès aux documents html index.html
let lesItems = document.getElementById('items');


//Mise en place de l'objet canapé décrivant un canapé selon les caractéristiques décrites en cahier des charges
/**
 * @name Canape
 * @property {string}  this.colors       - couleur choisie du canape
 * @property {string}  price         - prix du canape
 * @property {string}  imageUrl      - url de l'image du canape
 * @property {string}  description - description du canape
 * @property {string}  altTxt - description du canape pour la balise image
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

    /**
 * Création d'une card description fauteil pour la page index.html
 *
 * @param {this.id} 'id d'une image à afficher.
 * @param {this.imageUrl} 'image à afficher
 * @param {this.altTxt} 'texte pour la balise alt destiné par exemple au malvoyant.
 * @param {this.imageUrl} 'image à afficher
 * @param {name} 'nom du canapé.
 * @param {description} 'description de l'article
 */
    createCard()
    {
        lesItems.innerHTML +=`<a href="./product.html?id=${this.id}">
        <article>
          <img src="${this.imageUrl}" alt="${this.altTxt}">
          <h3 class="productName">${this.name}</h3>
          <p class="productDescription">${this.description}</p>
        </article>
      </a>`;
    }
}



/**
 * Appel à l'api pour récupérer toutes les fiches fauteilles
 * Récupération de chaque article et création d'une card pour l'afficher sur index.html
 * Si il y a une erreur avec l'api, on indique à l'utilisateur un message d'erreur sur la page index.html
 */
fetch('http://localhost:3000/api/products')
.then(data=>data.json())
.then(data=>{for(card of data){
    let unCanap = new Canape(card['colors'],card['_id'],card['name'],card['price'],card['imageUrl'],card['description'],card['altTxt']);
    unCanap.createCard();
}
})
.catch(function(err) {
  lesItems.innerHTML = '<h2> Une erreur est survenue. Veuillez actualiser. Si l\' erreur persiste, contactez-nous</h2>'
});

