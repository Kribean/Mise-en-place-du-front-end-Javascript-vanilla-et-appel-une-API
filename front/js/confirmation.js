//Déclaration des variables contenant les accès aux différentes sections du dom pour la page product.html
let orderId = document.getElementById('orderId');//ici sera ajouté l'id du bon de commande

let url = new URL(window.location.href); //adresse contenant l'id du bon de commande
let search_params = new URLSearchParams(url.search);

if(search_params.has('id')) {
    //si l'api nous renvoie un id commande alors on l'affiche à l'utilisateur
    idUtilisateur = search_params.get('id');
    orderId.textContent = idUtilisateur ;
}
else
{
    //au cas où une erreur est produite ou si l'utilisateur tente d'accéder à la page sans avoir fait de commande
    orderId.textContent = 'Une erreure c\'est produise, avez vous bien validé?' ;
}