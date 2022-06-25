
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

    return {
        add: add,
        getAll: getAll
    };
  
    
}) ();


function printPokemon(poke) {
    if (poke.height > 0.6) { 
        document.write('<p>' + poke.name + ' (Height: ' + poke.height + ')' + ' - chonky boi!' + '</p>')
}else{
        document.write('<p>' + poke.name + ' (Height: ' + poke.height + ')' + '</p>')
    }
}


pokemonRepo.getAll().forEach(printPokemon);





