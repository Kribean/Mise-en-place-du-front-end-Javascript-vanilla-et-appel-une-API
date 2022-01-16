let lesItems = document.getElementById('items');
let tab = [];
let cardContenu;


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




fetch('http://localhost:3000/api/products')
.then(data=>data.json())
.then(data=>{for(card of data){
    let unCanap = new Canape(card['colors'],card['_id'],card['name'],card['price'],card['imageUrl'],card['description'],card['altTxt']);
    tab.push(unCanap);
    unCanap.createCard();
}
})

