let orderId = document.getElementById('orderId');

let url = new URL(window.location.href);
let search_params = new URLSearchParams(url.search);

if(search_params.has('id')) {
    idUtilisateur = search_params.get('id');
    orderId.textContent = idUtilisateur ;
}
else
{
    orderId.textContent = 'Une erreure c\'est produise, avez vous bien validé?' ;
}