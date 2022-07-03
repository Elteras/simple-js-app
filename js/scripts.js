let pokemonRepo = (function() {
    let pokemonList = []
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) {     
      
        let pokedexList = document.querySelector('.pokedex-list');
        let listItem = document.createElement('div');
        let button = document.createElement('button');

        let pokename = pokemon.name
        let pokenameStr = ((pokename.charAt(0)).toUpperCase()) + pokename.slice(1);

        button.innerText = pokenameStr;
        button.classList.add('poke-button');

        listItem.appendChild(button);
        pokedexList.appendChild(listItem);

        button.addEventListener('click', function (event) {
            pokemonRepo.showDetails(pokemon);
        });       
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {

            let pokename = pokemon.name
            let pokenameStr = ((pokename.charAt(0)).toUpperCase()) + pokename.slice(1);

            console.log(pokenameStr);
            console.log(pokemon.detailsUrl);
            console.log("Height: " + pokemon.height + " decimeters");
            console.log(pokemon.imageUrl);



        });
    }

    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url,
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function(e) {
            console.error(e);
        });
    } 

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails,
        loadList: loadList,
        loadDetails: loadDetails,
    };
}) ();


pokemonRepo.loadList().then(function() {
    pokemonRepo.getAll().forEach(function(pokemon){
        pokemonRepo.addListItem(pokemon);
    });
});









