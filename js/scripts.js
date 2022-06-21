
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

let pokemonList = [Bulbasaur, Charmander, Squirtle]

for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height > 0.6) { 
        document.write('<p>' + pokemonList[i].name + ' (Height: ' + pokemonList[i].height + ')' + ' - chonky boi!' + '</p>')
}else{
        document.write('<p>' + pokemonList[i].name + ' (Height: ' + pokemonList[i].height + ')' + '</p>')
    }
}
