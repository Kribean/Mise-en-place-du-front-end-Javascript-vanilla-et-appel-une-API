
let url = new URL(window.location.href);
let search_params = new URLSearchParams(url.search); 
let idCanap;
let fetchURL = 'http://localhost:3000/api/products/';



let imagePresentation = document.querySelector('.item__img');
let titreDeCanape = document.getElementById('title');
let description = document.getElementById('description');
let selectionCouleur = document.getElementById('colors');
let prix = document.getElementById('price');
let lesQuantités = document.getElementById('quantity');
let boutonAchat = document.getElementById('addToCart');






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


class ElementPanier
{
    constructor(id, quantity,color)
    {
        this.id = id;
        this.quantity = quantity;
        this.color = color;
    }


    addBasket(){
        let objJson = {
            quantity : this.quantity,
            color : this.color
        }
        let objLinea = JSON.stringify(objJson);
        localStorage.setItem(this.id,objLinea);
    }

}


let leCanap;
//function

function launchCommand(){
    
    boutonAchat.addEventListener('click',()=>{
        alert('ok');
    let MaCommande = new ElementPanier(idCanap,lesQuantités.value,selectionCouleur.value);
    MaCommande.addBasket();
    })
}


//main run
if(search_params.has('id')) {
    idCanap = search_params.get('id');
    fetchURL = fetchURL.concat(idCanap);
    fetch(fetchURL).then(data=>data.json())
    .then(data=>{ leCanap = new Canape(data['colors'],data['_id'],data['name'],data['price'],data['imageUrl'],data['description'],data['altTxt']);
    prix.textContent = leCanap['price']
    imagePresentation.innerHTML = `<img src="${leCanap.imageUrl}" alt="${leCanap.altTxt}">`;
    titreDeCanape.textContent = leCanap['name'];
    description.textContent =  leCanap['description'];
    leCanap['colors'].forEach(element => {
        selectionCouleur.innerHTML+=`<option value="${element}">${element}</option>`;
        
    });
    }
);
    
    
launchCommand();
}
else{
    alert('Mauvais accès sur la page')
}



