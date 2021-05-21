import './sass/main.scss';
import countriCardTpl from './templates/countri-card.hbs';

const refs = {
    cardContainer: document.querySelector('.js-card-container'),
    searchForm: document.querySelector('.js-search-form')
}

refs.searchForm.addEventListener('input', onSearch)

function onSearch(e) {
    e.preventDefault();

    // const form = e.currentTarget;
    // const searchQuery = form.elements.query.value

    fetchCountri('Col')
    .then(renderCountriCard)
    .catch(error => { console.log(error)});
}




function fetchCountri(countryAlpha) {
    return fetch(`https://restcountries.eu/rest/v2/alpha/${countryAlpha}`)
        .then(response => {
            return response.json();
        }); 
    }

function renderCountriCard(countri) {
        const markup = countriCardTpl(countri);
        refs.cardContainer.innerHTML = markup;
    }