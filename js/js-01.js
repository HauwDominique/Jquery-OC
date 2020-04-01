// var x = 10;
// console.log(x);

// const user = {
//     firstname = 'Quentin',
//     lastname = 'Lggin'
// }

//on peut modifier la constante en entrant dans l'objet par une propriété
// user.firstname = 'Loic';


// var $div = $('div');

//privilégier le ;map plutot qu'un eaach ou foureach

//lodash est une librairie javascript pour les tableau

//sur un array privélgiér .map, .filter et

//creuser LOAASH AVEC LE GET ET LE SET


//avec les évenements, privilégier de créer des fonctions qui seront appelées ensuite dans le onclick

//récupérer des données avec data(). Pensez à mettre dans le code html des date-. Ex <div id='test' data-id=42 data-name='toto'</div>
// On peut utiliser un data-objet.
//

//A voir le BIND avec this



//EXERCICE DELETE LISTE WITH BUTTON

var localArr = ["greg", "Peter", "Jean", "Ludo"];
var $list = $('ul.people');
let result='';

localArr.forEach(function (value, index) {
    result += (`<li id="user-${index}">${value}<button data-index="${index}">Delete</button></li>`);
    // console.log(result);
});

$list.append(result);

$('button').click(deleteUser);

function deleteUser(event) {
    var index = $(event.currentTarget).data('index');
    $(`#user-${index}`).remove();
};


