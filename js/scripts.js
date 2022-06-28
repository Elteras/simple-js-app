
let Bulbasaur = {
    name: 'Bulbasaur',
    id: 001,
    height: 0.7,
    types: ['grass', 'poison']
}

let Charmander = {
    name: 'Charmander',
    height: 0.6,
    id: 004,
    types: ['fire']
}

let Squirtle = {
    name: 'Squirtle',
    height: 0.5,
    id: 007,
    types: ['water']
    
}


let pokemonRepo = (function() {
    let pokemonList = [Bulbasaur, Charmander, Squirtle];

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) {     /*Is this all redundant with function add? idk*/
      
        let pokedexList = document.querySelector('.pokedex-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');

        button.innerText = pokemon.name;
        button.classList.add('poke-button');

        listItem.appendChild(button);
        pokedexList.appendChild(listItem);

        button.addEventListener('click', function (event) {
            pokemonRepo.showDetails(pokemon);
        });

        // pokemonRepo.newFunc(button, pokemon);                //This is an alternate way to do the same thing as the code right above (L48-51)
    }

    function showDetails(pokemon) {
        console.log(pokemon.name);
    }

    function newFunc(button, pokemon) {
        let pokeButton = document.querySelector('poke-button');
        button.addEventListener('click', function (event) {
            pokemonRepo.showDetails(pokemon);
        });
    }


    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails,
        newFunc: newFunc,
    };
  
    
}) ();



pokemonRepo.getAll().forEach(pokemonRepo.addListItem);




// function printPokemon(poke) {

//     let pokedexList = document.querySelector('.pokedex-list');
//     let listItem = document.createElement('li');
//     let button = document.createElement('button');

//     button.innerText = poke.name;
//     button.classList.add('poke-button');

//     listItem.appendChild(button);
//     pokedexList.appendChild(listItem);


//     if (poke.height > 0.6) { 
//         document.write('<p>' + poke.name + ' (Height: ' + poke.height + ')' + ' - chonky boi!' + '</p>')
// }else{
//         document.write('<p>' + poke.name + ' (Height: ' + poke.height + ')' + '</p>')
//     }
// }


// pokemonRepo.getAll().forEach(printPokemon);







