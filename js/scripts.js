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

    //Creates and loads modals
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {

            let pokename = pokemon.name
            let pokeNameStr = ((pokename.charAt(0)).toUpperCase()) + pokename.slice(1);

            let pokeHeightStr = ('Height: ' + pokemon.height + ' decimeters')

            let modalContainer = document.querySelector('#modal-container');
            modalContainer.innerHTML = ''   
            let modal = document.createElement('div');
            modal.classList.add('modal');


            //Logic for closing modals
            let closeModalElement = document.createElement('button');
            closeModalElement.classList.add('modal-close');
            closeModalElement.innerText = 'X';
            closeModalElement.addEventListener('click', hideModal);   

            window.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
                  hideModal();  
                }
              });

            document.addEventListener('click', (event) => {
                if (!event.target.closest('.modal')) {
                    hideModal();
                }}, false);     
                
            //----------

            let displayName = document.createElement('h2');    
            displayName.innerText = pokeNameStr;

            let displayHeight = document.createElement('h4');
            displayHeight.innerText = pokeHeightStr;

            let displayImg = document.createElement('img');
            displayImg.classList.add('modal-img');
            displayImg.src = pokemon.imageUrl;

            modal.appendChild(closeModalElement);
            modal.appendChild(displayName);
            modal.appendChild(displayHeight);
            modal.appendChild(displayImg);
            modalContainer.appendChild(modal);
            modalContainer.classList.add('is-visible');

        });
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









