import debounce from 'lodash.debounce';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';


import countryCardTpl from './templates/country-card.hbs';
import countryListTpl from './templates/country-list.hbs';
import fetchCountry from './fetchCountries'
import './sass/main.scss';


const refs = {
    cardContainer: document.querySelector('.js-card-container'),
    searchForm: document.querySelector('.js-search-form')
}

refs.searchForm.addEventListener('input', debounce(onSearch, 500));


function onSearch(e) {
    // resetPage()
    e.preventDefault();

    const form = e.target;
    const searchQuery = form.value;
    console.log(searchQuery);

    fetchCountry(searchQuery) 
        .then(arrayOfCountries => {
            if (arrayOfCountries.length > 10) {
                error({
                    text: 'Too many matches found. Please enter a more specific query!',
                    mode: 'light',
                    closer: true,
                    sticker: false,
                    hide: true,
                    delay: 2000,
                });
                return;
            }

            if (arrayOfCountries.length > 1 && arrayOfCountries.length < 10) {
                renderCountryList(arrayOfCountries);
                return;
            }

            if (arrayOfCountries.length = 1) {
                renderCountryCard(arrayOfCountries);
                return;
            }
    })
        .catch(onFetchError)
        // .finally(()=>form.reset());
}

function renderCountryCard(country) {
        const markup = countryCardTpl(country);
        refs.cardContainer.innerHTML = markup;
}

function renderCountryList(countries) {
        const markupList = countryListTpl(countries);
        refs.cardContainer.innerHTML = markupList;
}

// function resetPage() {
//   refs.cardContainer.innerHTML = '';
// }
    
function onFetchError(error) {
     error({
    text: `${err}`,
    mode: 'dark',
    closer: true,
    sticker: false,
    hide: true,
    delay: 2000,
  });
}