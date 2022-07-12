let pokemonRepo = (function() {
    let pokemonList = []
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';


    //Add new pokemon to the pokemon list
    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    //Return all pokemon in the list
    function getAll() {
        return pokemonList;
    }

    //Creates and adds all the buttons to the DOM
    function addListItem(pokemon) {     
      
        let pokedexList = document.querySelector('.pokedex-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');

        let pokename = pokemon.name
        let pokenameStr = ((pokename.charAt(0)).toUpperCase()) + pokename.slice(1);

        button.innerText = pokenameStr;
        button.classList.add('poke-button', 'btn', 'btn-warning');

        button.setAttribute("data-toggle", "modal");
        button.setAttribute("data-target", ".modal");

        listItem.appendChild(button);
        pokedexList.appendChild(listItem);

        button.addEventListener('click', function (event) { 
            pokemonRepo.showDetails(pokemon);
        });    
    }

    function capitalize(word) {
        let newWord = ((word.charAt(0)).toUpperCase()) + word.slice(1);
        return newWord
    }

    // Creates and loads Bootstrap modals
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {



            let pokeHeightStr = ('Height: ' + (pokemon.height/10) + 'm');
            let pokeWeightStr = ('Weight: ' + (pokemon.weight/10) + 'kg');
            let pokeName = pokemon.name;
            let pokeNameStr = ((pokeName.charAt(0)).toUpperCase()) + pokeName.slice(1);
            
            let newTypes = [];
            pokemon.types.forEach(type => newTypes.push(capitalize(type)));
            pokemon.types = newTypes
            let pokeTypeStr = ('Types: ' + pokemon.types.join(', '));


            const modalBody = $(".modal-body");
            const modalTitle = $(".modal-title");
            const modalHeader = $(".modal-header");

            modalTitle.empty();
            modalBody.empty();

            //Creating element for name in modal content
            let displayName = document.createElement('h1');
            displayName.textContent = pokeNameStr;                

            //Img for modal content
            let displayImg = document.createElement('img');
            displayImg.classList.add('modal-img');
            displayImg.src = pokemon.imageUrl;

            //Elements for height, weight, and type
            let displayHeight = document.createElement('h4');
            let displayWeight = document.createElement('h4');
            let displayTypes = document.createElement('h4');
            displayHeight.textContent = pokeHeightStr;
            displayWeight.textContent = pokeWeightStr;
            displayTypes.textContent = pokeTypeStr;
            

            modalTitle.append(displayName);                 
            modalBody.append(displayImg);
            modalBody.append(displayHeight);
            modalBody.append(displayWeight);
            modalBody.append(displayTypes);
            

        })
    }


    //closes modals
    function hideModal() {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
    }


    //Fetch pokemon data from the API
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

    //Fetch details about each pokemon from the API
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.other["official-artwork"].front_default
            item.height = details.height
            item.weight = details.weight

            let types = []
            details.types.forEach((item) => types.push(item.type.name));
            item.types = types

        }).catch(function(e) {
            console.error(e);
        });
    } 

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails,
        hideModal: hideModal,
        loadList: loadList,
        loadDetails: loadDetails,
    };
}) ();


pokemonRepo.loadList().then(function() {
    pokemonRepo.getAll().forEach(function(pokemon){
        pokemonRepo.addListItem(pokemon);
    });
}); 









