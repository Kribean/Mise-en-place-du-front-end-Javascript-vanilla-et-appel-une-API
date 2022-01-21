/**
 * @name Basket
 * La classe Basket permet la création du panier ainsi que les méthodes associées qui permettent de gérer les commandes (supprimer, modifier, etc...)
 */
export default class Basket{
    
	constructor(){
		this.basket = localStorage.getItem("basket");
        //si le panier n'existe pas on en crée un vide, sinon on le récupère dans le localStorage
		if (this.basket == null) {
			this.basket = []; 
		} else {
			this.basket = JSON.parse(this.basket);
		}
	}

    //Cette fonction permet d'enregistrer le panier  basket dans le localstorage
	saveBasket () {
		localStorage.setItem( "basket", JSON.stringify(this.basket));
	}


	/**
     * @name addBasket
     * @param {*} id l'identifiant du produit
     * @param {*} quantity le nombre de produits souhaité par le client
     * @param {*} color la couleur du produit. Note: deux produits de même id mais de couleurs différentes sont différents
     */
	addBasket (id,quantity,color) {
		let product = {id:id,
		quantity:quantity,
		color:color,
		idColor:id.concat(color)};
		
		let BoolElementExist=true;
		let indexElement=-1;
		
		this.basket.forEach((element,index) =>{
		if(element.idColor == product.idColor)
		{
			BoolElementExist=false;
			this.basket[index] = product;
			this.saveBasket();
		}
		})
		
		if(BoolElementExist)
		{
			this.basket.push(product);
			this.saveBasket();		
		}

	}

    /**
     * @name removeFromBasket
     * @param {*} id identifiant du produit à supprimer
     * @param {*} color couleur du produit à supprimer
     */
	removeFromBasket (id,color) {
		let product = {id:id,
		color:color,
		idColor:id.concat(color)};

		this.basket = this.basket.filter((element) =>{
		return element.idColor != product.idColor;
		});
		
		this.saveBasket();
		
	}

    /**
     * @name changeQuantity
     * @param {*} id identifiant du produit ciblé à modifier
     * @param {*} quantity quantité  du produit ciblé à modifier, c'est cette quantité qui variera
     * @param {*} color couleur  du produit ciblé à modifier
     */
	changeQuantity(id,quantity,color) {
		let product = {id:id,
		quantity:quantity,
		color:color,
		idColor:id.concat(color)};
		
		let BoolElementExist=true;
		let indexElement=-1;
		
		this.basket.forEach((element,index) =>{
		if(element.idColor == product.idColor)
		{
			BoolElementExist=false;
			this.basket[index] = product;
		}
		});
		
		this.saveBasket();
	}
	
    /**
     * @name getKeys
     * @returns retourne le tableau de clés lié au commande du client. Utile pour la validation finale
     */
	getKeys()
	{
		let keys = [];
		if(this.basket)
		{
			this.basket.forEach((element)=> keys.push(element.id));
		}
		
		return keys;
	}
	
	}

